// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Componente BotonAccion
export const BotonAccion = ({ value, onClick }) => {

  return (

    <button onClick={onClick} className="btn_accion">
      <FontAwesomeIcon icon={value} className="icono_accion" />
    </button>

  );
};
