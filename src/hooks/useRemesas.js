import { useMemo, useState } from 'react'
import { remesas as initialRemesas } from '../utils/remesas'

const PAGE_SIZE = 10

const getTodayCompact = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

export const useRemesas = () => {
  const [remesas, setRemesas] = useState(initialRemesas);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // README: mostrar primeros 10 por charged_at que hayan sido cobradas (COBRADO), ordenadas descendente
    return remesas
      .filter((remesa) => remesa.status === 'COBRADO')
      // README: búsqueda por id, company o monto
      .filter((remesa) => {
        if (!query) return true
        return (
          remesa.id.toLowerCase().includes(query) ||
          remesa.company.toLowerCase().includes(query) ||
          remesa.amount.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => Number(b.charged_at) - Number(a.charged_at));
  }, [remesas, searchQuery]);

  // README: paginación de las remesas
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const onSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const setCobrado = (id) => {
    // README: calculadora funcional - validar datos de entrada
    if (!id.length){
      setError('El id no puede ser vacio');
      return;
    }

    const remesa = remesas.find((remesa) => remesa.id === id);

    if (!remesa) {
      setError(`No existe una remesa con el id: ${id}`);
      return;
    }

    // README: validar que el id de la remesa no haya sido cobrada; si no, actualizar a COBRADO,
    // agregar la fecha en que se cobró y mostrarla en el listado
    if (remesa.status === 'COBRADO') {
      setError(`La remesa con el id: ${id} ya está cobrada`);
      return;
    }

    setRemesas((current) =>
      current.map((remesa) =>
        remesa.id === id && remesa.status !== 'COBRADO'
          ? { ...remesa, status: 'COBRADO', charged_at: getTodayCompact() }
          : remesa
      )
    );
  };

  const clearError = () => setError(null);

  return {
    items,
    searchQuery,
    onSearchChange,
    page: currentPage,
    totalPages,
    onPageChange: setPage,
    setCobrado,
    error,
    clearError,
  };
}
