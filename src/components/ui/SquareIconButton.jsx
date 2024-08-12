import React from "react";
import PropTypes from "prop-types";
import styles from "./UI.module.css";
import { PrinterIcon, SearchIcon, SlidersHorizontal } from "lucide-react";

function SquareIconButton({ type = "search", onClick }) {
  return (
    <button className={`${styles.squareButton}`}>
      {type === "search" && (
        <SearchIcon className={`${styles.squareButtonIcon}`} />
      )}
      {type === "print" && (
        <PrinterIcon className={`${styles.squareButtonIcon}`} />
      )}
      {type === "sort" && (
        <SlidersHorizontal className={`${styles.squareButtonIcon}`} />
      )}
    </button>
  );
}

SquareIconButton.propTypes = {
  type: PropTypes.oneOf(["search", "print", "sort"]),
};

export default SquareIconButton;
