"use client";

import type { Remesa } from "@/src/types/remesa";
import { formatCurrency, formatDate } from "@/src/utils/formatters";
import styles from "./RemesaCard.module.css";

interface RemesaCardProps {
  remesa: Remesa;
}

export default function RemesaCard({ remesa }: RemesaCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.id}>#{remesa.id}</span>
        <span className={styles.company}>{remesa.company}</span>
        <span className={styles.amount}>{formatCurrency(remesa.amount)}</span>
      </div>
    </div>
  );
}

