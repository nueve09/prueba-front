import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import './calculator.css';

const Calculator = ({remittances, setRemittances, showAlert}) => {
  const[display, setDisplay] = useState("");
  const[alert, setAlert] = useState({type: "", message:"", visible: false})
  
  const handleNumberClick = (number) => {
    setDisplay(prev => {
      if (number === '.' && prev.includes('.')) return prev
      else if (prev.length < 8) return prev + number
      else return  prev
    });
  }

  const eraseNumber = () =>{
    setDisplay("0")
    handleClear()
  }

  const handleEnter = () => {
    if (display.length === 0) {
      showAlert('danger', 'Debes agregar un ID', 'ID vacío');
      return;
    }

    const found = remittances.find(r => r.id === display);
    if (!found) {
      showAlert('danger', 'El ID no existe en la base de datos', 'Error de búsqueda');
      return;
    }

    if (found.status === 'COBRADO') {
      showAlert('warning', 'El ID ya fue cobrado previamente', 'Duplicado');
      return;
    }

    const updated = remittances.map(r =>
      r.id === display ? { ...r, status: 'COBRADO', charged_at: getToday() } : r
    );

    setRemittances(updated);
    setDisplay('');
    showAlert('success', 'Remesa cobrada exitosamente', 'Éxito');
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0].replace(/-/g, ''); // formato: YYYYMMDD
  };

  const handleClear = () => {
    setDisplay('');
    setAlert({ type: '', message: '', visible: false });
  };

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const closeAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <div className="calculator-container">
      <small className="subtitle">Ventanilla <b>Digital</b></small>
      <hr className='line'/>
      <p className="title">Remesas</p>
      <div className="calc-center">
        <input type="text" className="display" value={display} 
          placeholder='0'
          onChange={(e) =>{
            const val = e.target.value;
            if (/^\d*\.?\d*$/.test(val) && val.length <= 8) {
              setDisplay(val);
            }
          }}
          inputMode="decimal"
          pattern="[0-9]*"
          onPaste={(e) => {
            const text = e.clipboardData.getData('text');
            if (!/^\d*\.?\d*$/.test(text)) {
              e.preventDefault();
            }}}
        />

        {alert.visible && (
          <div className={`custom-alert ${alert.type}`}>
            {alert.message}
            <button className="close-btn" onClick={closeAlert}>×</button>
          </div>
        )}

        <div className="buttons-grid">
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>

          <button 
            className="tall-btn" 
            onClick={() => eraseNumber()}>
          <FontAwesomeIcon icon={faDeleteLeft} />
          </button>

          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>

          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>

          <button 
            onClick={() => handleEnter()} 
            className="tall-btn blue" 
            >
              <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button onClick={() => handleNumberClick('0')} className="zero-btn">0</button>
          <button onClick={() => handleNumberClick('.')}>.</button>
        </div> 
      </div>
    </div>
  );
};

export default Calculator;