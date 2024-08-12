import React from "react";
import styles from "./UI.module.css";
import { KeyboardIcon } from "lucide-react";

function KeyboardButton() {
  return (
    <button className={`${styles.keyboardButton}`}>
      <KeyboardIcon className={styles.keyboardButtonIcon} />
    </button>
  );
}

export default KeyboardButton;
