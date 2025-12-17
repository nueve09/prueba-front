"use client";

import type { Remesa } from "@/src/types/remesa";
import RemesaCard from "@/src/components/RemesaCard/RemesaCard";
import styles from "./RemesasList.module.css";

interface RemesasListProps {
  remesas: Remesa[];
  emptyMessage?: string;
}

export default function RemesasList({ remesas, emptyMessage = "No hay remesas para mostrar" }: RemesasListProps) {
  if (remesas.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {remesas.map((remesa) => (
        <RemesaCard 
          key={`${remesa.id}-${remesa.status}-${remesa.charged_at || 'no-charged'}`} 
          remesa={remesa} 
        />
      ))}
    </div>
  );
}

