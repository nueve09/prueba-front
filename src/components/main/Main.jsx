// React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

    <div className={`flex-grow h-full bg-mine-shaft-950 text-white-50 min-w-80`} >
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