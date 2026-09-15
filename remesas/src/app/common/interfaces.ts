import { SvgIconProps } from "@mui/material";

export interface MenuItem {
  id: number;
  name: string;
  icon: React.ComponentType<SvgIconProps>;
  route: string;
  component?: React.ComponentType;
}

export type PaymentStatus = "NO_COBRADO" | "COBRADO";

export interface Payment {
  id: number;
  company: string;
  amount: number;
  status: PaymentStatus;
  created_at: string;
  charged_at: string | null;
}

export type SortDirection = "asc" | "desc";

export type PaymentSortField =
  | "id"
  | "company"
  | "amount"
  | "status"
  | "created_at"
  | "charged_at";

export interface PaymentFilters {
  id?: string;
  company?: string;
  amount?: string;
  status?: PaymentStatus;
  sortBy?: PaymentSortField;
  sortDirection?: SortDirection;
}

export interface DataElement {
  value: string | number;
  adornment: string;
}

export interface Schema {
  attribute: string;
  name: string;
  sortKey?: PaymentSortField;
}

export interface CustomTableProps<TValue extends { id: number }> {
  data: TValue[];
  schema: Schema[];
  sortBy?: string;
  sortDirection?: SortDirection;
  onSort?: (attribute: string) => void;
}
