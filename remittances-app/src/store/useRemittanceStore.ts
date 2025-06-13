// src/store/remittanceStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { initialRemittances } from "../data/remittances";
import type { Remittance } from "../types";

interface RemittanceState {
  remesas: Remittance[];
  error: string | null;
  searchTerm: string;
  page: number;
  pageSize: number;

  setSearch: (term: string) => void;
  setPage: (p: number) => void;
  clearError: () => void;
  chargeRemesa: (id: string) => void;

  filterType: "amount_desc" | "amount_asc" | "date_asc" | "date_desc" | null;
  filterValue: number | null;
  setFilter: (type: RemittanceState["filterType"], value?: number) => void;
  clearFilter: () => void;
}

export const useRemittanceStore = create<RemittanceState>()(
  devtools((set, get) => ({
    remesas: initialRemittances,
    error: null,
    searchTerm: "",
    page: 1,
    pageSize: 10,

    setSearch: (term) => set({ searchTerm: term, page: 1 }),
    setPage: (p) => set({ page: p }),
    clearError: () => set({ error: null }),
    chargeRemesa: (id) => {
      const list = get().remesas;
      const exists = list.find((r) => r.id === id);

      if (!exists) {
        set({ error: "ID no encontrado" });
        return;
      }
      if (exists.status === "COBRADO") {
        set({ error: "La remesa ya fue cobrada" });
        return;
      }

      const updated = list.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "COBRADO" as const,
              charged_at: new Date()
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, ""),
            }
          : r
      );

      set({ remesas: updated, error: null });
    },
    filterType: null,
    filterValue: null,

    setFilter: (type, value) => {
      set({ filterType: type, filterValue: value, page: 1 });
    },
    clearFilter: () => {
      set({ filterType: null, filterValue: null, page: 1 });
    },
  }))
);
