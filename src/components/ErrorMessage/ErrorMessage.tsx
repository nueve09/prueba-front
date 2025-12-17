"use client";

import { useEffect } from "react";
import { useError } from "@/src/context/errorContext";
import styles from "./ErrorMessage.module.css";

/**
 * Componente global para mostrar errores
 * Se muestra arriba de la app y se autodesaparece después de 5 segundos
 */
export default function ErrorMessage() {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // Auto-desaparece después de 5 segundos

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div className={styles.errorContainer} role="alert">
      <div className={styles.errorContent}>
        <span className={styles.errorIcon}>⚠️</span>
        <span className={styles.errorMessage}>{error}</span>
        <button
          className={styles.closeButton}
          onClick={() => setError(null)}
          aria-label="Cerrar error"
        >
          ×
        </button>
      </div>
    </div>
  );
}

