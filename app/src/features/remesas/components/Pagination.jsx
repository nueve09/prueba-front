import { useContext } from 'react';
import Icon from '../../../components/ui/Icon';
import { RemesasContext } from '../../../shared/context/RemesasContext';
import { PAGINATION } from '../../../shared/constants';
import './Pagination.css';

const Pagination = () => {
  const { currentPage, handlePageChange, getTotalPages, filteredRemesas } = useContext(RemesasContext);
  
  const totalPages = getTotalPages();
  const startItem = (currentPage - 1) * PAGINATION.ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * PAGINATION.ITEMS_PER_PAGE, filteredRemesas.length);

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination__info">
        Mostrando {startItem}-{endItem} de {filteredRemesas.length} remesas
      </div>
      
      <div className="pagination__controls">
        <button
          className="pagination__btn pagination__btn--prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon name="chevron-left" />
          Anterior
        </button>
        
        <div className="pagination__numbers">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={index} className="pagination__ellipsis">...</span>
            ) : (
              <button
                key={page}
                className={`pagination__number ${currentPage === page ? 'pagination__number--active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <button
          className="pagination__btn pagination__btn--next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
          <Icon name="chevron-right" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
