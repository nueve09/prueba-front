export type Remittance = {
  id: string;
  company: string;
  amount: number;
  status: "COBRADO" | "NO_COBRADO";
  created_at: string; // YYYYMMDD
  charged_at?: string;
};
