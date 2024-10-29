import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import './Filter.css'; 

function Filter({ onClose, onFilterChange }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onFilterChange(value); 
    };

    return (
        <div className="filter-container">
            <div className="filter-header">
                <h3>Filtrar</h3>
                <button onClick={onClose}>Cerrar</button>
            </div>
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">Seleccione un criterio</option>
                <option value="COBRADO">Cobrado</option>
                <option value="NO COBRADO">No Cobrado</option>
                {/* Agrega más opciones según sea necesario */}
            </select>
        </div>
    );
}

export default Filter;
