// Bibliotecas
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Data
import { Icons } from "@data/icons";


// Componente BotonMenu
const BotonMenu = ({ navbarOpen, setNavbarOpen }) => {
  
  return (

    <FontAwesomeIcon
      icon={Icons.Flecha}
      onClick={() => setNavbarOpen(!navbarOpen)}
      className={`boton_menu ${!navbarOpen ? 'rotar_icono' : ''} ${navbarOpen ? 'icono_activo' : ''}`}
    />
    
  );
};

export default BotonMenu;
