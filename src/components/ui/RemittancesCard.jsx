import React from "react";
import styles from "./UI.module.css";
import { formattedAmount } from "@/lib/utils";

function RemittancesCard({ id, company, amount }) {
  return (
    <div className={`${styles.remittancesCard}`}>
      <span>{`#${id}`}</span>
      <span>{`${company}`}</span>
      <span>{`${formattedAmount(amount)}`}</span>
    </div>
  );
}

export default RemittancesCard;
