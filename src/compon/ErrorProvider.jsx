
import React, { createContext, useState } from 'react';
import './errorProvider.css';

const ErrorContext = createContext();

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000); 
  };

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
      {error && <div className="error-message">{error}</div>}
    </ErrorContext.Provider>
  );
};

export { ErrorProvider, ErrorContext };
