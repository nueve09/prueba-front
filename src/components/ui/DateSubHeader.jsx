import React from "react";
import styles from "./UI.module.css";
import { formatDateToSpanishString } from "@/lib/utils";

function DateSubHeader() {
  const today = new Date();
  return (
    <div className={`${styles.dateSubHeader}`}>
      <p>Hoy</p>
      <p>{formatDateToSpanishString(today)}</p>
    </div>
  );
}

export default DateSubHeader;
