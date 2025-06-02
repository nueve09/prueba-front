import React, { useState, useMemo } from 'react';
import './tableInformation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faUser, faBell, faPrint, faFilter, faMagnifyingGlass, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const TableInformation = ({remittances}) => {
  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const now = new Date();
  const currentDate = `${now.getDate()} de ${monthNames[now.getMonth()]} del ${now.getFullYear()}`;

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const itemsPerPage = 10;

  const filterData = remittances.filter(row => {
    const search = searchText.toLowerCase();
    return( 
      row.id.includes(search) ||
      row.company.toLowerCase().includes(search.toLowerCase()) ||
      row.amount.toString().includes(search));
  });

  const filteredAndSorted = useMemo(() => {
    return [...filterData]
      .filter((item) => item.status === "COBRADO")
      .sort((a, b) => b.charged_at.localeCompare(a.charged_at));
  }, [filterData]);

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredAndSorted]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <div className="top-bar">
        <div className="notification-user">
          <div className="notification">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="user-toggle" onClick={toggleUserMenu}>
            <FontAwesomeIcon icon={faUser} />
            <div className="user-position">
              <p className="name">Elizabeth</p>
              <p className="position">Operador</p>
            </div>
            <FontAwesomeIcon icon={faChevronDown} style={{fontSize: "10px"}}/>
          </div>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="dropdown-item"><i className="fa-solid fa-user"></i> Perfil</div>
              <div className="dropdown-item"><i className="fa-solid fa-gear"></i> Configuración</div>
              <div className="dropdown-item text-danger" onClick={() => alert("Sesión cerrada")}>
                <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="date-bar">
        <div className="date-info">
          <p className="day">Hoy</p>
          <p className="current-date">{currentDate}</p>
        </div>
        <button className="keyboard-button">
          <FontAwesomeIcon icon={faKeyboard} />
        </button>
      </div>

      <div className="filter-bar">
        {showSearch && (
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por ID, compañía o monto"
            value={searchText}
            onChange={(e) =>{ setSearchText(e.target.value); setCurrentPage(1);}}
          />
        )}
        <div className="filter-buttons">
          <button onClick={() => setShowSearch(!showSearch)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          <button><FontAwesomeIcon icon={faFilter} /></button>
          <button><FontAwesomeIcon icon={faPrint} /></button>
        </div>
      </div>

      <table className="custom-table">
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-results">
                No se encontraron resultados
              </td>
            </tr>
          ) : (
            currentData.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.company}</td>
                <td>{row.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
    </div>
  );
};

export default TableInformation;