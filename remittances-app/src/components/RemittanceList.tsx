import { useMemo } from "react";
import { useRemittanceStore } from "../store/useRemittanceStore";

export default function RemesaList() {
  const remesas = useRemittanceStore((s) => s.remesas);
  const searchTerm = useRemittanceStore((s) => s.searchTerm);
  const page = useRemittanceStore((s) => s.page);
  const pageSize = useRemittanceStore((s) => s.pageSize);
  const filterType = useRemittanceStore((s) => s.filterType);

  const filtered = useMemo(() => {
    let list = remesas.filter((r) => r.status === "COBRADO");

    // search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (r) =>
          r.id.includes(term) ||
          r.company.toLowerCase().includes(term) ||
          r.amount.toString().includes(term)
      );
    }

    // filters
    if (filterType === "amount_desc") {
      list = [...list].sort((a, b) => b.amount - a.amount);
    }
    if (filterType === "amount_asc") {
      list = [...list].sort((a, b) => a.amount - b.amount);
    }
    if (filterType === "date_asc") {
      list = [...list].sort((a, b) =>
        (a.charged_at || "").localeCompare(b.charged_at || "")
      );
    }
    if (filterType === "date_desc") {
      list = [...list].sort((a, b) =>
        (b.charged_at || "").localeCompare(a.charged_at || "")
      );
    }

    if (!filterType) {
      list = list.sort((a, b) =>
        (b.charged_at || "").localeCompare(a.charged_at || "")
      );
    }

    return list;
  }, [remesas, searchTerm, filterType]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  if (!paged.length) {
    return (
      <p className="mt-4 text-center text-gray-500">
        No hay remesas para mostrar.
      </p>
    );
  }

  return (
    <ul className="mt-4 rounded overflow-hidden">
      {paged.map((r) => (
        <li
          key={r.id}
          className="flex justify-between p-4 border-t-1  border-gray-400"
        >
          <span className="font-mono text-gray-400">{r.id}</span>
          <span className="font-mono text-gray-400">{r.company}</span>
          <span className="font-mono text-gray-400">${r.amount}</span>
        </li>
      ))}
    </ul>
  );
}
