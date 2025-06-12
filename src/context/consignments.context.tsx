import { createContext, type Dispatch, type SetStateAction } from "react";
import type {
  Consignment,
  PaidConsignment,
} from "../data/models/consignment.model";

export type ConsignmentContextType = {
  consignments: Consignment[];
  setConsignments: Dispatch<SetStateAction<Consignment[]>>;
  paidConsignments: PaidConsignment[];
  setPaidConsignments: Dispatch<SetStateAction<PaidConsignment[]>>;
  showSearchPanel: boolean;
  setShowSearchPanel: Dispatch<SetStateAction<boolean>>;
};

export const ConsignmentContext = createContext<
  ConsignmentContextType | undefined
>(undefined);
