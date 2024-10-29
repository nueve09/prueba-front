import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {
  faKeyboard, faChevronRight, faArrowDown, faMagnifyingGlass, faFilter, faPrint
} from '@fortawesome/free-solid-svg-icons';
import Table from './EnhancedTable';
import CalculatorPopup from './CalculatorPopup';
import Search from './Search';
import Filter from './Filter';
import PushNotifications from './PushNotifications';
import './sliderbar.css';
import avatarImage from './avatar-1.png';
import logo from './logo-2.png';
import icon_01 from './icon_01.png';
import icon_02 from './icon_02.png';
import icon_03 from './icon_03.png';
import icon_04 from './icon_04.png';
import icon_05 from './icon_05.png';
import icon_06 from './icon_06.png';

function Sliderbar() {
  const [open, setOpen] = useState(true);
  const [isCalculatorOpen, setCalculatorOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [notifications, setNotifications] = useState([]);
  const isMobile = window.innerWidth < 768; 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (!event.target.value) {
      addNotification('bad'); 
    } else {
      addNotification('good'); 
    }
  };

  const handleFilterChange = (value) => {
    setFilterCriteria(value);
    addNotification('good'); 
  };

  const addNotification = (type) => {
    const newNotification = {
      id: Date.now().toString(),
      title: type === 'good' ? 'Success!' : 'Error!',
      message: type === 'good' ? 'Action was successful.' : 'An error occurred.',
      type,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

   const handleNotificationClose = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
};


  const navItems = [
    { name: "Home", icon: icon_01, link: "/" },
    { name: "About", icon: icon_02, link: "/about" },
    { name: "Services", icon: icon_03, link: "/services" },
    { name: "Portfolio", icon: icon_04, link: "/portfolio" },
    { name: "Contact", icon: icon_05, link: "/contact" },
    { name: "Extra", icon: icon_06, link: "/extra" },
  ];

  return (
       <div className={`sliderbar-container ${isMobile ? 'hidden' : 'visible'}`}>
      <PushNotifications notifications={notifications} /> 
      <div className={`sidebar ${open ? 'sidebar-open' : 'sidebar-closed'}`}>
        <FontAwesomeIcon
          icon={faChevronRight}
          className='toggle-arrow'
          onClick={() => setOpen(!open)}
        />
        <div className="brand-container">
          <div className="brand-logo">
            <img src={logo} alt="logo" className="logo-image" />
          </div>
        </div>
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="nav-item">
                <img src={item.icon} alt={`${item.name} icon`} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`content ${open ? 'content-collapsed' : ''}`}>
        <main className='main'>
          <div className='header'>
            <div className='user-info'>
              <FontAwesomeIcon icon={faBell} className="notification-icon" />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
            )}
              <div className='avatar'>
                <img src={avatarImage} alt="Avatar" className="avatar-image" />
                <div className='avatar-text'>
                  <span className="user-name">Elizabeth</span>
                  <span className="user-text">Operadora</span>
                </div>
              </div>
              <FontAwesomeIcon icon={faArrowDown} className='dropdown-arrow' />
            </div>
          </div>

          <div className="date-section">
            <div className="date-info">
              <p className='date-title'>Hoy</p>
              <p className='date'>22 de octubre del 2024</p>
            </div>
            <div className='actions'>
              <FontAwesomeIcon
                icon={faKeyboard}
                className='keyboard-icon'
                onClick={() => setCalculatorOpen(true)}
              />
              <CalculatorPopup isOpen={isCalculatorOpen} 
              onClose={() => setCalculatorOpen(false)} 
              addNotification={addNotification}
              />
            </div>
          </div>

          <div className='date-icons'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="search-icon"
              onClick={() => setSearchOpen(true)}
            />
            {isSearchOpen && (
              <div className="search-popup">
                <Search onClose={() => setSearchOpen(false)} onChange={handleSearchChange} />
              </div>
            )}

            <FontAwesomeIcon
              icon={faFilter}
              className='filter-icon'
              onClick={() => setFilterOpen(!isFilterOpen)}
            />
            {isFilterOpen && (
              <div className="filter-popup">
                <Filter onClose={() => setFilterOpen(false)} onFilterChange={handleFilterChange} />
              </div>
            )}

            <FontAwesomeIcon icon={faPrint} className='print-icon' />
          </div>

          <div className="table-section">
            <Table searchQuery={searchQuery} filterCriteria={filterCriteria} />
          </div>
        </main>
      </div>
      <PushNotifications notifications={notifications} onClose={handleNotificationClose} />
    </div>
  );
}

export default Sliderbar;
