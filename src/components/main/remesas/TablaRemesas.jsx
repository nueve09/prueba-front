// Bibliotecas
import React from 'react';
import { useSelector } from 'react-redux';
// Componentes
import { EncabezadoTabla } from '@components/main/remesas/EncabezadoTabla';
import { FilaTabla } from '@components/main/remesas/FilaTabla';


// Componente TablaRemesas
export const TablaRemesas = ({ searchQuery, currentFilter }) => {

  // Recupero las remesas del estado global
  const remesas = useSelector((state) => state.remesas.remesas);

  // Se ordenan las remesas por fecha de pago
  const remesasCobradas = remesas.filter(remesa => remesa.status === 'COBRADO');
  remesasCobradas.sort((a, b) => a.charged_at.localeCompare(b.charged_at));

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

  // Solo se mostrara el top 10
  const limiteRemesas = filtrarRemesas.slice(0, 10);

  return (

    <table className="w-full mx-auto table-auto border-collapse text-center">

      {/* Encabezados de la tabla */}
      <thead>
        <tr className={`border-b-2 border-mercury-100 font-extrabold text-tuatara-900 text-sm sm:text-base md:text-lg 2xl:text-xl`}>
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
              <tr key={i.id} className={`border-b-2 border-mercury-100 text-xs text-tuatara-900 sm:text-sm xl:text-base `}>
                <FilaTabla title={i.id} character="#" />
                <FilaTabla title={i.company} character=" " />
                <FilaTabla title={i.amount.toLocaleString()} character="$" />
              </tr>
            ))
            : <tr><FilaTabla title="No results found" character={null} /></tr>
        }
      </tbody>

    </table>

  );
};
