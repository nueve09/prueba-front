import { Route, Routes } from "react-router-dom";
import Remittances from "../pages/Remittances/Remittances";
import Home from "../pages/Home/Home";
import Module3 from "../pages/Module3/Module3";
import Module4 from "../pages/Module4/Module4";
import Module5 from "../pages/Module5/Module5";
import Module6 from "../pages/Module6/Module6";

function NavigationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Remittances />}>
        <Route index element={<Remittances />} />
      </Route>
      <Route path="/home" element={<Home />} />
      <Route path="/remittances" element={<Remittances />} />
      <Route path="/module3" element={<Module3 />} />
      <Route path="/module4" element={<Module4 />} />
      <Route path="/module5" element={<Module5 />} />
      <Route path="/module6" element={<Module6 />} />
    </Routes>
  );
}

export default NavigationRoutes;
