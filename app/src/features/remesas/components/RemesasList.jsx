import { useContext } from 'react';
import { RemesasContext } from '../../../shared/context/RemesasContext';
import RemesaItem from './RemesaItem';
import Pagination from './Pagination';
import './RemesasList.css';

const RemesasList = () => {
  const { displayedRemesas, filteredRemesas, searchTerm } = useContext(RemesasContext);

  if (filteredRemesas.length === 0) {
    return (
      <div className="remesas-list">
        <div className="remesas-list__empty">
          <h3>No se encontraron remesas</h3>
          <p>
            {searchTerm 
              ? `No hay resultados para "${searchTerm}"`
              : 'No hay remesas disponibles'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="remesas-list">
      <div className="remesas-list__header">
        <h2>Lista de Remesas</h2>
        <span className="remesas-count">
          {filteredRemesas.length} remesa{filteredRemesas.length !== 1 ? 's' : ''} encontrada{filteredRemesas.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="remesas-table">
        <div className="remesas-table__header">
          <div className="table-header__cell table-header__cell--id">ID</div>
          <div className="table-header__cell table-header__cell--company">Compañía</div>
          <div className="table-header__cell table-header__cell--amount">Monto</div>
          <div className="table-header__cell table-header__cell--status">Estado</div>
        </div>

        <div className="remesas-table__body">
          {displayedRemesas.map((remesa) => (
            <RemesaItem key={remesa.id} remesa={remesa} />
          ))}
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default RemesasList;
