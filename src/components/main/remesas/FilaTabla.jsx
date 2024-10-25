// Bibliotecas
import React from 'react';


// Componente FilaTabla
export const FilaTabla = ({ title, character }) => {

  return (

    <>
      {
        title && character
          ? <td>{character} {title}</td>
          : <td colSpan="4" >No hay datos disponibles.</td>
      }
    </>

  );
};
