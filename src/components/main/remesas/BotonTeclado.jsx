// Bibliotecas
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Data
import { Icons } from '@data/icons'


// Componente BotonTeclado
export const BotonTeclado = ({ onClick }) => {

  return (

    <button onClick={onClick} className={`cursor-pointer rounded-full w-10 h-10 flex items-center justify-center border-2 duration-300 border-dark-blue-800 bg-dark-blue-800 hover:bg-dark-blue-900 p-2 sm:w-11 sm:h-11 md:w-12 md:h-12`}>

      <FontAwesomeIcon icon={Icons.Keyboard} className={`text-viking-400 text-xl md:text-2xl`} />

    </button>

  )
}
