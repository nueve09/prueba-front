// Bibliotecas
import React from 'react';


// Componente Filtro
export const Filtro = ({ isInputVisible, currentFilter, filterOptions, tempSearchQuery, handleSearch }) => {

  return (

    isInputVisible && (

      <div className="contenedor_filtro">

        <label className="texto_filtro"> {filterOptions[currentFilter]} </label>

        <input type="text" placeholder="Buscar..." autoComplete="off" value={tempSearchQuery} onChange={(e) => handleSearch(e.target.value)} className="input_filtro" />

      </div>

    )

  );
};
