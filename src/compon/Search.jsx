import React, { useState } from 'react';
import './Search.css';

function Search({ onClose, onChange }) {
    const [query, setQuery] = useState("");

    const handleSearchChange = (event) => {
        setQuery(event.target.value);
        onChange(event);
    };

    return (
        <div className="search-container">
            <input
                className='input'
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder=""
            />
            <button onClick={onClose}>Cerrar</button>
        </div>
    );
}

export default Search;

