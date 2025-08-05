import { useState, useContext, useEffect, useRef } from 'react';
import Icon from '../../../components/ui/Icon';
import { RemesasContext } from '../../../shared/context/RemesasContext';
import './SearchInput.css';

const SearchInput = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { handleSearch } = useContext(RemesasContext);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus en el input cuando se abre
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
    // No cerrar automáticamente para que el usuario vea los resultados
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Si el input está vacío, limpiar la búsqueda automáticamente
    if (value.trim() === '') {
      handleSearch('');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    handleSearch(''); // Limpiar búsqueda
    onClose();
  };

  return (
    <div className="search-input-container">
      <form className="search-input-form" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <Icon name="search" className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Buscar por ID, compañía o monto..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="search-input-close"
            onClick={handleClear}
            title="Cerrar búsqueda"
          >
            <Icon name="x" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
