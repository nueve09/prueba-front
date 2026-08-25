import type { AlertManager } from '../../state/AlertManager';
import type { AppStore } from '../../state/Store';
import { MAX_REMITTANCE_ID_LENGTH } from '../../utils/Constants';
import { chargeRemittance } from '../../services/RemittanceService';

export const createPaymentController = (store: AppStore, alertManager: AlertManager) => ({
  selectRemittanceId: (remittanceId: string): void => {
    store.setState({ paymentInput: remittanceId, alert: null });
  },
  appendDigit: (digit: string): void => {
    const { paymentInput } = store.getState();

    if (paymentInput.length >= MAX_REMITTANCE_ID_LENGTH) {
      alertManager.show(
        `El ID de remesa no puede tener más de ${MAX_REMITTANCE_ID_LENGTH} caracteres.`,
        'error',
      );
      return;
    }

    store.setState({ paymentInput: `${paymentInput}${digit}`, alert: null });
  },
  deleteLastDigit: (): void => {
    const { paymentInput } = store.getState();
    store.setState({ paymentInput: paymentInput.slice(0, -1), alert: null });
  },
  charge: (): void => {
    const state = store.getState();
    const result = chargeRemittance(state.remittances, state.paymentInput);

    if (!result.success) {
      alertManager.show(result.error, 'error');
      return;
    }

    store.setState({
      remittances: result.remittances,
      paymentInput: '',
      searchQuery: '',
      isSearchOpen: false,
      currentPage: 1,
    });
    alertManager.show(`La remesa ${result.remittance.id} fue cobrada.`, 'success');
  },
});
