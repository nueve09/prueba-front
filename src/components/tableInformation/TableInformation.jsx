import React, { useState, useMemo } from 'react';
import './tableInformation.css';

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
    <div className="table-container p-4">
      
      <div className="d-flex justify-content-between align-items-start mb-3">
        
        <div className='space-between'>
          <p className="day">Hoy</p>
          <p className="current-date">{currentDate}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <i className="bi bi-bell-fill fs-5 text-primary"></i>
          <div className="position-relative">
            <div
              className="user-toggle d-flex align-items-center justify-content-center"
              onClick={toggleUserMenu}
            >
              <span className="me-1"><i class="bi bi-person-circle"></i></span>
              <i className="bi bi-chevron-down"></i>
            </div>

            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-item"><i class="bi bi-person"></i> Perfil</div>
                <div className="dropdown-item"><i class="bi bi-gear-wide"></i> Configuración</div>
                <div className="dropdown-item text-danger" onClick={() => alert("Sesión cerrada")}>
                  <i class="bi bi-box-arrow-left"></i> Cerrar sesión
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center mb-3 flex-wrap filter-bar w-100">
        <div className="flex-grow-1 me-2"> 
          {showSearch ? (
            <input
              type="text"
              className="form-control w-100"
              placeholder="Buscar por ID, compañía o monto"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          ) : (
            <div style={{ height: '38px' }}></div>
          )}
        </div>

        <div className="d-flex gap-2 filter-buttons">
          <button className="btn btn-filter" onClick={() => setShowSearch(!showSearch)}>
            <i className="bi bi-search"></i>
          </button>
          <button className="btn btn-filter">
            <i className="bi bi-filter"></i>
          </button>
          <button className="btn btn-filter">
            <i className="bi bi-printer"></i>
          </button>
        </div>
      </div>

      <table className="table custom-table">
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">
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

      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-sm btn-outline-primary" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span className="text-muted small">Página {currentPage} de {totalPages}</span>
        <button className="btn btn-sm btn-outline-primary" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TableInformation;