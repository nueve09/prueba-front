"use client";

import { ErrorProvider } from "@/src/context/errorContext";
import ErrorMessage from "@/src/components/ErrorMessage/ErrorMessage";
import SideNav from "@/src/components/SideNav/SideNav";
import Calculator from "@/src/components/Calculator/Calculator";
import History from "@/src/components/History/History";
import { useRemesas } from "@/src/hooks/useRemesas";
import styles from "./page.module.css";

function RemesasPage() {
  const {
    remesas,
    totalPages,
    currentPage,
    totalItems,
    search,
    goToPage,
    nextPage,
    prevPage,
  } = useRemesas();

  return (
    <div className={styles.container}>
      <SideNav />
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Panel Izquierdo: Remesas */}
          <section className={styles.remesasPanel}>
            <div className={styles.header}>
              <div className={styles.subtitle}>Ventanilla <b>Digital</b></div>
              <hr />
              <h4 className={styles.title}>Remesas</h4>
            </div>
            <Calculator />
          </section>

          <section className={styles.historyPanel}>
            <History remesas={remesas} onSearch={search} />
          </section>
        </div>
      </main>
    </div>
  );
}

/**
 * Componente wrapper con ErrorProvider
 */
export default function Home() {
  return (
    <ErrorProvider>
      <ErrorMessage />
      <RemesasPage />
    </ErrorProvider>
  );
}

