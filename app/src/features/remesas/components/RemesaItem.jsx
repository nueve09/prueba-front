import { REMESA_STATUS } from '../../../shared/constants';
import './RemesaItem.css';

const RemesaItem = ({ remesa }) => {
  const formatAmount = (amount) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(numAmount);
  };

  const formatId = (id) => {
    return `#${id}`;
  };

  const getStatusDisplay = (status) => {
    return status === REMESA_STATUS.COBRADO ? 'Cobrado' : 'No Cobrado';
  };

  const getStatusClass = (status) => {
    return status === REMESA_STATUS.COBRADO ? 'status--cobrado' : 'status--no-cobrado';
  };

  return (
    <div className="remesa-item">
      <div className="remesa-item__cell remesa-item__cell--id">
        <span className="remesa-id">{formatId(remesa.id)}</span>
      </div>
      
      <div className="remesa-item__cell remesa-item__cell--company">
        <span className="remesa-company">{remesa.company}</span>
      </div>
      
      <div className="remesa-item__cell remesa-item__cell--amount">
        <span className="remesa-amount">{formatAmount(remesa.amount)}</span>
      </div>
      
      <div className="remesa-item__cell remesa-item__cell--status">
        <span className={`remesa-status ${getStatusClass(remesa.status)}`}>
          {getStatusDisplay(remesa.status)}
        </span>
      </div>
    </div>
  );
};

export default RemesaItem;
