"use client";

import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ProfileBig from "@/components/Icons/profileBig";
import ProfileIcon from "@/components/Icons/profile";
import { Logo } from "./LeftPart";
import Styles from "../Navbar.module.css";
import { menuItems } from "..";

interface ProfileDrawerProps {
  isMobile: boolean;
}

export default function ProfileDrawer({ isMobile }: ProfileDrawerProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 2,
          p: 2,
        }}
        gap={2}
      >
        <ProfileBig />
        <Box>
          <p className={Styles.name}>Ahmed Amaar</p>
          <p className={Styles.role}>UX UI designer</p>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.label} component="a" href={item.href}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isMobile ? item.mobIcon : item.icon}
              <ListItemText primary={item.label} className={Styles.menuItem} />
            </Box>
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <List>
        {["Setting and privacy", "Language", "Help"].map((label) => (
          <ListItemButton key={label}>
            <ListItemText primary={label} className={Styles.settingItem} />
          </ListItemButton>
        ))}
        <ListItemButton>
          <ListItemText primary="Logout" className={Styles.logout} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <ProfileIcon />
      </IconButton>

      {Logo}

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
}
