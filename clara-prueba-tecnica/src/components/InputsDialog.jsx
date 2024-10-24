import { InputLabel, TextField } from "@mui/material"
import { useState } from "react";

export const InputsDialog = ({id,type,msg,setSearch}) => {

  const [value, setValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setValue(e.target.value);   
    setSearch((prev) => ({...prev, [type]: e.target.value}))
    
  };

  return (
    <div>
      <TextField
        id={id}
        label={msg}
        variant="outlined"
        fullWidth
        margin="normal"
        name={type}
        autoComplete="off"
        onChange={handleSearch}
        value={value}
    />
    </div>
  )
}
