import { useEffect } from 'react'
import './ErrorPopup.css'

const AUTO_DISMISS_MS = 4000;

// README: componente para mostrar mensajes de errores generales en toda la aplicación
function ErrorPopup({ message, onClose }) {
  useEffect(() => {
    if (!message) return undefined;

    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="error-popup" role="alert">
      <span className="error-popup-message">{message}</span>
      <button type="button" className="error-popup-close" onClick={onClose} aria-label="Cerrar">
        ×
      </button>
    </div>
  );
}

export default ErrorPopup;
