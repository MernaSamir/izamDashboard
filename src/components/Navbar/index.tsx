"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,

} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import HomeIcon from "@/components/Icons/home";
import WorkIcon from "@/components/Icons/job";
import GroupIcon from "@/components/Icons/users";
import MessageIcon from "@/components/Icons/message";
import ProfileIcon from "@/components/Icons/profile";
import Styles from "./Navbar.module.css";
import HomeMob from "@/components//Icons/homeMob";
import Bag from "@/components//Icons/Bag";
import NotificationMob from "@/components//Icons/notificationMob";
import Bell from "@/components/Icons/bell";
import MessageMob from "@/components/Icons/messageMob";
import UsersMob from "../Icons/3UserMob";
import ProfileDrawer from "./components/ProfileDrawer";
import { Logo, SearchBar } from "./components/LeftPart";
import ProfileDropdown from "./components/ProfileDropdown";


export const menuItems = [
  { label: "Home", icon: <HomeIcon />, mobIcon:<HomeMob/>, href: "#" },
  { label: "Jobs", icon: <WorkIcon />,mobIcon:<Bag/>, href: "#" },
  { label: "Employers", icon: <GroupIcon />, mobIcon:<UsersMob/>, href: "#" },
  { label: "Notifications", icon: <Bell />, mobIcon:<NotificationMob/>, href: "#" },
  { label: "Messaging", icon: <MessageIcon />, mobIcon:<MessageMob/>, href: "#" },
];

const NavBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));



  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


 

 

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#161616",
        px: 2,
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {isMobile ? (
          <ProfileDrawer isMobile={isMobile}/>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
              {Logo}
              {SearchBar}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {menuItems.map((item) => (
                <IconButton
                  key={item.label}
                  color="inherit"
                  href={item.href}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {item.icon}
                  <p  className={isMobile?Styles.menuItem:Styles.menuItemD}>
                    {item.label}
                  </p>
                </IconButton>
              ))}
              <IconButton onClick={handleMenuOpen} color="inherit">
                <ProfileIcon />
              </IconButton>
              <ProfileDropdown handleMenuClose={handleMenuClose} anchorEl={anchorEl}/>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
