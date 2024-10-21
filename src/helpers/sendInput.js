// Bibliotecas
import Swal from 'sweetalert2'
import { cobrarRemesa } from '@redux/slices/remesas'


// Estilos de boton de Sweet Alert
const botonSweetAlert = Swal.mixin({
  customClass: {
    confirmButton: `bg-green-500 text-white-50 font-semibold hover:bg-green-600 rounded px-4 py-2 mx-2`,
    cancelButton: `bg-red-500 text-white-50 font-semibold hover:bg-red-600 rounded px-4 py-2 mx-2`,
  },
  buttonsStyling: false,
});

// Enviar valor del display de la calculadora
export const sendInput = (inputValue, remesas, dispatch) => {

  // Busca el ID capturado en el listado de remesas
  const remesa = remesas.find(remesa => remesa.id.toString() === inputValue);

  // Si existe el ID en el listado...
  if (remesa) {

    // Si el ID ya fue cobrado
    if (remesa.status === "COBRADO") {
      // Alerta informando que ya ha sido cobrada
      botonSweetAlert.fire({
        title: 'Remesa cobrada',
        text: "La remesa ya fue cobrada.",
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }

    // Si el ID no ha sido cobrado
    else if (remesa.status === "NO_COBRADO") {
      // Alerta preguntando si quiere cobrar la remesa
      botonSweetAlert.fire({
        title: "¿Desea cobrar la remesa?",
        text: "Esta acción no podrá ser revertida.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, cobrar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
      }).then((result) => {

        // Alerta si el usuario acepta pagar la remesa
        if (result.isConfirmed) {
          dispatch(cobrarRemesa(remesa.id));
          botonSweetAlert.fire({
            title: "¡Remesa cobrada!",
            text: "La remesa ha sido cobrada con éxito.",
            icon: "success"
          });
        }

        // Alerta si el usuario no acepta pagar la remesa
        else if (result.dismiss === Swal.DismissReason.cancel) {
          botonSweetAlert.fire({
            title: "Cancelado",
            text: "La operación de cobro ha sido cancelada.",
            icon: "error"
          });
        }
      });
    }
  }

  // Si no existe el ID en el listado...
  else {
    // Alerta informando que no se ha encontrado el ID de la remesa
    botonSweetAlert.fire({
      title: 'Remesa no encontrada',
      text: 'El ID no está en el catálogo de remesas.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }
};