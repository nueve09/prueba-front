// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Componente BotonAuxiliar
export const BotonAuxiliar = ({ onClick, icons, type }) => {

  return (

    <button className={`btn_aux btn_${type}`} onClick={onClick}>

      <div className="btn_aux_icono">
        {
          icons.map((icon, index) => (
            <FontAwesomeIcon key={index} icon={icon} className="icono_btn_aux" />
          ))
        }
      </div>

    </button>

  );
};
