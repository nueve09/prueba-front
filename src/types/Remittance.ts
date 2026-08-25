export type RemittanceStatus = 'COBRADO' | 'NO_COBRADO';

export interface Remittance {
  id: string;
  company: string;
  amount: number;
  status: RemittanceStatus;
  created_at: string;
  charged_at: string | null;
}
