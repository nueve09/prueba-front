import { useState } from 'react'
import Sliderbar from './compon/sliderbar';
import { ErrorProvider } from './compon/ErrorProvider';

function Navegacion() {
  return (
    <>
    <ErrorProvider>
      <div className="caja" >
        <Sliderbar />
      </div>
      </ErrorProvider>
    </>
  )
}

export default Navegacion
