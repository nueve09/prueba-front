// Bibliotecas
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Data
import { Icons } from '@data/icons';
// Assets
import { ImgUser } from "@assets/imgs";


// Componente Usuario
export const Usuario = () => {

  return (

    <div className="contenedor_usuario">
      
      {/* Boton con foto de usuario */}
      <button className={`btn_usuario ${ImgUser ? 'img_usuario' : 'no_img_usuario'}`}></button>

      {/* Seccion de perfil de usuario */}
      <div className="contenido_perfil">
        <p className="nombre_usuario">Bryan</p>
        <p className="rol_usuario">Operador</p>
      </div>

      {/* Icono de flecha */}
      <FontAwesomeIcon icon={Icons.Flecha} className="icono_flecha" rotation={270} />

    </div>

  );
};