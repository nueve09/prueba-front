import React, { useState, useEffect } from "react";
import { XCircleFill } from 'react-bootstrap-icons';
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import { Bell } from 'react-bootstrap-icons';
import { PersonCircle } from 'react-bootstrap-icons';
import { ChevronDown } from 'react-bootstrap-icons';
import { Keyboard } from 'react-bootstrap-icons';
import { Search } from 'react-bootstrap-icons';
import { Sliders } from 'react-bootstrap-icons';
import { Printer } from 'react-bootstrap-icons';
import Menu from './components/Menu'
import MessageError from './components/MessageError'

export default function App () {
  const [inputValue, setInputValue] = useState<any>('')
  const [showError, setShowError] = useState<any>('')
  const [textMessage, setTextMessage] = useState<string>('')
  const setInput = (number: any) => {
    if (inputValue.length < 8) {
      let value = inputValue
      value = value + number
      setInputValue(value)
    } else {
      setShowError(true)
      setTextMessage('Máximo 0 digitos')
      setTimeout(function () {
        setShowError(false)
      }, 6000)
    }
  }

  const deleteInput = () => {
    let value = inputValue.slice(0, -1)
    setInputValue(value)
  }

  return (
    <div className="d-flex align-items-center justify-content-center container-remesas">
      <div className="d-flex container-back">
        <div className="element-left">
          <Menu />
        </div>
        <div className="element-center">
          <div>
            <div className="title">ventanilla <b>Digital</b></div>
            <div className="subtitle">Remesas</div>
            <div className="numbers">
              <input type="text" name="inputValue" id="inputValue" value={inputValue} />
              <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="d-flex">
                  <div className="d-flex flex-column">
                    <div className="d-flex">
                      <div>
                        <div className="back-numbers" onClick={() => setInput(1)}>1</div>
                        <div className="back-numbers" onClick={() => setInput(4)}>4</div>
                        <div className="back-numbers" onClick={() => setInput(7)}>7</div>
                      </div>
                      <div>
                        <div className="back-numbers" onClick={() => setInput(2)}>2</div>
                        <div className="back-numbers" onClick={() => setInput(5)}>5</div>
                        <div className="back-numbers" onClick={() => setInput(8)}>8</div>
                      </div>
                      <div>
                        <div className="back-numbers" onClick={() => setInput(3)}>3</div>
                        <div className="back-numbers" onClick={() => setInput(6)}>6</div>
                        <div className="back-numbers" onClick={() => setInput(9)}>9</div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="back-numbers back-numbers-cero" onClick={() => setInput(0)}>0</div>
                      <div className="back-numbers mt-0" onClick={() => setInput('.')}>.</div>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-center back-numbers back-numbers-delete" onClick={() => deleteInput()}>
                      <XCircleFill size={30} />
                    </div>
                    <div className="d-flex align-items-center justify-content-center back-numbers back-numbers-enter">
                      <ArrowReturnLeft color="#FFFFFF" size={30} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="element-right position-relative">
          <div className="d-flex align-items-center justify-content-end p-3">
            <div className="d-flex align-items-center justify-content-center notification">
              <Bell />
            </div>
            <div className="d-flex align-items-center justify-content-center notification ms-1">
              <PersonCircle  size={30} />
            </div>
            <div className="d-flex align-items-left justify-content-center flex-column info ms-2">
              <div>José Luis</div>
              <div><b>Operador</b></div>
            </div>
            <div className="ms-2">
              <ChevronDown size={10} />
            </div>
          </div>
          <div className="d-flex justify-content-between p-4">
            <div>
              <div className="date">Hoy</div>
              <div className="date-info">6 de abril de 2025</div>
            </div>
            <div className="d-flex align-items-center justify-content-center keyboard ms-1">
              <Keyboard color="#FFFFFF" size={30} />
            </div>
          </div>
          <div className="d-flex justify-content-end p-4">
            <div className="d-flex align-items-center justify-content-center borders ms-1">
              <Search color="#154360" size={20} />
            </div>
            <div className="d-flex align-items-center justify-content-center borders ms-1">
              <Sliders color="#154360" size={20} />
            </div>
            <div className="d-flex align-items-center justify-content-center borders ms-1">
              <Printer color="#154360" size={20} />
            </div>
          </div>
          <div className="p-4 pt-1">
            <div className="d-flex table">
              <div>#29939303</div>
              <div>Wester Union</div>
              <div>$12.000.00</div>
            </div>
            <div className="d-flex table">
              <div>#29939303</div>
              <div>Wester Union</div>
              <div>$12.000.00</div>
            </div>
            <div className="d-flex table">
              <div>#29939303</div>
              <div>Wester Union</div>
              <div>$12.000.00</div>
            </div>
            <div className="d-flex table">
              <div>#29939303</div>
              <div>Wester Union</div>
              <div>$12.000.00</div>
            </div>
            <div className="d-flex table">
              <div>#29939303</div>
              <div>Wester Union</div>
              <div>$12.000.00</div>
            </div>
          </div>
          {
        showError && (
          <MessageError message={textMessage} close={setShowError} />
        )
      }
        </div>
      </div>
    </div>
  );
}
