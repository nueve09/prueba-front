import { useContext, useEffect } from 'react';
import Icon from '../../../components/ui/Icon';
import { RemesasContext } from '../../../shared/context/RemesasContext';
import './PrintModal.css';

const PrintModal = ({ onClose }) => {
  const { filteredRemesas } = useContext(RemesasContext);

  useEffect(() => {
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const downloadCSV = () => {
    const headers = ['ID', 'Compañía', 'Monto', 'Estado', 'Fecha Creación', 'Fecha Cobro'];
    const csvContent = [
      headers.join(','),
      ...filteredRemesas.map(remesa => [
        remesa.id,
        `"${remesa.company}"`,
        remesa.amount,
        remesa.status,
        remesa.created_at,
        remesa.charged_at || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `remesas_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onClose();
  };

  const printReport = () => {
    const today = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reporte de Remesas</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .date { color: #666; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .status-cobrado { color: #4caf50; font-weight: bold; }
            .status-no-cobrado { color: #ff9800; font-weight: bold; }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Reporte de Remesas</h1>
            <div class="date">Generado el: ${today}</div>
            <div>Total de remesas: ${filteredRemesas.length}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Compañía</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Fecha Creación</th>
                <th>Fecha Cobro</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRemesas.map(remesa => `
                <tr>
                  <td>#${remesa.id}</td>
                  <td>${remesa.company}</td>
                  <td>$${parseFloat(remesa.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                  <td class="status-${remesa.status.toLowerCase().replace('_', '-')}">${remesa.status === 'COBRADO' ? 'Cobrado' : 'No Cobrado'}</td>
                  <td>${remesa.created_at}</td>
                  <td>${remesa.charged_at || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    
    onClose();
  };

  return (
    <div className="print-modal-overlay" onClick={handleOverlayClick}>
      <div className="print-modal">
        <div className="print-modal__header">
          <h3>Imprimir Reporte</h3>
          <button className="print-modal__close" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>

        <div className="print-modal__content">
          <p>Seleccione el formato para el reporte de remesas:</p>
          <div className="print-modal__info">
            <Icon name="info-circle" />
            <span>Se incluirán {filteredRemesas.length} remesas en el reporte</span>
          </div>
        </div>

        <div className="print-modal__actions">
          <button onClick={onClose} className="btn btn--light">
            Cancelar
          </button>
          <button onClick={downloadCSV} className="btn btn--secondary">
            <Icon name="download" />
            Descargar CSV
          </button>
          <button onClick={printReport} className="btn btn--primary">
            <Icon name="printer" />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
