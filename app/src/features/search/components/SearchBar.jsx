import { useState, useContext } from 'react';
import Icon from '../../../components/ui/Icon';
import { RemesasContext } from '../../../shared/context/RemesasContext';
import './SearchBar.css';

const SearchBar = () => {
  const [localSearch, setLocalSearch] = useState('');
  const { handleSearch, searchTerm } = useContext(RemesasContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(localSearch);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    
    // Búsqueda en tiempo real con debounce
    if (value === '') {
      handleSearch('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__input-group">
        <Icon name="search" className="search-bar__icon" />
        <input
          type="text"
          className="search-bar__input"
          placeholder="Buscar por ID, compañía o monto..."
          value={localSearch}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {localSearch && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => {
              setLocalSearch('');
              handleSearch('');
            }}
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
