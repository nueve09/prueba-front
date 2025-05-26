import React from 'react';
import './menu.css';
import logo from '../../assets/Logo_examen.png';

const menuItems = [
  {icon: 'house', label: 'Inicio'},
  {icon: 'graph-up-arrow', label: 'Balance'},
  {icon: 'credit-card', label: 'Credito'},
  {icon: 'file-spreadsheet', label: 'Calculadora'},
  {icon: 'cash-coin', label: 'Saldos'},
  {icon: 'clipboard-data', label: 'Gráficas'},
]

const Menu = () => {
  return (
    <nav className="d-flex flex-column text-light vh-100 p-3">
      <div className="mb-4 text-center border-bottom border-secondary pb-3">
        <img
          src={logo} 
          alt="Logo"
          className="img-fluid logo-img"
        />
      </div>

      <ul className="nav flex-column menu-custom">
        {menuItems.map(({ icon, label }) => (
          <li key={label} className="nav-item">
            <a
              href="#"
              className="nav-link d-flex align-items-center justify-content-center"
              style={{ cursor: 'pointer' }}
            >
              <i className={`bi bi-${icon} me-2 menu-item-custom`} alt={{label}}></i>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;