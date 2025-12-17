"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Buscar por ID, compañía o monto..." }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Buscar remesas"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
        <button type="submit" className={styles.searchButton} aria-label="Buscar">
          🔍
        </button>
      </div>
    </form>
  );
}

