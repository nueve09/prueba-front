import { useState } from "react"
import { House } from 'react-bootstrap-icons';
import { CurrencyExchange } from 'react-bootstrap-icons';
import { ClipboardData } from 'react-bootstrap-icons';
import { CashCoin } from 'react-bootstrap-icons';
import { ArrowReturnRight } from 'react-bootstrap-icons';
import { FileEarmarkSpreadsheet } from 'react-bootstrap-icons';

const Menu = () => {
  return (
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
  )
}
  
export default Menu