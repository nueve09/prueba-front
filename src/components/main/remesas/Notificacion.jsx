// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Data
import { Icons } from '@data/icons';


// Componente Notificacion
export const Notificacion = () => {

  return (

    <button className="btn_notificacion">
      <small className="contador_notificacion">1</small>
      <FontAwesomeIcon icon={Icons.Notification} className="icono_notificacion" />
    </button>

  );
};
