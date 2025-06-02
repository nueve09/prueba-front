import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faCreditCard,
  faFileInvoiceDollar,
  faMoneyBillWave,
  faMoneyBillTrendUp,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import './menu.css';
import logo from '../../assets/logo.svg';

const menuItems = [
  { icon: 'fa-house', label: 'Inicio' },
  { icon: 'fa-money-bill-trend-up', label: 'Balance' },
  { icon: 'fa-credit-card', label: 'Crédito' },
  { icon: 'fa-file-invoice-dollar', label: 'Calculadora' },
  { icon: 'fa-money-bill-wave', label: 'Saldos' },
  { icon: 'fa-chart-simple', label: 'Gráficas' },
];

const iconMap = {
  'fa-house': faHouse,
  'fa-money-bill-trend-up': faMoneyBillTrendUp,
  'fa-credit-card': faCreditCard,
  'fa-file-invoice-dollar': faFileInvoiceDollar,
  'fa-money-bill-wave': faMoneyBillWave,
  'fa-chart-simple': faChartSimple,
};

const Menu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className={`menu-container ${collapsed ? 'collapsed' : ''}`}>
      <button className="menu-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '>' : '<'}
      </button>
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="logo-img" />  
      </div>

      <ul className="menu-items">
       {menuItems.map(({ icon, label }) => (
          <li key={label} className="menu-item">
            <a href="#" className="menu-link">
              <FontAwesomeIcon icon={iconMap[icon]} className="menu-icon" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;