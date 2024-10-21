// Bibliotecas
import React from 'react';
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
    <div
      className={`
        ${navbarOpen ? "w-screen" : "w-16"} relative p-2 bg-tuatara-900 duration-200 flex flex-col
        ${navbarOpen ? "sm:w-56" : "sm:w-16"}
        ${navbarOpen ? "md:w-64" : "md:w-20"}
        ${navbarOpen ? "lg:w-80" : "lg:w-28"}
        ${navbarOpen ? "xl:w-80" : "xl:w-32"}
        ${navbarOpen ? "2xl:w-96" : "2xl:w-36"}
      `}>

      <BotonMenu navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen}/>
      <Logo navbarOpen={navbarOpen} />
      <NavbarMenu navbarOpen={navbarOpen} onMenuClick={handleMenuClick} />

    </div>
  );
};

export default Navbar;
