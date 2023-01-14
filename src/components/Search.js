import React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

export default function SearchAppBar({ query, setQuery }) {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: "0.8rem",
        right: "21rem",
      }}
    >
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5, mt: 3 }} />
      <TextField
        id="search"
        label="Search"
        variant="standard"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        sx={{ width: "16rem" }}
      />
    </Box>
  );
}
