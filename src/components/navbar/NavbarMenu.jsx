// Bibliotecas
import React from 'react';
// Componentes
import MenuItem from '@components/navbar/MenuItem';
// Data
import { Menu } from '@data/menu';


// Componente NavbarMenu
const NavbarMenu = ({ navbarOpen, onMenuClick }) => {

  return (

    <ul className="menu_navbar">

      {Menu.map((menu, index) => (
        <MenuItem key={index} menu={menu} navbarOpen={navbarOpen} onClick={onMenuClick} />
      ))}

    </ul>

  );
};

export default NavbarMenu;
