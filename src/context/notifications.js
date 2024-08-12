import React, { createContext, useState, useContext } from "react";

const NotificationsContext = createContext();

export const useNotification = () => useContext(NotificationsContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
  };

  const hideNotification = () => {
    setNotification("");
  };

  return (
    <NotificationsContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
