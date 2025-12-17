"use client";

import styles from "./Pagination.module.css";

/**
 * Props del componente Pagination
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Componente de paginación
 * Muestra controles para navegar entre páginas
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  /**
   * Genera los números de página a mostrar
   */
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con elipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.info}>
        Mostrando {startItem}-{endItem} de {totalItems} remesas
      </div>
      <div className={styles.controls}>
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={styles.button}
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        <div className={styles.pageNumbers}>
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`${styles.pageButton} ${currentPage === pageNum ? styles.active : ""}`}
                aria-label={`Ir a página ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={styles.button}
          aria-label="Página siguiente"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

