import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorContext } from './ErrorProvider';
import './EnhancedTable.css';

const initialRows = [
  { id: 12345678, company: 'Western Union', amount: 1000, status: 'COBRADO', created_at: '2024-10-01', charged_at: '2024-10-10' },
  { id: 23456789, company: 'Western Union', amount: 2000, status: 'NO COBRADO', created_at: '2024-10-05', charged_at: '' },
  { id: 34567890, company: 'Western Union', amount: 1500, status: 'COBRADO', created_at: '2024-10-07', charged_at: '2024-10-12' },
  { id: 45678901, company: 'Western Union', amount: 1200, status: 'COBRADO', created_at: '2024-10-09', charged_at: '2024-10-15' },
  { id: 56789012, company: 'Western Union', amount: 800, status: 'NO COBRADO', created_at: '2024-10-11', charged_at: '' },
  { id: 67890123, company: 'PayPal', amount: 2000, status: 'COBRADO', created_at: '2024-10-13', charged_at: '2024-10-18' },
  { id: 78901234, company: 'PayPal', amount: 3000, status: 'COBRADO', created_at: '2024-10-14', charged_at: '2024-10-20' },
  { id: 89012345, company: 'PayPal', amount: 500, status: 'COBRADO', created_at: '2024-10-15', charged_at: '2024-10-22' },
  { id: 90123456, company: 'PayPal', amount: 900, status: 'NO COBRADO', created_at: '2024-10-17', charged_at: '' },
  { id: 11223344, company: 'Western Union', amount: 1500, status: 'COBRADO', created_at: '2024-10-20', charged_at: '2024-10-25' },
  { id: 22334455, company: 'Western Union', amount: 700, status: 'COBRADO', created_at: '2024-10-22', charged_at: '2024-10-27' },
  { id: 33445566, company: 'Western Union', amount: 1300, status: 'NO COBRADO', created_at: '2024-10-24', charged_at: '' },
];

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'company', label: 'Company' },
  { id: 'amount', label: 'Amount' },
];

function EnhancedTable({ searchQuery, filterCriteria }) {
  const [rows] = useState(initialRows);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('charged_at');


    const handleValidation = (id) => {
      const isValidId = /^\d{8}$/.test(id); 
      if (!isValidId) {
        showError('El ID debe tener 8 dígitos numéricos.');
        return false;
      }
      return true;
    };



  const filteredRows = rows
    .filter((row) => {
      const matchesSearch = 
        row.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
        row.id.toString().includes(searchQuery);
      const matchesFilter = filterCriteria ? row.status === filterCriteria : true; 
      return matchesSearch && matchesFilter && row.status === 'COBRADO'; // Solo remesas cobradas
    })
    .sort((a, b) => {
      const dateA = new Date(a.charged_at);
      const dateB = new Date(b.charged_at);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    })
    .slice(0, 10); // Limitar a las primeras 10 remesas cobradas

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headCells.map((headCell) => (
              <th key={headCell.id} onClick={(event) => handleRequestSort(event, headCell.id)}>
                {headCell.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.id}</td>
                <td className="table-cell">{row.company}</td>
                <td className="table-cell">{row.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headCells.length} className="no-data">No se encontraron resultados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

EnhancedTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  filterCriteria: PropTypes.string, 
};

export default EnhancedTable;
