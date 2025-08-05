import { useSidebar } from '../../shared/context/SidebarContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { isExpanded } = useSidebar();
  
  return (
    <div className={`layout ${!isExpanded ? 'layout--sidebar-collapsed' : ''}`}>
      {children}
    </div>
  );
};

export default Layout;
