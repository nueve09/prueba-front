import { ConsignmentProvider } from "./context/consignments.provider";
import { SnackbarProvider } from "./context/snackbar.provider";
import { consignments } from "./data/consignment.data";
import Calculator from "./layout/calculator/calculator.component";
import Consignments from "./layout/consignments/consignments.component";
import SideMenu from "./layout/sideMenu/sideMenu.component";
import "./App.css";

function App() {
  return (
    <SnackbarProvider>
      <ConsignmentProvider defaultConsignments={consignments}>
        <section className="app_container">
          <SideMenu />
          <Calculator />
          <Consignments />
        </section>
      </ConsignmentProvider>
    </SnackbarProvider>
  );
}

export default App;
