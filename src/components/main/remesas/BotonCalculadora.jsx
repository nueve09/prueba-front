// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Componente BotonCalculadora
export const BotonCalculadora = ({ area, value, rotate, type, onClick }) => {

  // Estilos para botones auxiliares segun seccion
  const estilosBoton = {
    "normal": 'bg-white-50 text-mine-shaft-950 hover:bg-white-300',
    "delete": 'bg-white-50 text-black-950 hover:bg-white-300',
    "enter": 'bg-dark-blue-800 text-white-50 hover:bg-dark-blue-900',
  };

  // Estilos css
  const css = estilosBoton[type] || '';

  return (

    <button className={`block text-2xl font-extrabold rounded-full mx-2 my-3 duration-300 ${css} sm:text-3xl sm:mx-3  md:mx-4 lg:mx-1 xl:mx-3 2xl:mx-3 sm:my-2  md:my-3 lg:my-3 xl:my-3 2xl:my-3`} style={{ gridArea: area }} onClick={() => onClick(value)}
    >
      {typeof value === 'string'
        ? <span>{value}</span>
        : <FontAwesomeIcon icon={value} style={{ transform: `rotate(${rotate}deg)` }} />
      }

    </button>

  );
};
