import { describe, expect, it, vi } from 'vitest';
import { createPaymentController } from '../src/features/remittance-payment/PaymentController';
import type { AlertManager } from '../src/state/AlertManager';
import { createStore } from '../src/state/Store';

const alertManager: AlertManager = {
  show: vi.fn(),
  clear: vi.fn(),
  notifySearchResult: vi.fn(),
  notifyFilterApplied: vi.fn(),
  notifyAreaSelected: vi.fn(),
};

describe('PaymentController', () => {
  it('carga el identificador seleccionado en el campo de pago', () => {
    const store = createStore();
    const controller = createPaymentController(store, alertManager);

    controller.selectRemittanceId('29003401');

    expect(store.getState().paymentInput).toBe('29003401');
  });
});
