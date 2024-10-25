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

    <li className={`elemento_menu ${navbarActivo ? 'elemento_menu_activo' : 'elemento_menu_inactivo'}`} onClick={handleNavigation}>

      <FontAwesomeIcon icon={menu.nameIcon} className="icono_menu" />
      <span className={`titulo_elemento_menu ${navbarOpen ? 'slide-in' : 'slide-out'}`}> {menu.title} </span>


    </li>

  );
};

export default MenuItem;
