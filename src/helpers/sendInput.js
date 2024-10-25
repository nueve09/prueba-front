
// Enviar valor del display de la calculadora
export const sendInput = (inputValue, remesas, mostrarAlerta) => {
  
  // Busca el ID capturado en el listado de remesas
  const remesa = remesas.find(remesa => remesa.id.toString() === inputValue);
  
  remesa
    ? remesa.status === "COBRADO"
      ? mostrarAlerta("remesaCobrado", inputValue)
      : remesa.status === "NO_COBRADO" && mostrarAlerta("preguntarCobrarRemesa", inputValue)
    : mostrarAlerta("remesaNoEncontrada", inputValue);
};
