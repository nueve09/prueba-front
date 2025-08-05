import { useSidebar } from '../../shared/context/SidebarContext';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const { isExpanded } = useSidebar();
  
  return (
    <div className={`layout ${!isExpanded ? 'layout--sidebar-collapsed' : ''}`}>
      <div className="layout__content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
