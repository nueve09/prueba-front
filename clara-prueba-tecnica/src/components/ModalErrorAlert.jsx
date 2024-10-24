import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export const ModalErrorAlert = ({msg, title}) => {
  return (
    <Alert severity='error'>
        <AlertTitle>{title}</AlertTitle>
        Ocurrió un error — <strong>{msg}</strong>
    </Alert>
  )
}
