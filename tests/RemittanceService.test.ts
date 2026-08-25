import { describe, expect, it } from 'vitest';
import { chargeRemittance } from '../src/services/RemittanceService';
import type { Remittance } from '../src/types/Remittance';

describe('RemittanceService', () => {
  const remittances: Remittance[] = [
    { id: '29003401', company: 'Western Union', amount: 12000, status: 'NO_COBRADO', created_at: '20231001', charged_at: null },
    { id: '29003402', company: 'MoneyGram', amount: 8000, status: 'COBRADO', created_at: '20231001', charged_at: '20231002' },
  ];

  it('cobra una remesa existente y asigna la fecha de cobro', () => {
    const result = chargeRemittance(remittances, '29003401', '20260825');

    expect(result).toMatchObject({ success: true });
    expect(result.remittances[0]).toMatchObject({
      status: 'COBRADO',
      charged_at: '20260825',
    });
    expect(remittances[0].status).toBe('NO_COBRADO');
  });

  it('rechaza el cobro de una remesa inexistente', () => {
    const result = chargeRemittance(remittances, '29003499', '20260825');

    expect(result).toMatchObject({ success: false, error: expect.stringContaining('No se encontró') });
  });

  it('rechaza el cobro duplicado de una remesa', () => {
    const result = chargeRemittance(remittances, '29003402', '20260825');

    expect(result).toMatchObject({ success: false, error: expect.stringContaining('ya fue cobrada') });
  });
});
