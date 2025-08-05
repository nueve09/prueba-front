import { useState } from 'react';
import Icon from '../ui/Icon';
import SearchInput from '../../features/search/components/SearchInput';
import PrintDropdown from '../../features/print/components/PrintDropdown';
import './Header.css';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showPrintDropdown, setShowPrintDropdown] = useState(false);
  const [imageError, setImageError] = useState(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const togglePrintDropdown = () => {
    setShowPrintDropdown(!showPrintDropdown);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <header className="header">
      {/* Fila 1: Usuario (derecha) */}
      <div className="header__row header__row--user">
        <div className="header__user">
          <div className="notification-bell">
            <Icon name="bell" />
            <span className="notification-badge">1</span>
          </div>
          
          <div className="user-avatar">
            {!imageError ? (
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Elizabeth"
                className="avatar-img"
                onError={handleImageError}
              />
            ) : (
              <div className="avatar-placeholder">
                <Icon name="person" />
              </div>
            )}
          </div>
          
          <div className="user-info">
            <div className="user-details">
              <span className="user-name">Elizabeth</span>
              <span className="user-role">Operador</span>
            </div>
            <Icon name="chevron-down" className="user-dropdown" />
          </div>
        </div>
      </div>

      {/* Fila 2: Fecha (izquierda) y Calendario (derecha) */}
      <div className="header__row header__row--date">
        <div className="header__date">
          <span className="date-label">Hoy</span>
          <span className="date-value">{formattedDate}</span>
        </div>
        
        <button className="btn btn--calendar header__calendar-btn">
          <Icon name="calendar3" />
        </button>
      </div>

      {/* Fila 3: Búsqueda y Acciones (derecha) */}
      <div className="header__row header__row--actions">
        <div className="header__search-and-actions">
          {showSearch && (
            <SearchInput onClose={() => setShowSearch(false)} />
          )}
          
          <div className="header__actions">
            <button 
              className="btn btn--action header__action-btn" 
              title="Buscar remesas"
              onClick={toggleSearch}
            >
              <Icon name="search" />
            </button>
            <button 
              className="btn btn--action header__action-btn" 
              title="Filtros"
            >
              <Icon name="sliders" />
            </button>
            <div className="print-dropdown-container">
              <button 
                className="btn btn--action header__action-btn" 
                title="Imprimir reporte"
                onClick={togglePrintDropdown}
              >
                <Icon name="printer" />
              </button>
              {showPrintDropdown && (
                <PrintDropdown onClose={() => setShowPrintDropdown(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
