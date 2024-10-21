// Controlador de los cambios en el input por teclado
export const handleInputChange = (event, setInputValue, setError) => {

  const newValue = event.target.value;

  // Comprobacion de longitud max(8)
  if (newValue.length <= 8 && /^\d*$/.test(newValue)) {
    setInputValue(newValue);
    setError(null);
  }

  // Al intentar superar los 8 caracteres, se muestra el error
  else if (newValue.length > 8) {
    setError('El ID no puede tener más de 8 caracteres');
  }

  // Al introducir algun valor no numerico, se muestra el error
  else {
    setError('El ID debe contener solo números');
  }
};
