import type { RemittanceStatus } from '../types/Remittance';

export const REMITTANCE_STATUS: Record<RemittanceStatus, RemittanceStatus> = {
  COBRADO: 'COBRADO',
  NO_COBRADO: 'NO_COBRADO',
};

export const DEFAULT_PAGE_SIZE = 10;
export const LIST_LOADING_DELAY_MS = 450;
export const MAX_REMITTANCE_ID_LENGTH = 8;
