// Bibliotecas
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Componente MenuItem
const MenuItem = ({ menu, navbarOpen, onClick }) => {

  // Constantes
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const navbarActivo = ubicacion.pathname === menu.path;

  // Manejador de estado del navbar
  const handleNavigation = () => {
    navegar(menu.path);
    onClick();
  };

  return (

    <li className={`flex items-center cursor-pointer duration-100 hover:text-sky-500 ${navbarActivo ? 'text-sky-400' : 'text-white-50'} gap-3`} onClick={handleNavigation}>

      <FontAwesomeIcon icon={menu.nameIcon} className={`min-w-8 mx-1 text-xl sm:min-w-10 md:min-w-12 md:text-2xl md:mx-2 lg:min-w-16  xl:min-w-20 xl:text-3xl 2xl:min-w-24`} />

      <span className={`${!navbarOpen && "scale-0"} origin-left duration-200 text-lg font-semibold md:text-xl lg:text-lg xl:text-2xl`}>
        {menu.title}
      </span>

    </li>
  );
};

export default MenuItem;
