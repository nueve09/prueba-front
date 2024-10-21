// Bibliotecas
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// Componentes
import Main from "@components/main/Main";
import Navbar from './components/navbar/Navbar';


// Componente App
function App() {

  // Hooks
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (

    <Router>
      <div className="flex h-svh font-plus-jakarta">

        <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />

        <div className={`flex-1 ${navbarOpen ? 'hidden sm:flex' : 'flex'}`}>
          <Main />
        </div>

      </div>
    </Router>

  );
}

export default App;
