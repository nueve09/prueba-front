// Bibliotecas
import Swal from 'sweetalert2'


// Estilos de botones de alertas
export const botonSweetAlert = Swal.mixin({
  customClass: {
    confirmButton: `bg-green-700 text-white-50 font-semibold duration-1000 hover:bg-green-800 rounded px-4 py-2 mx-2`,
    cancelButton: `bg-red-600 text-white-50 font-semibold duration-1000 hover:bg-red-700 rounded px-4 py-2 mx-2`,
  },
  buttonsStyling: false,
});