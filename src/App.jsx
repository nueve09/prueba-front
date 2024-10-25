// Bibliotecas
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// CSS Styles
import "@styles/App.css"
// Componentes
import Main from "@components/main/Main";
import Navbar from './components/navbar/Navbar';


// Componente App
function App() {

  // Hooks
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (

    <Router>
      <div className={`contenedor_app ${navbarOpen ? 'mostrar_navbar' : ''}`}>

        <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        
        <div className="contenedor_main">
          <Main />
        </div>

      </div>
    </Router>


  );
}

export default App;
