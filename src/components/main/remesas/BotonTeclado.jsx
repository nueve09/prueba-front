// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Data
import { Icons } from '@data/icons';


// Componente BotonTeclado
export const BotonTeclado = ({ onClick }) => {

  return (

    <button onClick={onClick} className="btn_teclado">
      <FontAwesomeIcon icon={Icons.Keyboard} className="icono_teclado" />
    </button>
    
  );
};
