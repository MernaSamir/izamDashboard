import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

export const Title = (
  <Typography
    sx={{
      fontWeight: 700,
      fontSize: "1.438rem",
      lineHeight: "26px",
    }}
  >
    UI Designer in Egypt
  </Typography>
);
export const Positions = (
  <Typography
    sx={{
      fontWeight: 400,
      fontSize: "1.063rem",
      lineHeight: "22px",
    }}
  >
    70 job positions
  </Typography>
);
export const Alert = ( setChecked: (value: boolean) => void
, checked: boolean) => {
  const isMobile = useMediaQuery("(max-width:678px)"); // Mobile screen check

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "1.063rem",
          lineHeight: "22px",
          marginRight:  "10px" ,
        }}
      >
        Set alert
      </Typography>
      <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
        <Image
          src={checked ? "/assets/switch-on.svg" : "/assets/switch.svg"}
          alt="switch"
          width={!isMobile ? 65 : 36}
          height={!isMobile ? 35 : 19.7}
        />
      </div>
    </Box>
  );
};
