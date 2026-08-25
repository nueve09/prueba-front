import { afterEach, describe, expect, it, vi } from 'vitest';
import { createAlertManager } from '../src/state/AlertManager';
import { createStore } from '../src/state/Store';

describe('AlertManager', () => {
  afterEach(() => vi.useRealTimers());

  it('muestra los mensajes generales de búsqueda, filtro y navegación', () => {
    const store = createStore();
    const alerts = createAlertManager(store);

    alerts.notifySearchResult(false);
    expect(store.getState().alert?.message).toBe('No hay resultados de esta búsqueda');

    alerts.notifySearchResult(true);
    expect(store.getState().alert?.message).toBe('Búsqueda completa');

    alerts.notifyFilterApplied();
    expect(store.getState().alert?.message).toBe('Filtro aplicado');

    alerts.notifyAreaSelected('Remesas');
    expect(store.getState().alert?.message).toBe('Remesas Seleccionado');
  });

  it('cierra la alerta automáticamente después de cinco segundos', () => {
    vi.useFakeTimers();
    const store = createStore();
    const alerts = createAlertManager(store);

    alerts.show('Mensaje temporal');
    vi.advanceTimersByTime(5000);

    expect(store.getState().alert).toBeNull();
  });
});
