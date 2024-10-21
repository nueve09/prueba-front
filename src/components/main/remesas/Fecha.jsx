// Bibliotecas
import React from 'react';
// Helpers
import { getDateToday } from '@helpers/getDateToday';


// Componente Fecha
export const Fecha = ({ title }) => {

  return (

    <div className='flex flex-col'>

      <strong className={`text-dark-blue-800 font-extrabold leading-normal text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl`}>{title}</strong>

      <p className={`text-black-950 font-extrabold leading-normal text-xs sm:text-sm md:text-base lg:text-sm xl:text-base`}>{getDateToday()}</p>

    </div>

  );
};
