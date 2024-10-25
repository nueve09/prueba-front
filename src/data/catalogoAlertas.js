// Componentes
import { AlertaAdvertencia } from '@components/main/ui/AlertaAdvertencia';
import { AlertaInformacion } from '@components/main/ui/AlertaInformacion';
import { AlertaPregunta } from '@components/main/ui/AlertaPregunta';

// Catalogo de alertas con mensajes
export const catalogoAlertas = {
  remesaNoEncontrada: {
    component: AlertaAdvertencia,
    props: {
      title: "Remesa no encontrada",
      text: "El ID no está en el catálogo de remesas.",
    },
  },
  remesaCobrado: {
    component: AlertaInformacion,
    props: {
      title: "Remesa cobrada",
      text: "La remesa ya fue cobrada.",
    },
  },
  preguntarCobrarRemesa: {
    component: AlertaPregunta,
    props: {
      title: "¿Dese cobrar la remesa?",
      text: "Esta acción no podrá ser revertida.",
    },
  }
};
