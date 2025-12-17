"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faPrint, faBell, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import RemesasList from "@/src/components/RemesasList/RemesasList";
import Modal from "@/src/components/Modal/Modal";
import SearchBar from "@/src/components/SearchBar/SearchBar";
import type { Remesa } from "@/src/types/remesa";
import styles from "./History.module.css";

interface HistoryProps {
  remesas: Remesa[];
  onSearch: (query: string) => void;
}

export default function History({ remesas, onSearch }: HistoryProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  const handleSearch = (query: string) => {
    onSearch(query);
    // Opcional: cerrar el modal después de buscar
    // setIsSearchModalOpen(false);
  };

  return (
    <>
      <div className={styles.history}>
        {/* Top Bar */}
        <div className={styles.topBar}>
        <div className={styles.topActions}>
            <button className={styles.notificationButton} aria-label="Notificaciones">
              <FontAwesomeIcon icon={faBell} />
            </button>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>JD</div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>Juan Díaz</div>
              <div className={styles.userRole}>Operador</div>
            </div>
            <div>
              <FontAwesomeIcon icon={faAngleDown} />
              </div>
          </div>
        </div>

        {/* Date Section */}
        <div className={styles.dateSection}>
          <span className={styles.todayLabel}>Hoy</span>
          <span className={styles.dateText}>{formattedDate}</span>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button 
            className={styles.actionButton} 
            aria-label="Buscar"
            onClick={handleSearchClick}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className={styles.actionButton} aria-label="Filtrar">
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <button className={styles.actionButton} aria-label="Imprimir">
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>

        {/* Transactions List */}
        <div className={styles.transactionsList}>
          <RemesasList
            remesas={remesas}
            emptyMessage="No hay transacciones para mostrar"
          />
        </div>
      </div>

      {/* Search Modal */}
      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        title="Buscar Remesas"
      >
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Buscar por ID, compañía o monto..."
        />
      </Modal>
    </>
  );
}

