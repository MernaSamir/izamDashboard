'use client';

import JobList from './JobList';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { useSidebar } from '@/context/index';
import React from 'react';
import SortingDropdown from '@/components/DropDown';
import TopSection from './JobList/TopSection';
import MenuIcon from '@/components/Icons/menu';

export default function DashboardTemplate() {
  const { toggleSidebar } = useSidebar(); // Access context to toggle sidebar
  const isMobile = useMediaQuery("(max-width:678px)"); // Mobile screen check

  return (
    <Box flexGrow={1} sx={{mr:{ xs: '0', lg: '5%' }}} >
      <Box sx={{display:'flex'}}>
      <TopSection/>

      <IconButton
        sx={{ display: { xs: 'block', sm: 'none' },
          width: "57px !important",
          height: "57px !important",
          borderRadius: "2.34px",
          border: "1px solid #F0F0F0",
        }} 
        onClick={toggleSidebar}
        aria-label="Open Sidebar"
      >
        <MenuIcon  />
      </IconButton>
      </Box>
      <Box sx={{display:'flex' ,justifyContent:'flex-end'}} >

{!isMobile&&<SortingDropdown/>}
</Box>
      <JobList />
    </Box>
  );
}
