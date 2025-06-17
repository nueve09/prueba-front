import { useState, type ReactNode } from "react";
import type {
  Consignment,
  PaidConsignment,
} from "../data/models/consignment.model";
import { ConsignmentContext } from "./consignments.context";

export const ConsignmentProvider = ({
  children,
  defaultConsignments,
}: {
  children: ReactNode;
  defaultConsignments: Consignment[];
}) => {
  const [consignments, setConsignments] = useState<Consignment[]>([
    ...defaultConsignments,
  ]);
  const [paidConsignments, setPaidConsignments] = useState<PaidConsignment[]>([
    ...defaultConsignments.filter(
      (c): c is PaidConsignment => c.status === "PAID",
    ),
  ]);
  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);

  return (
    <ConsignmentContext.Provider
      value={{
        consignments,
        setConsignments,
        paidConsignments,
        setPaidConsignments,
        showSearchPanel,
        setShowSearchPanel,
      }}
    >
      {children}
    </ConsignmentContext.Provider>
  );
};
