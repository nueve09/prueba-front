import { validateRemittanceId } from '../features/remittance-payment/PaymentValidators';
import type { Remittance } from '../types/Remittance';
import { formatDateForStorage } from '../utils/Date';

export type ChargeRemittanceResult =
  | { success: true; remittance: Remittance; remittances: Remittance[] }
  | { success: false; error: string; remittances: Remittance[] };

export const chargeRemittance = (
  remittances: Remittance[],
  remittanceId: string,
  chargedAt = formatDateForStorage(new Date()),
): ChargeRemittanceResult => {
  const validation = validateRemittanceId(remittanceId);

  if (!validation.isValid) {
    return { success: false, error: validation.error, remittances };
  }

  const remittance = remittances.find(({ id }) => id === validation.value);

  if (!remittance) {
    return {
      success: false,
      error: 'No se encontró una remesa con el ID proporcionado.',
      remittances,
    };
  }

  if (remittance.status === 'COBRADO') {
    return {
      success: false,
      error: 'La remesa indicada ya fue cobrada.',
      remittances,
    };
  }

  const chargedRemittance: Remittance = {
    ...remittance,
    status: 'COBRADO',
    charged_at: chargedAt,
  };

  return {
    success: true,
    remittance: chargedRemittance,
    remittances: remittances.map((item) =>
      item.id === chargedRemittance.id ? chargedRemittance : item,
    ),
  };
};
