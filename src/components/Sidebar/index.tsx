"use client";

import { useEffect, useState } from "react";
import { Box, Button, List } from "@mui/material";

import { DraggableNavItem } from "./item";
import { getNavItems, trackItems } from "@/apis";
import HeaderSection from "./components/HeaderSection";
import { NavItem } from "./types/sidebar"; // Adjust the path as needed

export default function Sidebar() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [originalItems, setOriginalItems] = useState<NavItem[]>([]);

  useEffect(() => {
    getNavItems()
      .then((res) => {
        // Ensure each item has `visible` defined, defaulting to true
        const initializedItems = res.data.map((item: NavItem) => ({
          ...item,
          visible: item.visible !== undefined ? item.visible : true,
          children: item.children?.map((child: NavItem) => ({
            ...child,
            visible: child.visible !== undefined ? child.visible : true,
          })),
        }));
        setNavItems(initializedItems);
        setOriginalItems(initializedItems);
      })
      .catch(console.error);
  }, []);

  const moveItem = (
    parentId: number | null,
    fromIndex: number,
    toIndex: number
  ) => {
    const updated = [...navItems];

    const moveWithin = (items: NavItem[]) => {
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      trackItems(moved.id, fromIndex, toIndex);
    };

    if (parentId === null) {
      moveWithin(updated);
    } else {
      const parent = updated.find((i) => i.id === parentId);
      if (parent?.children) moveWithin(parent.children);
    }

    setNavItems(updated);
  };

  const handleUpdateItem = (
    updatedItem: NavItem,
    parentId: number | null = null
  ) => {
    const updateItems = (items: NavItem[]): NavItem[] => {
      return items.map((item) => {
        if (item.id === updatedItem.id && parentId === null) {
          return updatedItem;
        } else if (item.children && item.id === parentId) {
          return {
            ...item,
            children: item.children.map((child) =>
              child.id === updatedItem.id ? updatedItem : child
            ),
          };
        }
        return item;
      });
    };

    const updatedNavItems = updateItems(navItems);
    setNavItems(updatedNavItems);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", lg: 440 },
        bgcolor: "#fff",
        p: 2,
        boxShadow: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Section */}
      <HeaderSection
        navItems={navItems}
        setNavItems={setNavItems}
        originalItems={originalItems}
        setOriginalItems={setOriginalItems}
        editMode={editMode}
        setEditMode={setEditMode}
      />

      {/* Scrollable List */}
      <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
        <List>
          {navItems.map((item, index) =>
            !editMode && item.visible === false ? null : (
              <DraggableNavItem
                key={item.id}
                items={navItems}
                item={item}
                index={index}
                moveItem={(from: number, to: number) => moveItem(null, from, to)}  // ✅ FIXED TYPE
                editMode={editMode}
                updateItem={(updatedItem) => handleUpdateItem(updatedItem, null)}
                parentId={null}
              />
            )
          )}
        </List>

        {/* Cancel Button */}
        {editMode && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                fontFamily: "DM Sans",
                fontWeight: 500,
                fontSize: "17px",
                lineHeight: "150%",
                color: "#ED1F03",
                textTransform: "none",
              }}
              onClick={() => {
                setNavItems(originalItems);
                setEditMode(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
