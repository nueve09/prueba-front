// Bibliotecas
import React from 'react';
// Assets
import { ImgLogo } from '@assets/imgs/index';


// Componente Logo
const Logo = ({ navbarOpen }) => {

  return (

    <div className="contenedor_logo">

      <img src={ImgLogo} alt="Logo Nueve09" className="imagen_logo" />
      <h1 className={`titulo_logo ${navbarOpen ? 'slide-in' : 'slide-out'}`}>Nueve09</h1>
      
    </div >

  );
};

export default Logo;
