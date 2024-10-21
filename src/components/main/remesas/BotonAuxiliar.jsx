// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Componente BotonAuxiliar
export const BotonAuxiliar = ({ onClick, icons, type }) => {

  // Estilos para botones auxiliares segun seccion
  const estilosBoton = {
    "calculadora": `left-8 border-tuatara-900`,
    "tabla": `right-8 border-white-50`,
  };

  // Estilos css
  const css = estilosBoton[type] || '';

  return (

    <button className={`absolute top-6 border-2 duration-300 bg-viking-400 hover:bg-viking-500 text-tuatara-900 w-16 h-9 rounded-full text-xs flex items-center justify-center sm:top-7 md:top-11 lg:hidden ${css}`} onClick={onClick}>

      <div className="flex items-center justify-center gap-1">
        {icons.map((icon, index) => (<FontAwesomeIcon key={index} icon={icon} className={`text-white-50 text-lg`} />))}
      </div>

    </button>

  );
};
