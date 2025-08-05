import Icon from '../ui/Icon';
import { useSidebar } from '../../shared/context/SidebarContext';
import './Sidebar.css';

const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar();

  const navigationItems = [
    { icon: 'house', label: 'Inicio' },
    { icon: 'currency-dollar', label: 'Remesas', active: true },
    { icon: 'credit-card', label: 'Documentos' },
    { icon: 'receipt', label: 'Reportes' },
    { icon: 'arrow-right-circle', label: 'Configuración' },
    { icon: 'folder2-open', label: 'Usuario' }
  ];

  return (
    <aside className={`sidebar ${isExpanded ? 'sidebar--expanded' : 'sidebar--collapsed'}`}>
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="logo-image">
            <img 
              src="https://play-lh.googleusercontent.com/QRCRv6fDxgSKQqBwVgCS5hy_dP_ne3sU2P4EzFUQh_E8vrXvCmZ2YF6ImBMdDcmxXQ=s124" 
              alt="Logo"
              className="logo-img"
            />
          </div>
        </div>
        
        <button 
          className="sidebar__hamburger"
          onClick={toggleSidebar}
          title="Menú"
        >
          <Icon name="list" />
        </button>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item, index) => (
          <button
            key={index}
            className={`nav-item ${item.active ? 'nav-item--active' : ''}`}
            title={item.label}
          >
            <Icon name={item.icon} />
            <span className="nav-item__label">{item.label}</span>
          </button>
        ))}
      </nav>

      <button 
        className="sidebar__toggle"
        onClick={toggleSidebar}
        title={isExpanded ? 'Contraer sidebar' : 'Expandir sidebar'}
      >
        <Icon name={isExpanded ? 'chevron-left' : 'chevron-right'} />
      </button>
    </aside>
  );
};

export default Sidebar;
