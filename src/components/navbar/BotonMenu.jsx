// Bibliotecas
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Data
import { Icons } from "@data/icons";


// Componente BotonMenu
const BotonMenu = ({ navbarOpen, setNavbarOpen }) => {
  return (

    <FontAwesomeIcon icon={Icons.Flecha} onClick={() => setNavbarOpen(!navbarOpen)} className={`z-10 absolute cursor-pointer rounded-full -right-4 top-7 w-4 h-4 border-2 border-mine-shaft-950 bg-viking-400 hover:bg-sky-500 text-white-50 p-1 ${!navbarOpen && "rotate-180"} ${navbarOpen && 'right-2'} duration-300 sm:top-8 md:top-12 md:w-5 md:h-5 lg:-right-5 lg:top-12 lg:w-7 lg:h-7 xl:-right-6 xl:top-14  2xl:-right-5 2xl:top-16`} />

  );
};

export default BotonMenu;
