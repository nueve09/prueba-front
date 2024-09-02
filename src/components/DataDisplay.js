import React, { useState } from 'react';
import './DataDisplay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { remesas } from '../data';

const DataDisplay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredRemesas = remesas.filter(remesa =>
    remesa.id.includes(searchTerm) ||
    remesa.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    remesa.amount.toString().includes(searchTerm)
  );

  const paginatedRemesas = filteredRemesas
    .filter(remesa => remesa.status === 'COBRADO')
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredRemesas.length / itemsPerPage);

  return (
    <div className="remesas-container">
      <div className="remesas-header">
        <div className="profile">
          <div className="profile-picture">
            <img src="https://via.placeholder.com/50" alt="User Profile" />
          </div>
          <div className="profile-info">
            <h3>Nombre de Usuario</h3>
          </div>
          <FontAwesomeIcon icon={faBell} className="notification-icon" />
        </div>
      </div>
      <button className="search-button" onClick={handleSearchToggle}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {searchVisible && (
          <input 
            type="text" 
            className="search-input"
            placeholder="Buscar por ID, compañía o monto" 
            value={searchTerm}
            onChange={handleSearch}
          />
        )}
      <div className="remesas-list">
        

        {paginatedRemesas.map(remesa => (
          <div key={remesa.id} className="remesa-item">
            <span className="remesa-id">#{remesa.id}</span>
            <span className="remesa-company">{remesa.company}</span>
            <span className="remesa-amount">${remesa.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
