// ErrorProvider.jsx
import React, { createContext, useContext, useState } from 'react';
import './ErrorProvider.css'; // Asegúrate de que la ruta sea correcta

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <div className="error-message">{message}</div>;
};

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const triggerError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <ErrorContext.Provider value={{ triggerError }}>
      {children}
      <ErrorMessage message={error} />
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
