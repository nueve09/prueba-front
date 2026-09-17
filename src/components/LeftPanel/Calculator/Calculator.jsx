import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faLevelDownAlt } from '@fortawesome/free-solid-svg-icons'

import './Calculator.css'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function Calculator({ setCobrado }) {
  const [value, setValue] = useState('')

  // README: validar formato de id (solo dígitos, máximo 8 caracteres)
  const appendDigit = (char) => {
    if (!/^\d$/.test(char)) return
    setValue((current) => {
      if (current.length >= 8) return current
      return current + char
    })
  }

  // README: validar formato de id (solo dígitos, máximo 8 caracteres)
  const handleInputChange = (event) => {
    setValue(event.target.value.replace(/\D/g, ''))
  }

  const handleBackspace = () => {
    setValue((current) => current.slice(0, -1))
  }

  const handleEnter = () => {
    // Se implementará junto con la validación de la remesa.\
    setCobrado(value)
  }

  return (
    <div className="calculator">
      <input
        type="text"
        inputMode="numeric"
        className="calculator-input"
        value={value}
        onChange={handleInputChange}
        placeholder="0"
        maxLength={8}
      />

      <div className="calculator-keys">
        {DIGITS.map((digit) => (
          <button
            type="button"
            key={digit}
            className={`calculator-key key-${digit}`}
            onClick={() => appendDigit(digit)}
          >
            {digit}
          </button>
        ))}

        <button
          type="button"
          className="calculator-key key-backspace"
          onClick={handleBackspace}
          aria-label="Borrar"
        >
          <FontAwesomeIcon icon={faDeleteLeft} className="icon" />
        </button>

        <button
          type="button"
          className="calculator-key key-0"
          onClick={() => appendDigit('0')}
        >
          0
        </button>

        <button
          type="button"
          className="calculator-key key-dot"
          onClick={() => appendDigit('.')}
        >
          .
        </button>

        <button
          type="button"
          className="calculator-key key-enter"
          onClick={handleEnter}
          aria-label="Confirmar"
        >
          <FontAwesomeIcon icon={faLevelDownAlt} className="icon" />
        </button>
      </div>
    </div>
  )
}

export default Calculator
