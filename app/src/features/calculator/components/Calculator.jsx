import Icon from '../../../components/ui/Icon';
import { useCalculator } from '../hooks/useCalculator';
import './Calculator.css';

const Calculator = () => {
  const { display, handleKeyPress, handleSubmit, error, clearError, successMessage } = useCalculator();

  return (
    <div className="calculator">
      <div className="calculator__display">
        <input
          type="text"
          value={display}
          readOnly
          className="calculator__input"
          placeholder="Ingrese ID de remesa"
        />
      </div>

      <div className="calculator__keypad">
        <button className="calculator__key" onClick={() => handleKeyPress('1')}>1</button>
        <button className="calculator__key" onClick={() => handleKeyPress('2')}>2</button>
        <button className="calculator__key" onClick={() => handleKeyPress('3')}>3</button>
        <button className="calculator__key" onClick={() => handleKeyPress('4')}>4</button>
        <button className="calculator__key" onClick={() => handleKeyPress('5')}>5</button>
        <button className="calculator__key" onClick={() => handleKeyPress('6')}>6</button>
        <button className="calculator__key" onClick={() => handleKeyPress('7')}>7</button>
        <button className="calculator__key" onClick={() => handleKeyPress('8')}>8</button>
        <button className="calculator__key" onClick={() => handleKeyPress('9')}>9</button>
        <button className="calculator__key calculator__key--zero" onClick={() => handleKeyPress('0')}>0</button>
        <button className="calculator__key" onClick={() => handleKeyPress('.')}>.</button>
        
        <button 
          className="calculator__key calculator__key--clear"
          onClick={() => handleKeyPress('clear')}
        >
          ×
        </button>

        <button 
          className="calculator__key calculator__key--submit"
          onClick={handleSubmit}
        >
          <Icon name="arrow-return-left" />
        </button>
      </div>

      <div className="calculator__notifications">
        {error && (
          <div className="calculator__message calculator__message--error">
            <span>{error}</span>
            <button onClick={clearError} className="message-close">×</button>
          </div>
        )}
        
        {successMessage && (
          <div className="calculator__message calculator__message--success">
            <span>{successMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
