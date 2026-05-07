import React, { useEffect } from "react";
import "../styles/Notification.css";

export { Notification };

export type NotificationType = "success" | "error" | "alert" | "general";

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

function Notification({
  type,
  message,
  onClose,
}: NotificationProps): React.ReactElement | null {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "fa-circle-check";
      case "error":
        return "fa-circle-exclamation";
      case "alert":
        return "fa-triangle-exclamation";
      case "general":
      default:
        return "fa-circle-info";
    }
  };

  return (
    <div className={`notification-toast variant-${type}`}>
      <i className={`fa-solid ${getIcon()}`}></i>
      <span className="notification-message">{message}</span>
      <button className="close-btn" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}
