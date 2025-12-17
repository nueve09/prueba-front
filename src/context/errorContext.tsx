"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

/**
 * Tipo para el contexto de errores
 */
interface ErrorContextType {
  error: string | null;
  setError: (error: string | null) => void;
}

/**
 * Contexto para manejo global de errores
 * Permite mostrar errores en cualquier parte de la aplicación
 */
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

/**
 * Provider del contexto de errores
 * @param children - Componentes hijos
 */
export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setErrorState] = useState<string | null>(null);

  /**
   * Función para establecer un error
   * @param error - Mensaje de error o null para limpiar
   */
  const setError = useCallback((error: string | null) => {
    setErrorState(error);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
}

/**
 * Hook para usar el contexto de errores
 * @returns Objeto con error y setError
 * @throws Error si se usa fuera del provider
 */
export function useError(): ErrorContextType {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
}

