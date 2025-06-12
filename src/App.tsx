import { ConsignmentProvider } from "./context/consignments.porvider";
import { consignments } from "./data/consignment.data";
import Calculator from "./layout/calculator/calculator.component";
import Consignments from "./layout/consignments/consignments.component";
import SideMenu from "./layout/sideMenu/sideMenu.component";

function App() {
  return (
    <section style={{ display: "flex", height: "100vh" }}>
      <ConsignmentProvider defaultConsignments={consignments}>
        <SideMenu />
        <Calculator />
        <Consignments />
      </ConsignmentProvider>
    </section>
  );
}

export default App;
