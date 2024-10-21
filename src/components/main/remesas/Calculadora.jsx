// Bibliotecas
import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
// Componentes
import { BotonesCalculadora } from "@components/main/remesas/BotonesCalculadora";
import { PantallaCalculadora } from "@components/main/remesas/PantallaCalculadora";
// Helpers
import { handleInputChange } from '@helpers/handleInputChange';
import { handleButtonClick } from '@helpers/handleButtonClick';


// Componente Calculadora
export const Calculadora = () => {

  // Hooks
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const remesas = useSelector((state) => state.remesas.remesas);

  // Efecto que se acciona cada que el error cambie
  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowAlert(false);
    }
  }, [error]);


  return (

    <div className={`grid grid-cols-4 grid-rows-5 font-extrabold m-auto max-h-[calc(100vh-200px)] h-[32rem] sm:h-[36rem] md:h-[32rem] lg:h-[28rem] xl:h-[32rem] 2xl:h-[48rem] w-full sm:w-[28rem] md:w-[28rem] lg:w-[20rem] xl:w-[26rem] 2xl:w-[28rem] lg:mt-16 xl:mt-12 2xl:mt-8`}
      style={{
        gridTemplateAreas: `
          "input input input input"
          "one two three delete"
          "four five six delete"
          "seven eight nine enter"
          "zero zero point enter"
        `
      }}>

      <PantallaCalculadora value={inputValue} onChange={(event) => handleInputChange(event, setInputValue, setError)} />

      <BotonesCalculadora onClick={(value) => handleButtonClick(value, inputValue, setInputValue, setError, remesas, dispatch)} />


      {showAlert && (
        <div className="fixed top-5 left-0 right-0 flex justify-center z-[1000] animate-fade-in-out">
          <Alert variant="filled" severity="warning">{error}</Alert>
        </div>
      )}

    </div>
  );
};
