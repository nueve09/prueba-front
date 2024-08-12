import React from "react";
import PropTypes from "prop-types";
import styles from "./UI.module.css";
import { DeleteIcon, CornerDownLeft } from "lucide-react";

function CapsuleButton({
  value,
  direction = "horizontal",
  enter = false,
  deleteIcon = false,
  enterIcon = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        direction === "vertical"
          ? styles.verticalCapsuleButton
          : styles.horizontalCapsuleButton
      } ${enter ? styles.enter : ""}`}
    >
      {!deleteIcon && !enterIcon && value}
      {!enterIcon && deleteIcon && !value && (
        <DeleteIcon className={`${styles.capsuleButtonDeleteIcon}`} />
      )}
      {enterIcon && !deleteIcon && !value && (
        <CornerDownLeft className={`${styles.capsuleButtonEnterIcon}`} />
      )}
    </button>
  );
}

CapsuleButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.oneOf(["vertical", "horizontal"]).isRequired,
  enter: PropTypes.bool,
  deleteIcon: PropTypes.bool,
  enterIcon: PropTypes.bool,
};

export default CapsuleButton;
