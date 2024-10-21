// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Componente BotonAccion
export const BotonAccion = ({ value, onClick }) => {
  
  return (

    <button onClick={onClick} className={`cursor-pointer rounded-md w-8 h-8 flex items-center justify-center border-2 duration-300 border-dark-blue-200 bg-white-50 hover:bg-dark-blue-100 p-2 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11`}>

      <FontAwesomeIcon icon={value} className={`text-purple text-base`} />
      
    </button>
    
  );
};
