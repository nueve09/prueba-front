import React from "react";
import styles from "./RemittancesList.module.css";
import ConfigAccordion from "@/components/ui/ConfigAccordion";
import NotificationsBell from "@/components/ui/NotificationsBell";
import DateSubHeader from "@/components/ui/DateSubHeader";
import KeyboardButton from "@/components/ui/KeyboardButton";
import RemittancesTable from "./RemittancesTable/RemittancesTable";

function RemittancesList({ payedRemittances }) {
  return (
    <div className={`${styles.remittancesListContainer}`}>
      <div className={`${styles.remittancesListHeader}`}>
        <NotificationsBell />
        <ConfigAccordion />
      </div>
      <div className={`${styles.remittancesListSubHeader}`}>
        <DateSubHeader />
        <KeyboardButton />
      </div>
      <RemittancesTable payedRemittances={payedRemittances} />
    </div>
  );
}

export default RemittancesList;
