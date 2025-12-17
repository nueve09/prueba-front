"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { Remesa } from "@/src/types/remesa";
import { remesasData } from "@/src/data/remesasData";
import { filterChargedRemesas, sortByChargedAtDesc } from "@/src/utils/formatters";
import { findRemesaById, isRemesaCharged } from "@/src/utils/validators";
import { getCurrentDateYYYYMMDD } from "@/src/utils/formatters";

/**
 * Hook personalizado para manejar remesas
 * Gestiona el estado, búsqueda, paginación y cobro de remesas
 */
export function useRemesas() {
  const [remesas, setRemesas] = useState<Remesa[]>(remesasData);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  
  // Ref para mantener referencia al estado más reciente
  const remesasRef = useRef(remesas);
  useEffect(() => {
    remesasRef.current = remesas;
  }, [remesas]);

  /**
   * Filtra remesas por búsqueda
   * Busca por id, company o amount
   */
  const filteredRemesas = useMemo(() => {
    if (!searchQuery.trim()) {
      return remesas;
    }

    const query = searchQuery.toLowerCase().trim();
    return remesas.filter((remesa) => {
      const idMatch = remesa.id.toLowerCase().includes(query);
      const companyMatch = remesa.company.toLowerCase().includes(query);
      const amountMatch = remesa.amount.toString().includes(query);
      return idMatch || companyMatch || amountMatch;
    });
  }, [remesas, searchQuery]);

  /**
   * Obtiene solo las remesas cobradas y las ordena por charged_at DESC
   */
  const chargedRemesas = useMemo(() => {
    const charged = filterChargedRemesas(filteredRemesas);
    return sortByChargedAtDesc(charged);
  }, [filteredRemesas]);

  /**
   * Calcula el total de páginas
   */
  const totalPages = useMemo(() => {
    return Math.ceil(chargedRemesas.length / itemsPerPage);
  }, [chargedRemesas.length]);

  /**
   * Obtiene las remesas de la página actual
   */
  const paginatedRemesas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return chargedRemesas.slice(startIndex, endIndex);
  }, [chargedRemesas, currentPage]);

  /**
   * Función para buscar remesas
   * @param query - Texto de búsqueda
   */
  const search = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset a la primera página al buscar
  }, []);

  /**
   * Función para cambiar de página
   * @param page - Número de página
   */
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  /**
   * Función para ir a la página siguiente
   */
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  /**
   * Función para ir a la página anterior
   */
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  /**
   * Función para cobrar una remesa
   * Cambia el status de NO_COBRADO a COBRADO y actualiza charged_at
   * @param id - ID de la remesa a cobrar
   * @returns true si se cobró exitosamente, false si hubo error
   */
  const chargeRemesa = useCallback((id: string): boolean => {
    // Validar usando el estado actual más reciente
    const currentRemesas = remesasRef.current;
    const remesa = findRemesaById(id, currentRemesas);
    
    // Validar que la remesa exista
    if (!remesa) {
      return false; // No encontrada
    }

    // Validar que el status sea NO_COBRADO
    if (remesa.status === "COBRADO") {
      return false; // Ya está cobrada
    }

    // Actualizar la remesa: cambiar status a COBRADO y agregar fecha de cobro
    const currentDate = getCurrentDateYYYYMMDD();
    
    // Actualizar el estado de las remesas
    setRemesas((prevRemesas) => {
      const updatedRemesas = prevRemesas.map((r) =>
        r.id === id && r.status === "NO_COBRADO"
          ? {
              ...r,
              status: "COBRADO" as const,
              charged_at: currentDate,
            }
          : r
      );
      
      // Actualizar también el ref para mantener sincronizado
      remesasRef.current = updatedRemesas;
      
      return updatedRemesas;
    });
    
    // Resetear búsqueda y página para mostrar todas las remesas cobradas actualizadas
    // En React 18, estos setState se ejecutarán en el mismo batch
    setSearchQuery("");
    setCurrentPage(1);
    
    return true;
  }, []);

  return {
    remesas: paginatedRemesas,
    allRemesas: remesas, // Todas las remesas para validaciones (se actualiza automáticamente)
    totalPages,
    currentPage,
    totalItems: chargedRemesas.length,
    search,
    searchQuery,
    goToPage,
    nextPage,
    prevPage,
    chargeRemesa,
  };
}

