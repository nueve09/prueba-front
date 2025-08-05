import { useState, useContext, useEffect } from 'react';
import { VALIDATION } from '../../../shared/constants';
import { RemesasContext } from '../../../shared/context/RemesasContext';

export const useCalculator = () => {
  const [display, setDisplay] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { processRemesa } = useContext(RemesasContext);

  // Only process Enter key when not in search inputs or other form elements
  useEffect(() => {
    const handleKeyDown = (event) => {
      const activeElement = document.activeElement;
      const isInSearchBar = activeElement && (
        activeElement.classList.contains('search-bar__input') ||
        activeElement.classList.contains('search-input') ||
        activeElement.closest('.search-bar') ||
        activeElement.closest('.search-input-container') ||
        activeElement.closest('.search-modal')
      );
      
      const isInInput = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
      );
      
      if (event.key === 'Enter' && !isInSearchBar && !isInInput) {
        event.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [display]);

  const handleKeyPress = (key) => {
    setError('');
    setSuccessMessage('');
    
    if (key === 'clear') {
      setDisplay('');
      return;
    }

    if (key === '.') {
      return;
    }

    if (display.length >= VALIDATION.MAX_ID_LENGTH) {
      setError(`ID no puede exceder ${VALIDATION.MAX_ID_LENGTH} caracteres`);
      return;
    }

    if (/^\d$/.test(key)) {
      setDisplay(prev => prev + key);
    }
  };

  const handleSubmit = () => {
    if (!display.trim()) {
      setError('Ingrese un ID de remesa');
      return;
    }

    if (display.length > VALIDATION.MAX_ID_LENGTH) {
      setError(`ID no puede exceder ${VALIDATION.MAX_ID_LENGTH} caracteres`);
      return;
    }

    const searchId = display.trim();
    const result = processRemesa(searchId);
    
    if (result.success) {
      setDisplay('');
      setError('');
      setSuccessMessage(`Remesa ${searchId} cobrada exitosamente`);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  const clearError = () => {
    setError('');
  };

  const clearSuccess = () => {
    setSuccessMessage('');
  };

  return {
    display,
    error,
    successMessage,
    handleKeyPress,
    handleSubmit,
    clearError,
    clearSuccess
  };
};
