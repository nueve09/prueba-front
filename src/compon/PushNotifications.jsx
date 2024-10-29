import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './pushNotifications.css';

function PushNotifications({ notifications, onClose }) {
  // Efecto para eliminar automáticamente cada notificación después de un tiempo
  useEffect(() => {
    const timers = notifications.map((notification) =>
      setTimeout(() => {
        const index = notifications.findIndex((n) => n.id === notification.id);
        if (index !== -1) notifications.splice(index, 1);
      }, 3000) // Las notificaciones desaparecerán después de 3 segundos
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [notifications, onClose]);

  return (
    <div className="push-notifications-container">
      {notifications.map((notification) => (
        <div
        key={notification.id}
        className={`push-notification ${notification.type === 'good' ? 'notification-good' : 'notification-bad'}`}
      >
        <div className="notification-content">
          <h4>{notification.title}</h4>
          <p>{notification.message}</p>
        </div>
        <FontAwesomeIcon
          icon={faTimes}
          className="close-icon"
          onClick={() => onClose(notification.id)} 
        />
      </div>
    ))}
  </div>
  );
}

export default PushNotifications;
