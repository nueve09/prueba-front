import React, { useState, useEffect } from "react";
import { House } from 'react-bootstrap-icons';
import { CurrencyExchange } from 'react-bootstrap-icons';
import { ClipboardData } from 'react-bootstrap-icons';
import { CashCoin } from 'react-bootstrap-icons';
import { ArrowReturnRight } from 'react-bootstrap-icons';
import { FileEarmarkSpreadsheet } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import { Bell } from 'react-bootstrap-icons';
import { PersonCircle } from 'react-bootstrap-icons';
import { ChevronDown } from 'react-bootstrap-icons';
import { Keyboard } from 'react-bootstrap-icons';
import { Search } from 'react-bootstrap-icons';
import { Sliders } from 'react-bootstrap-icons';
import { Printer } from 'react-bootstrap-icons';

export default function App () {

  return (
    <div className="d-flex align-items-center justify-content-center container-remesas">
      <div className="d-flex container-back">
        <div className="element-left">
          <ul>
            <li>
              <img className="logo" src="https://jlvr.sweaghe.com/vistas/contenedor/uno/img/sweaghe_copyright.jpg?5" alt="" />
            </li>
            <li>
              <House color="#FFFFFF" className="icons" size={25}  />
            </li>
            <li>
              <CurrencyExchange color="#a3e4d7" className="icons" size={25}  />
            </li>
            <li>
              <ClipboardData color="#FFFFFF" className="icons" size={25}  />
            </li>
            <li>
              <CashCoin color="#FFFFFF" className="icons" size={25}  />
            </li>
            <li>
              <ArrowReturnRight color="#FFFFFF" className="icons" size={25}  />
            </li>
            <li>
              <FileEarmarkSpreadsheet color="#FFFFFF" className="icons" size={25}  />
            </li>
          </ul>
        </div>
        <div className="element-center">
          <div>
            <div className="title">ventanilla <b>Digital</b></div>
            <div className="subtitle">Remesas</div>
            <div className="numbers">
              <input type="text" name="" id="" />
              <div className="d-flex align-items-center justify-content-center mt-3">
                <div className="d-flex">
                  <div className="d-flex flex-column">
                    <div className="d-flex">
                      <div>
                        <div className="back-numbers">1</div>
                        <div className="back-numbers">2</div>
                        <div className="back-numbers">3</div>
                      </div>
                      <div>
                        <div className="back-numbers">4</div>
                        <div className="back-numbers">5</div>
                        <div className="back-numbers">6</div>
                      </div>
                      <div>
                        <div className="back-numbers">7</div>
                        <div className="back-numbers">8</div>
                        <div className="back-numbers">9</div>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="back-numbers back-numbers-cero">0</div>
                      <div className="back-numbers mt-0">.</div>
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-center back-numbers back-numbers-delete">
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
        <div className="element-right">
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
            <div className="ms-1">
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
        </div>
      </div>
    </div>
  );
}
