import { MAX_REMITTANCE_ID_LENGTH } from '../../utils/Constants';

export type RemittanceIdValidation =
  | { isValid: true; value: string }
  | { isValid: false; error: string };

export const validateRemittanceId = (input: string): RemittanceIdValidation => {
  const value = input.trim();

  if (!value) {
    return { isValid: false, error: 'El ID de remesa es obligatorio.' };
  }

  if (!/^\d+$/.test(value)) {
    return { isValid: false, error: 'El ID de remesa debe contener solo números.' };
  }

  if (value.length > MAX_REMITTANCE_ID_LENGTH) {
    return {
      isValid: false,
      error: `El ID de remesa no puede tener más de ${MAX_REMITTANCE_ID_LENGTH} caracteres.`,
    };
  }

  return { isValid: true, value };
};
