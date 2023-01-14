import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

function DropDown({ options, names, setSearchBy }) {
  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: "0.8rem",
        right: "10rem",
        minWidth: 120,
      }}
    >
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Search By
        </InputLabel>
        <NativeSelect
          defaultValue={options[0]}
          inputProps={{
            name: "search",
            id: "uncontrolled-native",
          }}
          onChange={handleChange}
        >
          {options.map((val, index) => (
            <option value={val} key={val}>
              {names[index]}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
export default DropDown;
