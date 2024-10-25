// Bibliotecas
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Helpers
import { handleInputChange } from '@helpers/handleInputChange';
import { handleButtonClick } from '@helpers/handleButtonClick';
// Data
import { catalogoAlertas } from "@data/catalogoAlertas";
import { Buttons } from '@data/buttons';


// Componente Calculadora
export const Calculadora = () => {

  // Hooks
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey] = useState(null);

  // Constantes
  const remesas = useSelector((state) => state.remesas.remesas);

  // Efecto para mostarr alertas
  useEffect(() => {
    if (error) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  // Cierra la alerta mostrada
  const cerrarAlerta = () => {
    setShowAlert(false);
    setAlertKey(null);
  };

  // Muestra la alerta
  const mostrarAlerta = (key, inputValue) => {
    setAlertKey({ key, inputValue });
    setShowAlert(true);
  };

  return (

    <div className="contenedor_calculadora">

      <div className="contenido_calculadora">

        {/* Pantalla de la calculadora */}
        <div className="contenedor_pantalla_calculadora">

          <span className="leyenda_pantalla_calculadora">|⁕⁕</span>

          <input id="inputCalculator" name="inputCalculator" type="text" autoComplete='off' className="pantalla_calculadora" placeholder="" value={inputValue} onChange={(event) => handleInputChange(event, setInputValue)} />

        </div>


        {/* Botones interactivos de la calculadora */}
        <div className="contenedor_botones">

          {Buttons.map(({ area, value, rotate, type }) => (

            <button key={`${area}-${value}`} className={`btn_calculadora ${type}`} style={{ gridArea: area }} onClick={() => handleButtonClick(value, inputValue, setInputValue, remesas, mostrarAlerta)}>

              {typeof value === 'string'
                ? <span>{value}</span>
                : <FontAwesomeIcon icon={value} style={{ transform: `rotate(${rotate}deg)` }} />
              }

            </button>

          ))}

        </div>

      </div>

      {/* Alertas */}
      {showAlert && alertKey && catalogoAlertas[alertKey.key] && (
        React.createElement(catalogoAlertas[alertKey.key].component, {
          ...catalogoAlertas[alertKey.key].props,
          onClose: cerrarAlerta,
          mostrarAlerta,
          inputValue: alertKey.inputValue,
        })
      )}
      
    </div>
  );
};
