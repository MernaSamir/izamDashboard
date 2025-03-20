import React from 'react';
import { Box, Divider, Menu, MenuItem } from '@mui/material';
import ProfileBig from '@/components/Icons/profileBig';
import Styles from "../Navbar.module.css";

interface ProfileDropdownProps {
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ anchorEl, handleMenuClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          borderRadius: 2,
          width: 250,
          p: 2,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
        gap={2}
      >
        <ProfileBig />
        <Box>
          <p className={Styles.name}>Ahmed Amaar</p>
          <p className={Styles.role}>UX UI designer</p>
        </Box>
      </Box>

      <Divider sx={{ mb: 1 }} />
      {["Setting and privacy", "Language", "Help"].map((label) => (
        <MenuItem className={Styles.menuItem} key={label} onClick={handleMenuClose}>
          {label}
        </MenuItem>
      ))}
      <Divider sx={{ my: 1 }} />
      <MenuItem onClick={handleMenuClose}>
        <p className={Styles.logout}>Logout</p>
      </MenuItem>
    </Menu>
  );
};

export default ProfileDropdown;
