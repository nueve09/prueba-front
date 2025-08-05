import { useState, useContext, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { RemesasContext } from '../../../shared/context/RemesasContext';
import './SearchModal.css';

const SearchModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const { handleSearch } = useContext(RemesasContext);

  useEffect(() => {
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="search-modal-overlay" onClick={handleOverlayClick}>
      <div className="search-modal">
        <div className="search-modal__header">
          <h3>Buscar Remesas</h3>
          <button className="search-modal__close" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>

        <form className="search-modal__form" onSubmit={handleSubmit}>
          <div className="search-modal__field">
            <label htmlFor="search-type">Buscar por:</label>
            <select 
              id="search-type"
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              className="search-modal__select"
            >
              <option value="all">ID, Compañía o Monto</option>
              <option value="id">Solo ID</option>
              <option value="company">Solo Compañía</option>
              <option value="amount">Solo Monto</option>
            </select>
          </div>

          <div className="search-modal__field">
            <label htmlFor="search-term">Término de búsqueda:</label>
            <input
              id="search-term"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ingrese el término a buscar..."
              className="search-modal__input"
              autoFocus
            />
          </div>

          <div className="search-modal__actions">
            <button type="button" onClick={onClose} className="btn btn--light">
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              <Icon name="search" />
              Buscar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchModal;
