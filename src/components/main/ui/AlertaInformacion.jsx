// Bibliotecas
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// CSS Styles
import '@styles/alertas.css';
import '@styles/animaciones.css';
// Data
import { Icons } from '@data/icons';


// Componente AlertaInformacion
export const AlertaInformacion = ({ title, text, onClose }) => {

  // Hooks
  const [confirmExit, setConfirmExit] = useState(false);

  // Accion al dar clic en boton confirmar
  const confirmar = () => {
    cerrarAlerta();
  };

  // Cierra la alerta
  const cerrarAlerta = () => {
    setConfirmExit(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (

    <>
      {/* Fondo de la ventana */}
      <div className="fondo"></div>

      {/* Contenedor de la alerta */}
      <div className="contenedor_alerta">

        <div className={`contenido_alerta ${confirmExit ? 'slide-bottom' : 'slide-top'}`}>

          {/* Encabezado de la alerta */}
          <header className="encabezado_alerta">
          
            {/* Icono de la alerta */}
            <div className={`icono_alerta informacion`}><FontAwesomeIcon icon={Icons.Info} /></div>

            {/* Mensaje de alerta */}
            <div className="contenedor_mensaje">
              <h2 className="titulo">{title}</h2>
              <p className="mensaje">{text}</p>
            </div>
            
          </header>

          {/* Botones de la alerta */}
          <footer className="contenedor_botones_alerta">
            <button className="btn_enviar informacion" type="button" onClick={confirmar}>Entendido</button>
          </footer>

        </div>
      </div>
    </>

  );
};

