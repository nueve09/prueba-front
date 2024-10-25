// Bibliotecas
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// CSS Styles
import '@styles/Main.css';
// Componentes
import Inicio from "@components/main/inicio/Inicio";
import Remesas from "@components/main/remesas/Remesas";
import Credito from "@components/main/credito/Credito";
import Reportes from "@components/main/reportes/Reportes";
import Transferencias from "@components/main/transferencias/Transferencias";
import Graficas from "@components/main/graficas/Graficas";


// Componente Main
const Main = () => {

  return (

    <div className="contenido_main">
      
      <Routes>
        <Route path="/" element={<Navigate to="/remesas" />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/remesas" element={<Remesas />} />
        <Route path="/credito" element={<Credito />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/transferencias" element={<Transferencias />} />
        <Route path="/graficas" element={<Graficas />} />
      </Routes>

    </div>

  );
};

export default Main;