import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Alert, Positions,  Title } from "./components";

export default function TopSection() {
  const [checked, setChecked] = useState(false);
  const isMobile = useMediaQuery("(max-width:678px)"); // Mobile screen check

  if (!isMobile)
    return (
      <Box
        sx={{
          backgroundColor: "#3D8E41",
          color: "#fff",
          px: 3,
          py: 2,
          mb: 2,
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow:1
        }}
      >
        <Box >
          {Title}
          {Positions}


        </Box>

        {Alert(setChecked,checked)}
      </Box>
    );
  else
    return (
        <Box
        sx={{
          backgroundColor: "#3D8E41",
          color: "#fff",
          px: 3,
          py:0.5,
          height:"57px",
          mb: 2,
          borderRadius: "5px",
          justifyContent: "space-between",
          alignItems: "center",
          flexGrow:1

        }}
      >
       {Title}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
         {Positions}

        {Alert(setChecked,checked)}
        </Box>
      </Box>
    );
}
