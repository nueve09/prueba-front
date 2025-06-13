/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useEffect } from "react";
import { useRemittanceStore } from "../store/useRemittanceStore";

export default function Pagination() {
  const page = useRemittanceStore((s) => s.page);
  const setPage = useRemittanceStore((s) => s.setPage);
  const remesas = useRemittanceStore((s) => s.remesas);
  const pageSize = useRemittanceStore((s) => s.pageSize);
  const searchTerm = useRemittanceStore((s) => s.searchTerm);
  const filterType = useRemittanceStore((s) => s.filterType);
  const filterValue = useRemittanceStore((s) => s.filterValue);

  const total = useMemo(() => {
    let list = remesas.filter((r) => r.status === "COBRADO");

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (r) =>
          r.id.includes(term) ||
          r.company.toLowerCase().includes(term) ||
          r.amount.toString().includes(term)
      );
    }

    if (filterType === "amount_desc") {
      list = [...list].sort((a, b) => b.amount - a.amount);
    } else if (filterType === "amount_asc") {
      list = [...list].sort((a, b) => a.amount - b.amount);
    } else if (filterType === "date_asc") {
      list = [...list].sort((a, b) =>
        (a.charged_at || "").localeCompare(b.charged_at || "")
      );
    } else if (filterType === "date_desc") {
      list = [...list].sort((a, b) =>
        (b.charged_at || "").localeCompare(a.charged_at || "")
      );
    }

    return Math.max(1, Math.ceil(list.length / pageSize));
  }, [remesas, searchTerm, filterType, filterValue, pageSize]);

  useEffect(() => {
    if (page > total) setPage(1);
  }, [page, total, setPage]);

  return (
    <div className="flex items-center justify-center space-x-4 my-4">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="px-3 py-1 border rounded disabled:opacity-50 focus:outline-none"
      >
        Anterior
      </button>
      <span>
        {page} / {total}
      </span>
      <button
        onClick={() => setPage(Math.min(total, page + 1))}
        disabled={page >= total}
        className="px-3 py-1 border rounded disabled:opacity-50 focus:outline-none"
      >
        Siguiente
      </button>
    </div>
  );
}
