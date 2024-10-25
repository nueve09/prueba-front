// Bibliotecas
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { cobrarRemesa } from '@redux/slices/remesas'
// CSS Styles
import '@styles/alertas.css';
import '@styles/animaciones.css';
// Data
import { Icons } from '@data/icons';


// Componente AlertaPregunta
export const AlertaPregunta = ({ title, text, onClose, inputValue }) => {

  // Hooks
  const [confirmExit, setConfirmExit] = useState(false);

  // Constantes
  const dispatch = useDispatch();
  const remesas = useSelector((state) => state.remesas.remesas);
  const remesa = remesas.find(remesa => remesa.id.toString() === inputValue);

  // Accion al dar clic en boton confirmar
  const confirmar = () => {
    dispatch(cobrarRemesa(remesa.id));
    cerrarAlerta();
  };

  // Accion al dar clic en boton cancelar
  const cancelar = () => {
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

      {/* Fondo opaco */}
      <div className="fondo"></div>

      {/* Contenedor de la alerta */}
      <div className="contenedor_alerta">

        <div className={`contenido_alerta ${confirmExit ? 'slide-bottom' : 'slide-top'}`}>

          {/* Encabezado de la alerta */}
          <header className="encabezado_alerta">

            {/* Icono segun tipo de alerta */}
            <div className={`icono_alerta pregunta`}><FontAwesomeIcon icon={Icons.Question} /></div>

            {/* Mensaje de la alerta */}
            <div className="contenedor_mensaje">
              <h2 className="titulo">{title}</h2>
              <p className="mensaje">{text}</p>
            </div>

          </header>

          {/* Botones de la alerta */}
          <footer className="contenedor_botones_alerta">
            {/* Boton Confirmar */}
            <button className="btn_enviar pregunta" type="button" onClick={confirmar}>Si, cobrar</button>
            {/* Boton Cancelar */}
            <button className="btn_noenviar pregunta" type="button" onClick={cancelar}>No cobrar</button>
          </footer>

        </div>
      </div>
    </>

  );
};