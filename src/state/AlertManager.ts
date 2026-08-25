import type { AppStore } from './Store';
import type { AlertType } from '../types/AppState';

export interface AlertManager {
  show: (message: string, type?: AlertType) => void;
  clear: () => void;
  notifySearchResult: (hasResults: boolean) => void;
  notifyFilterApplied: () => void;
  notifyAreaSelected: (area: string) => void;
}

export const createAlertManager = (store: AppStore): AlertManager => {
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  const clear = (): void => {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = undefined;
    store.setState({ alert: null });
  };

  const show = (message: string, type: AlertType = 'info'): void => {
    if (closeTimer) clearTimeout(closeTimer);
    store.setState({ alert: { message, type } });
    closeTimer = setTimeout(() => {
      store.setState({ alert: null });
      closeTimer = undefined;
    }, 5000);
  };

  return {
    show,
    clear,
    notifySearchResult: (hasResults): void => {
      show(
        hasResults ? 'Búsqueda completa' : 'No hay resultados de esta búsqueda',
        hasResults ? 'success' : 'info',
      );
    },
    notifyFilterApplied: (): void => {
      show('Filtro aplicado');
    },
    notifyAreaSelected: (area): void => {
      show(`${area} Seleccionado`);
    },
  };
};
