// Bibliotecas
import React from 'react';
// CSS Styles
import '@styles/Navbar.css';
// Componentes
import BotonMenu from './BotonMenu';
import Logo from './Logo';
import NavbarMenu from './NavbarMenu';


// Componente del Navbar
const Navbar = ({ navbarOpen, setNavbarOpen }) => {

  // Manejar el estato del navbar
  const handleMenuClick = () => {
    setNavbarOpen(false);
  };

  return (

    <div className={`navbar ${navbarOpen ? 'navbar_open' : 'navbar_closed'}`}>

      <BotonMenu navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
      <Logo navbarOpen={navbarOpen} />
      <NavbarMenu navbarOpen={navbarOpen} onMenuClick={handleMenuClick} />

    </div>
    
  );
};

export default Navbar;
