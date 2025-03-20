'use client'
import React, { useState } from 'react';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function FullWidthSelect() {
  const [sortOption, setSortOption] = useState('Top match');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 'fit-content', height: 66 , justifyContent:'center'}}>
      <Select
        value={sortOption}
        onChange={handleChange}
        disableUnderline
        IconComponent={() => (
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            <Image src={'/assets/downArrow.svg'} alt="Arrow" width={16} height={16} />
          </Box>
        )}
        renderValue={() => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'DM Sans',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '26.22px',
                color: '#404040',
                mr: "1rem",
              }}
            >
              Sorting by :
            </Typography>
            <Typography
              sx={{
                fontFamily: 'DM Sans',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '26.22px',
                color: '#48A74C',
              }}
            >
              {sortOption}
            </Typography>
          </Box>
        )}
        sx={{
          width: 'fit-content',
          // px: 1,
          // py: 0.5,
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            paddingRight:"0 !important" , // your desired padding

            // paddingRight: '20px',
          },
        }}
      >
        <MenuItem value="Top match">Top match</MenuItem>
        <MenuItem value="Newest">Newest</MenuItem>
        <MenuItem value="Latest">Latest</MenuItem>
      </Select>
    </FormControl>
  );
}
