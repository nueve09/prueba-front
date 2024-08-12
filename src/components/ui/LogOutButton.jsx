import React from "react";
import styles from "./UI.module.css";
import { Power } from "lucide-react";

function LogOutButton() {
  return (
    <div className={`${styles.logOutButton}`}>
      Log Out
      <Power className={styles.logOutButtonIcon} />
    </div>
  );
}

export default LogOutButton;
