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
  { attribute: "identifier", name: "ID" },
  { attribute: "company", name: "Empresa" },
  { attribute: "amount", name: "Monto" },
  { attribute: "status", name: "Estado" },
  { attribute: "created_at", name: "Fecha de creación" },
  { attribute: "charged_at", name: "Fecha de cobro" },
];
