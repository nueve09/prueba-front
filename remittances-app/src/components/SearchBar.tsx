import { useState, useEffect, useRef } from "react";
import { useRemittanceStore } from "../store/useRemittanceStore";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const setSearch = useRemittanceStore((s) => s.setSearch);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setSearch(term.trim());
    }, 500);

    return () => window.clearTimeout(debounceRef.current);
  }, [term, setSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div className="flex max-h-12 pt-4 mr-4">
      <input
        type="text"
        placeholder="Buscar..."
        value={term}
        onChange={handleChange}
        className="flex-1 p-2 border-4 border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500"
      />
    </div>
  );
}
