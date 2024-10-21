// Bibliotecas
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Data
import { Icons } from '@data/icons'
// Assets
import { ImgUser } from "@assets/imgs";


// Componente Usuario
export const Usuario = () => {

  return (
    
    <div className={`cursor-pointer p-2 flex items-center justify-center gap-2 md:gap-3 lg:gap-4 xl:gap-5`}>

      {/* Boton con foto de usuario */}
      <button
        className={`rounded-full w-8 h-8 border-2 border-gray-light bg-gray-light text-black p-2 flex items-center justify-center sm:w-9 sm:h-9 lg:w-11 lg:h-11`} style={{
          backgroundImage: ImgUser ? `url(${ImgUser})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
      </button>

      {/* Seccion de peril de usuario */}
      <div className={`text-black-950 font-bold`}>
        <p className={`text-sm leading-tight sm:text-base lg:text-lg 2xl:text-xl`}>Bryan</p>
        <p className={`text-xs leading-tight`}>Operador</p>
      </div>

      {/* Icono de flecha */}
      <FontAwesomeIcon icon={Icons.Flecha} className={`text-black-950 text-lg font-extrabold md:text-xl xl:text-2xl`} rotation={270} />

    </div>

  );
};
