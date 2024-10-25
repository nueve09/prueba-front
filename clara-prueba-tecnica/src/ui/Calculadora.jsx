import { Box, Typography } from "@mui/material"
import { ActionCalc, Numbers } from "../components"
import { InputNumbers } from "../components/InputNumbers"
import { useCalculadora } from "../hooks/useCalculadora"

export const Calculadora = () => {
  const {id, formmatId, deleteOneDigit,setInitialValue,findRemesas, error, setError, setMsg, msg}= useCalculadora()

  return (
    <div
        className="calculator-container container mx-auto p-4 flex justify-center items-center flex-col h-screen" 
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

      <InputNumbers
        id={id}
        formmatId={formmatId}
        deleteOneDigit={deleteOneDigit}
        findRemesas={findRemesas}
        error={error}
        setError={setError}
        setMsg={setMsg}
        msg={msg}

        
      />

      <Box 
      display="" /* Flexbox */
      gap={2} /* Espacio entre columnas */
      className="flex  md:flex-row h-screen overflow-auto"
    >

      <Numbers 
      formmatId={formmatId} />
      <ActionCalc
        deleteOneDigit={deleteOneDigit}
        setInitialValue={setInitialValue}
        findRemesas={findRemesas}

      />
    </Box>
      
        
    </div>
  )
}
