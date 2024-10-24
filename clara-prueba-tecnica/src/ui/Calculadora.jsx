import { Box, Paper, Typography } from "@mui/material"
import { ActionCalc, Numbers } from "../components"

export const Calculadora = () => {
  return (
    <div
        className="calculator-container container mx-auto p-4" 
    >

      <Typography
          variant="h5"
          className="text-center text-indigo-500"
      >
        Ventanilla digital
      </Typography>

      <Typography
          variant="h3"
          className="text-center text-indigo-500 font-bold"
      >
        Remesas
      </Typography>
      <Box 
      display="flex" 
      gap={2} /* Espacio entre columnas */
    >
      <Numbers />
      <ActionCalc />
    </Box>
      
        
    </div>
  )
}
