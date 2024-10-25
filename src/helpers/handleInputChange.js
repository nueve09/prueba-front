// Controlador de los cambios en el input por teclado
export const handleInputChange = (event, setInputValue) => {

  // Se obtiene el nuevo valor que se desea escribir
  const newValue = event.target.value;

  // Solo cuando sean valores numericos y menores a 8 se escriben
  if (newValue.length <= 8 && /^\d*$/.test(newValue)) {
    setInputValue(newValue);
  }

};
