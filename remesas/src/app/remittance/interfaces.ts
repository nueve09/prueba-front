import { DataElement, Schema } from "@common/interfaces";

export interface PaymentRow {
  id: number;
  identifier: DataElement;
  company: DataElement;
  amount: DataElement;
  status: DataElement;
  created_at: DataElement;
  charged_at: DataElement;
}

export const PAYMENT_COLUMNS: Schema[] = [
  { attribute: "identifier", name: "ID", sortKey: "id" },
  { attribute: "company", name: "Empresa", sortKey: "company" },
  { attribute: "amount", name: "Monto", sortKey: "amount" },
  { attribute: "status", name: "Estado", sortKey: "status" },
  { attribute: "created_at", name: "Fecha de creación", sortKey: "created_at" },
  { attribute: "charged_at", name: "Fecha de cobro", sortKey: "charged_at" },
];
