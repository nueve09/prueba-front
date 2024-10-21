// Bibliotecas
import React from 'react';


// Componente FilaTabla
export const FilaTabla = ({ title, character }) => {

  return (

    <>
      {
        title && character
          ? <td className="py-6 px-1">{character} {title}</td>
          : <td colSpan="4" className="py-2 px-1 text-center">No hay datos disponibles.</td>
      }
    </>

  );
};
