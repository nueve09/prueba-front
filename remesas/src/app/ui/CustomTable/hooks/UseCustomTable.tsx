import { CustomTableProps } from "@common/interfaces";
import React from "react";

export default function useCustomTable<TValue extends { id: number }>({
  data,
}: CustomTableProps<TValue>) {
  const rows = React.useMemo<TValue[]>(() => data, [data]);

  return {
    rows,
  };
}
