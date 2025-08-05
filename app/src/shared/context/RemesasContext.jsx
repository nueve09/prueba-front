import { createContext, useState, useEffect } from 'react';
import { initialRemesas, searchRemesas } from '../../data/remesas';
import { REMESA_STATUS, PAGINATION } from '../constants';

// eslint-disable-next-line react-refresh/only-export-components
export const RemesasContext = createContext();

export const RemesasProvider = ({ children }) => {
  const [remesas, setRemesas] = useState(initialRemesas);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [filteredRemesas, setFilteredRemesas] = useState([]);
  const [displayedRemesas, setDisplayedRemesas] = useState([]);

  // Actualizar remesas filtradas cuando cambie el término de búsqueda o las remesas
  useEffect(() => {
    const searched = searchRemesas(remesas, searchTerm);
    // Mostrar TODAS las remesas, no solo las cobradas
    // Ordenar por charged_at (las cobradas primero, luego por created_at)
    const sorted = searched.sort((a, b) => {
      // Si ambas están cobradas, ordenar por charged_at
      if (a.status === REMESA_STATUS.COBRADO && b.status === REMESA_STATUS.COBRADO) {
        return a.charged_at.localeCompare(b.charged_at);
      }
      // Si solo una está cobrada, la cobrada va primero
      if (a.status === REMESA_STATUS.COBRADO && b.status === REMESA_STATUS.NO_COBRADO) {
        return -1;
      }
      if (a.status === REMESA_STATUS.NO_COBRADO && b.status === REMESA_STATUS.COBRADO) {
        return 1;
      }
      // Si ambas no están cobradas, ordenar por created_at
      return a.created_at.localeCompare(b.created_at);
    });
    
    setFilteredRemesas(sorted);
    setCurrentPage(PAGINATION.DEFAULT_PAGE); // Reset página al buscar
  }, [remesas, searchTerm]);

  // Actualizar remesas mostradas cuando cambie la página o las filtradas
  useEffect(() => {
    const startIndex = (currentPage - 1) * PAGINATION.ITEMS_PER_PAGE;
    const endIndex = startIndex + PAGINATION.ITEMS_PER_PAGE;
    setDisplayedRemesas(filteredRemesas.slice(startIndex, endIndex));
  }, [filteredRemesas, currentPage]);

  const processRemesa = (id) => {
    // Buscar si la remesa existe
    const existingRemesa = remesas.find(remesa => remesa.id === id);
    
    if (!existingRemesa) {
      return {
        success: false,
        error: 'ID de remesa no encontrado'
      };
    }

    if (existingRemesa.status === REMESA_STATUS.COBRADO) {
      return {
        success: false,
        error: 'Esta remesa ya ha sido cobrada'
      };
    }

    // Procesar el cobro
    const today = new Date();
    const chargedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    
    setRemesas(prevRemesas => 
      prevRemesas.map(remesa => 
        remesa.id === id 
          ? { 
              ...remesa, 
              status: REMESA_STATUS.COBRADO, 
              charged_at: chargedDate 
            }
          : remesa
      )
    );

    return {
      success: true,
      message: 'Remesa procesada exitosamente'
    };
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getTotalPages = () => {
    return Math.ceil(filteredRemesas.length / PAGINATION.ITEMS_PER_PAGE);
  };

  const value = {
    remesas,
    displayedRemesas,
    filteredRemesas,
    searchTerm,
    currentPage,
    processRemesa,
    handleSearch,
    handlePageChange,
    getTotalPages
  };

  return (
    <RemesasContext.Provider value={value}>
      {children}
    </RemesasContext.Provider>
  );
};
