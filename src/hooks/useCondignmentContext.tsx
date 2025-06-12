import { useContext } from "react";
import { ConsignmentContext } from "../context/consignments.context";

export const useConsignmentContext = () => {
  const context = useContext(ConsignmentContext);
  if (!context) {
    throw new Error(
      "useConsignmentContext must be used within a ConsignmentProvider",
    );
  }
  return context;
};
