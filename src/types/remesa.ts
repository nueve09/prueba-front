/**
 * Tipo base para una Remesa
 * Representa una transacción de remesa con su estado y fechas
 */
export interface Remesa {
  id: string;              // max 8 chars
  company: string;
  amount: number;
  status: "COBRADO" | "NO_COBRADO";
  created_at: string;      // ISO date
  charged_at?: string;     // ISO date | optional until charged
}

