import React from "react";
import styles from "./UI.module.css";
import { Bolt } from "lucide-react";

function ConfigButton() {
  return (
    <div className={`${styles.configButton}`}>
      Configuration
      <Bolt className={styles.configButtonIcon} />
    </div>
  );
}

export default ConfigButton;
