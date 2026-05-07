export type { Remesas };

interface Remesas {
  id: string;
  company: string;
  amount: string;
  status: "COBRADO" | "NO_COBRADO";
  created_at: string;
  charget_at: string;
}
