import React from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { saveSidebarItems } from '@/apis';
import Styles from '../Sidebar.module.css';
import Settings from '@/components/Icons/settings';
import Check from '@/components/Icons/check';
import Close from '@/components/Icons/close';
import { useSidebar } from '@/context';
import LeftArrow from '@/components/Icons/leftArrow';
import { HeaderSectionProps } from '../types/sidebar'; // Adjust the path to your types file

const HeaderSection: React.FC<HeaderSectionProps> = ({
  navItems,
  setNavItems,
  originalItems,
  setOriginalItems,
  editMode, setEditMode
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { closeSidebar } = useSidebar(); // Access context to toggle sidebar

  const handleSave = () => {
    saveSidebarItems(navItems)
      .then(() => {
        setEditMode(false);
        setOriginalItems(navItems);
        console.log('Saved!');
      })
      .catch((error) => {
        console.error('Error saving:', error);
      });
  };

  const handleCancel = () => {
    setNavItems(originalItems);
    setEditMode(false);
  };



  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      {/* Left Side: Arrow (mobile) + Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isMobile && (
          <IconButton onClick={closeSidebar}>
            <LeftArrow/>
          </IconButton>
        )}
        <p className={Styles.sideHeader}>Menu</p>
      </Box>

      {/* Right Side: Edit Buttons */}
      {editMode ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleSave} color="success">
            <Check />
          </IconButton>
          {!isMobile&& (
            
            <IconButton onClick={handleCancel} color="error">
              <Close />
            </IconButton>
          )}
        </Box>
      ) : (
        <IconButton onClick={() => setEditMode(true)}>
          <Settings />
        </IconButton>
      )}
    </Box>
  );
};

export default HeaderSection;
