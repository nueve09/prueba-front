import * as React from 'react';
import Box from '@mui/material/Box';
import Sliderbar from './compon/sliderbar'; 
import ErrorProvider from './compon/ErrorProvider'; 



function Navegacion() {
  return (
    <>
      <Box className="caja" >
      <ErrorProvider> 
          <Sliderbar />
        </ErrorProvider>
      </Box>
      


    </>
  );
}

export default Navegacion;
  