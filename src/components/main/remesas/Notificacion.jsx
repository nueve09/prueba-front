// Bibliotecas
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Data
import { Icons } from '@data/icons'


// Componente Notificacion
export const Notificacion = () => {

  return (

    <button className={`cursor-pointer relative rounded-full w-8 h-8 border-2 duration-300 border-mercury-100 bg-mercury-100 hover:bg-mercury-200 p-2 flex items-center justify-center sm:w-9 sm:h-9 lg:w-10 lg:h-10`}>

      <small className={`absolute -top-2 -right-1 text-white-50 bg-red-600 p-2 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold sm:w-5 sm:h-5 `}>1</small>

      <FontAwesomeIcon icon={Icons.Notification} className={`text-mine-shaft-950 text-lg`} />

    </button>

  );
};
