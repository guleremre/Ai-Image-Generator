import * as React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SamplingMethodSelect({ onSelected }) {
  const handleChange = (event) => {
    onSelected(event.target.value);
  };

  return (
    <FormControl
      sx={{ minWidth: 250, background: "#0a6bcb", borderRadius: "5px" }}
    >
      <InputLabel id="Sampling-Method">
        <b>Sampling Method</b>
      </InputLabel>
      <Select
        labelId="Sampling-Method-label"
        id="Sampling-Method"
        // value={input}
        defaultValue="Euler"
        label="input"
        onChange={handleChange}
      >
        <MenuItem value={"Euler a"}>Euler a</MenuItem>
        <MenuItem value={"Euler"}>Euler</MenuItem>
        <MenuItem value={"DPM++ 2S a"}>DPM++ 2S a</MenuItem>
        <MenuItem value={"DPM++ 2M"}>DPM++ 2M</MenuItem>
        <MenuItem value={"DPM++ SDE"}> DPM++ SDE</MenuItem>
        <MenuItem value={"DPM++ 2M SDE"}> DPM++ 2M SDE</MenuItem>
        <MenuItem value={"DPM fast"}>DPM fast </MenuItem>
        <MenuItem value={"DPM adaptive "}> DPM adaptive</MenuItem>
        <MenuItem value={"LMS Karras"}>LMS Karras </MenuItem>
        <MenuItem value={"DPM2 Karras"}>DPM2 Karras </MenuItem>
        <MenuItem value={"DPM2 a Karras"}> DPM2 a Karras</MenuItem>
        <MenuItem value={"DPM++ 2S a Karras"}>DPM++ 2S a Karras </MenuItem>
        <MenuItem value={"DPM++ 2M Karras"}> DPM++ 2M Karras</MenuItem>
        <MenuItem value={"DPM++ SDE Karras"}> DPM++ SDE Karras</MenuItem>
        <MenuItem value={"DPM++ 2M SDE Karras"}>DPM++ 2M SDE Karras</MenuItem>
      </Select>
    </FormControl>
  );
}
