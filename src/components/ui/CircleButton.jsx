import React from "react";
import styles from "./UI.module.css";

function CircleButton({ value, onClick }) {
  return (
    <button onClick={onClick} className={`${styles.circleButton}`}>
      {value}
    </button>
  );
}

export default CircleButton;
