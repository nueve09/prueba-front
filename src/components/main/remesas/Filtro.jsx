// Bibliotecas
import React from 'react';


// Componente Filtro
export const Filtro = ({ isInputVisible, currentFilter, filterOptions, tempSearchQuery, handleSearch }) => {

  return (

    isInputVisible && (
      <div className="relative flex flex-col flex-grow">

        <label className="absolute left-2 -top-3 text-sm text-dark-blue-800 bg-white-50 px-4 py-0 origin-left rounded-sm font-extrabold md:text-base xl:text-lg">
          {filterOptions[currentFilter]}
        </label>

        <input type="text" placeholder="Buscar..." autoComplete='off' value={tempSearchQuery} onChange={(e) => handleSearch(e.target.value)} className="rounded-md flex items-center justify-center border-2 border-dark-blue-200 bg-white-50 px-4 h-8 flex-grow text-xs outline-none sm:h-9 md:h-10 lg:h-11 md:text-base xl:text-lg" />

      </div>
    )
  );

};
