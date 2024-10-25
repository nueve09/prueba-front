// Bibliotecas
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Componentes
import { EncabezadoTabla } from '@components/main/remesas/EncabezadoTabla';
import { FilaTabla } from '@components/main/remesas/FilaTabla';


// Componente TablaRemesas
export const TablaRemesas = ({ searchQuery, currentFilter }) => {

  // Hooks
  const [limit, setLimit] = useState(8);

  // Recupero las remesas del estado global
  const remesas = useSelector((state) => state.remesas.remesas);

  // Se ordenan las remesas por fecha de pago
  const remesasCobradas = remesas.filter(remesa => remesa.status === 'COBRADO');
  remesasCobradas.sort((a, b) => b.charged_at.localeCompare(a.charged_at));

  // Filtros de la tabla de remesas
  const filtrarRemesas = remesasCobradas.filter(remesa => {
    const inputFiltro = searchQuery.toLowerCase();
    switch (currentFilter) {
      case "id": return remesa.id.toString().includes(inputFiltro);
      case "company": return remesa.company.toLowerCase().includes(inputFiltro);
      case "amount": return remesa.amount.toString().includes(inputFiltro);
      default: return true;
    }
  });

  // Efecto que identifica cuando se agrega una nueva remesa para mostrarla en la tabla
  useEffect(() => {
    if (filtrarRemesas.length > limit && limit < filtrarRemesas.length) {
      setLimit(prevLimit => prevLimit + 1);
    }
  }, [filtrarRemesas.length]);

  const limiteRemesas = filtrarRemesas.slice(0, limit);

  return (

    <table className="contenedor_tabla_remesas">

      {/* Encabezados de la tabla */}
      <thead>
        <tr className="encabezado_tabla_remesas">
          <EncabezadoTabla title="ID" />
          <EncabezadoTabla title="Company" />
          <EncabezadoTabla title="Amount" />
        </tr>
      </thead>

      {/* Contenido de la tabla */}
      <tbody>
        {
          Array.isArray(limiteRemesas) && limiteRemesas.length > 0
            ? limiteRemesas.map((i) => (
              <tr key={i.id} className="fila_tabla_remesas">
                <FilaTabla title={i.id} character="#" />
                <FilaTabla title={i.company} character=" " />
                <FilaTabla title={i.amount.toLocaleString()} character="$" />
              </tr>
            ))
            : <tr><FilaTabla title="No hay datos disponibles." character={null} /></tr>
        }
      </tbody>

    </table>

  );
};

