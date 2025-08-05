import Layout from './components/layout/Layout';
import Sidebar from './components/layout/Sidebar';
import CalculatorSection from './components/layout/CalculatorSection';
import MainContent from './components/layout/MainContent';
import { RemesasProvider } from './shared/context/RemesasContext';
import { SidebarProvider } from './shared/context/SidebarContext';
import './styles/globals.css';

function App() {
  return (
    <SidebarProvider>
      <RemesasProvider>
        <Layout>
          <Sidebar />
          <CalculatorSection />
          <MainContent />
        </Layout>
      </RemesasProvider>
    </SidebarProvider>
  );
}

export default App;
