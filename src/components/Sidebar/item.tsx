'use client'
import { useDrag, useDrop } from "react-dnd";
import {
  Box,
  IconButton,
  List,
  ListItem,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Styles from "./Sidebar.module.css";
import EyeIcon from "@/components/Icons/eye";
import EditIcon from "@/components/Icons/edit";
import EyeOff from "@/components/Icons/nonEye";
import DragIcon from "@/components/Icons/drag";
import { DraggableProps } from './types/sidebar'; // Adjust the path to your types file

const ITEM_TYPE = "NAV_ITEM";

export const DraggableNavItem = ({
  items,
  item,
  index,
  moveItem,
  editMode,
  updateItem,
  parentId,
  key
}: DraggableProps) => {
  console.log(item,"mmmmm",item.visible
  )
  const dragDropRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: item.id, index, parentId },
    canDrag: editMode,
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (dragged: {
      id: number;
      index: number;
      parentId: number | null;
    }) => {
      if (dragged.id === item.id) return; // Avoid dropping onto itself

      // Only allow move if same parent
      if (dragged.index !== index || dragged.parentId !== parentId) {
        moveItem(parentId, dragged.index, index);

        // Update dragged item’s index and parentId
        dragged.index = index;
        dragged.parentId = parentId;
      }
    },
  });

  // Combine refs
  drag(drop(dragDropRef));

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem({ ...item, title: e.target.value });
  };

  const handleTitleEditToggle = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  // Parent Item with Children
  if (item.children?.length) {
    return (
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        sx={{
          mb: 1,
          boxShadow: "none",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={!editMode && <ExpandMoreIcon />}
          sx={{
            bgcolor: "#f7f7f7",
            gap: 1,
            minHeight: "64px",
          }}
        >
          <Box
            ref={dragDropRef}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              width: "100%",
            }}
          >
            {editMode && (
              <Box
                sx={{
                  cursor: "grab",
                  display: "flex",
                  alignItems: "center",
                  mx: 0.5,
                   color: !item.visible ? '#cdcdcd' : 'inherit' 
                }}
              >
          {item.visible?<DragIcon/>:<DragIcon color="#cdcdcd"/>}
          </Box>
            )}

            {editMode && isEditingTitle ? (
              <TextField
                value={item.title}
                onChange={handleTitleChange}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
              />
            ) : (
              <p   style={{ color: !item.visible&&editMode ? '#cdcdcd' : '#404040' }}
              className={Styles.accordionHeader}>{item.title}</p>
            )}

            {editMode && (
              <>
                <Box
                  onClick={handleTitleEditToggle}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    mx: 0.5,
                  }}
                >
                  <EditIcon />
                </Box>
                <Box
                key={key}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateItem({ ...item, visible: !(item.visible ?? true) })
                  }}
                >
 {item.visible === false && <EyeOff /> }
 { item.visible  &&<EyeIcon />}  </Box>
              </>
            )}
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <List>
            {item.children.map((child, idx) =>
              !editMode && child.visible === false ? null : (
                <DraggableNavItem
                  key={child.id}
                  items={items}
                  item={child}
                  index={idx}
                  moveItem={moveItem}
                  editMode={editMode}
                  updateItem={(updatedChild) => {
                    const updatedChildren = [...(item.children ?? [])];
                    updatedChildren[idx] = updatedChild;
                    updateItem({ ...item, children: updatedChildren });
                  }}
                  parentId={item.id}
                />
              )
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  }

  // Leaf Item (No Children)
  return (
    <ListItem
    key={key}
      ref={dragDropRef}
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: parentId ? "transparent" : "#f7f7f7",
        mb: 1,
        minHeight: "64px",
        paddingBlock: "0",
         color: !item.visible&&editMode? '#cdcdcd' : '#404040',
      }}
    >
      {editMode && (
        <IconButton>
          {item.visible?<DragIcon/>:<DragIcon color="#cdcdcd"/>}
          </IconButton>
      )}

      {editMode && isEditingTitle ? (
        <TextField
          value={item.title}
          onChange={handleTitleChange}
          onBlur={() => setIsEditingTitle(false)}
          autoFocus
          variant="outlined"
          size="small"
          sx={{ flex: 1 }}
        />
      ) : (
        <p  style={{ color: !item.visible&&editMode ? '#cdcdcd' : '#404040' ,         width:!parentId?"16rem": "14.6rem"        }} className={Styles.listItem}>{item.title}</p>
      )}

      {editMode && (
        <>
          <IconButton onClick={handleTitleEditToggle}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              console.log(item.visible,"jjjjjjjj")
              e.stopPropagation();
              updateItem({ ...item, visible: !(item.visible ?? true) });
            }}
          >
             { item.visible ?<EyeIcon />: <EyeOff /> }
  </IconButton>
        </>
      )}
    </ListItem>
  );
};
