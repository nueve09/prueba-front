import { Modal, TextField } from "@mui/material"
import { useState } from "react"
import { ModalErrorAlert } from "./ModalErrorAlert"

export const InputNumbers = ({id, formmatId, deleteOneDigit, error, setError, setMsg, msg, findRemesas }) => {

  const handleChange = (e) => {
    const {key} = e
    const number = parseInt(key)
    const cleanId = id.replace(/^\*+/, '');
    const paserId = parseInt(cleanId)
    if(key === 'Enter') return findRemesas();
    if(key === 'Backspace') return deleteOneDigit();
    

    formmatId(number)

  }

 

  return (
    <>
    
    <TextField
        id="outlined-basic"
        variant="outlined"
        type="text"
        className="w-full  bg-white mx-7"
        maxLength="8"
        value={id}
        onKeyDown={handleChange}

        />
        {error && <ModalErrorAlert
      msg={msg}
      title="Error"
    />}
    </>
    
  )
}
