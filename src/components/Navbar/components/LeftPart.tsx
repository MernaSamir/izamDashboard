import { InputBase, Paper } from "@mui/material";
import Image from "next/image";
import SearchIcon from "@/components/Icons/search";

 export const Logo = (
    <Image src="assets/logo.svg" alt="logo" width={81} height={27} />
  );

  export const SearchBar = (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 300,
        borderRadius: 50,
        px: 1,
        py: 0.5,
      }}
    >
      <SearchIcon />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by name, job title..."
        inputProps={{ "aria-label": "search jobs" }}
      />
    </Paper>
  );
