// Bibliotecas
import React from 'react';
// Assets
import { ImgLogo } from '@assets/imgs/index';


// Componente Logo
const Logo = ({ navbarOpen }) => {

  return (

    <div className={`flex gap-x-4 items-center justify-left my-5`}>

      <img src={ImgLogo} alt="Logo Nueve09" className={`block cursor-pointer rounded-2xl w-8 h-8 mx-1 sm:w-9 sm:h-9 sm:mx-1 md:w-12 md:h-12 md:mx-2 md:my-3 lg:w-14 lg:h-14 lg:mx-3 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 `} />

      <h1 className={`text-white origin-left font-extrabold text-white-50 text-xl duration-200 ${!navbarOpen && "scale-0"} sm:text-xl lg:text-2xl 2xl:text-3xl`}> Nueve09</h1>

    </div>

  );
};

export default Logo;
