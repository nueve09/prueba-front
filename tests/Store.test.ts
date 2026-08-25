import { describe, expect, it } from 'vitest';
import { getMockRemittances, remittanceMocks } from '../src/state/Store';

describe('Store mocks', () => {
  it('expone 38 remesas para simular la fuente de datos', () => {
    expect(remittanceMocks).toHaveLength(38);
  });

  it('devuelve copias independientes de los mocks', () => {
    const firstRead = getMockRemittances();
    const secondRead = getMockRemittances();

    firstRead[0].status = 'NO_COBRADO';

    expect(secondRead[0].status).toBe('COBRADO');
  });
});
