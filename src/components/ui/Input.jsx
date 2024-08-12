import React from "react";
import styles from "./UI.module.css";
import PropTypes from "prop-types";

function Input({
  type = "text",
  inputSuffix = "",
  textAlign = "left",
  value,
  onChange,
  onKeyDown,
  readOnly,
}) {
  return (
    <div className={`${styles.inputContainer}`}>
      {inputSuffix && <span className={styles.inputSuffix}>{inputSuffix}</span>}
      <input
        type={type}
        className={`${styles.input} ${
          textAlign === "center" ? `${styles.textCenter}` : ``
        } ${textAlign === "left" ? `${styles.textLeft}` : ``}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.oneOf(["number", "text"]),
  inputSuffix: PropTypes.oneOfType([PropTypes.string]),
  textAlign: PropTypes.oneOf(["center", "left", "right"]),
};

export default Input;
