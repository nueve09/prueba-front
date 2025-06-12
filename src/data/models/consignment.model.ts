export const ConsignmentStatus = {
  PAID: "PAID",
  UNPAID: "UNPAID",
} as const satisfies Record<string, string>;

export type ConsignmentStatusType = keyof typeof ConsignmentStatus;

export type BaseConsignment = {
  id: string;
  company: string;
  amount: string;
  created_at: string;
  status: ConsignmentStatusType;
};

export type PaidConsignment = BaseConsignment & {
  status: typeof ConsignmentStatus.PAID;
  charged_at: string;
};

export type UnpaidConsignment = BaseConsignment & {
  status: typeof ConsignmentStatus.UNPAID;
  charged_at?: never;
};

export type Consignment = PaidConsignment | UnpaidConsignment;
