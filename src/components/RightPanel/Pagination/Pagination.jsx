import './Pagination.css'

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Anterior
      </button>
      <span className="pagination-info">
        Página {page} de {totalPages}
      </span>
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente
      </button>
    </div>
  )
}

export default Pagination
