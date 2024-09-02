import React, { useState } from 'react';
import './Calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { remesas } from '../data'; 

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEnter = () => {
   
    if (input.length > 8) {
      alert('El ID debe tener un máximo de 8 dígitos');
      return;
    }

    
    const remesa = remesas.find(r => r.id === input);

    
    if (!remesa) {
      alert('ID no encontrado');
      return;
    }

   
    if (remesa.status === "COBRADO") {
      alert('Esta remesa ya ha sido cobrada');
    } else {
      
      const now = new Date().toISOString().split('T')[0]; 
      remesa.status = "COBRADO";
      remesa.charged_at = now;

      alert('Remesa cobrada exitosamente');

     
      setInput('');
    }
  };

  return (
    <div className="calculator">
      <div className="title">Ventanilla Digital</div>
      <div className="divider"></div>
      <div className="title2">Calculadora de Remesas</div>

      <div className="display">(** {input})</div>
      <div className="buttons">
        <div className="number-buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
            <button key={num} onClick={() => handleButtonClick(num.toString())}>
              {num}
            </button>
          ))}
        </div>
        <div className="side-buttons">
          <button className="button-wide enter" onClick={handleBackspace}>
            <FontAwesomeIcon icon={faBackspace} />
          </button>
          
          <button className="button-wide enter" onClick={handleEnter}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
