import { BrowserRouter } from "react-router-dom";
import NavigationRoutes from "../../routes/routes";
import Navbar from "../../components/Navbar/Navbar";
import { SystemNotification } from "../../components/SystemNotification/SystemNotification";
import Footer from "../../components/Footer/Footer";

function MainPage() {
  return (
    <BrowserRouter>
      <div className="flex flex-col md:flex-row">
        <Navbar />
        <NavigationRoutes />
      </div>
      <SystemNotification />
      <Footer />
    </BrowserRouter>
  );
}

export default MainPage;
