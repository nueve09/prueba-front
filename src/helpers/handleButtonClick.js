// Helpers
import { sendInput } from '@helpers/sendInput';
// Data
import { Icons } from '@data/icons'


// Maneja la interaccion con los botones de la calculadora
export const handleButtonClick = (value, inputValue, setInputValue, remesas, mostrarAlerta) => {

  // CASO 1: Boton eliminar, eliminando la ultima posicion
  if (value === Icons.Delete) {
    setInputValue((prev) => prev.slice(0, -1));
  }

  // CASO 2: Boton enter, validando el valor del input de la calculadora
  else if (value === Icons.Enter) {
    sendInput(inputValue, remesas, mostrarAlerta);
    setInputValue('');
  }

  // CASO 3: Botones numericos, comprobando la longitud maxima de 8
  else if (typeof value === 'string' && value.match(/^\d$/)) {
    if (inputValue.length < 8) {
      setInputValue((prev) => prev + value);
    }
  }

  // CASO 4: Al introducir algun valor no numerico, se muestra el error
  else {
    mostrarAlerta("inputInvalido", inputValue);
  }
};
