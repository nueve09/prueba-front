import { describe, expect, it } from 'vitest';
import { validateRemittanceId } from '../src/features/remittance-payment/PaymentValidators';

describe('PaymentValidators', () => {
  it('acepta un identificador numérico de hasta 8 caracteres', () => {
    expect(validateRemittanceId('29003401')).toEqual({ isValid: true, value: '29003401' });
  });

  it('rechaza un identificador vacío', () => {
    expect(validateRemittanceId('   ')).toEqual({
      isValid: false,
      error: 'El ID de remesa es obligatorio.',
    });
  });

  it('rechaza un identificador con más de 8 caracteres', () => {
    expect(validateRemittanceId('290034011')).toMatchObject({ isValid: false });
  });

  it('rechaza caracteres que no correspondan al formato de identificador', () => {
    expect(validateRemittanceId('29A03401')).toMatchObject({ isValid: false });
  });
});
