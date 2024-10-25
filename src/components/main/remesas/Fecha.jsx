// Bibliotecas
import React from 'react';
// Helpers
import { getDateToday } from '@helpers/getDateToday';


// Componente Fecha
export const Fecha = ({ title }) => {

  return (

    <div className="contenido_fecha">
      <strong className="titulo_fecha">{title}</strong>
      <p className="texto_fecha">{getDateToday()}</p>
    </div>
    
  );
};
