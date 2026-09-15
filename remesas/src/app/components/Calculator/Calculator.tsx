"use client";

import React from "react";
import "./style.scss";

import useCalculator from "./hooks/UseCalculator";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import Separator from "@ui/Separator/Separator";

export default function Calculator() {
  const {
    inputValue,
    handleInputChange,
    handlePadClick,
    handleBackspace,
    handleSubmit,
    PAD_KEYS,
  } = useCalculator();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-container__title">
        <span>Ventanilla </span>
        <strong>Digital</strong>
      </div>

      <Separator />

      <span className="calculator-container__subtitle">Remesas</span>

      <div className="calculator-container__content">
        <input
          className="calculator-container__content__input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <div className="calculator-container__content__pad">
          <div className="calculator-container__content__pad__numbers">
            <div className="calculator-container__content__pad__numbers__grid">
              {PAD_KEYS.map((key) => {
                return (
                  <button
                    key={key}
                    className="calculator-container__content__pad__key"
                    onClick={() => handlePadClick(key)}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            <button
              className="calculator-container__content__pad__key calculator-container__content__pad__zero"
              onClick={() => handlePadClick("0")}
            >
              0
            </button>
          </div>

          <div className="calculator-container__content__pad__actions">
            <button
              className="calculator-container__content__pad__key calculator-container__content__pad__backspace"
              onClick={handleBackspace}
            >
              <BackspaceOutlinedIcon sx={{ fontSize: 24 }} />
            </button>

            <button
              className="calculator-container__content__pad__key calculator-container__content__pad__submit"
              onClick={handleSubmit}
            >
              <KeyboardReturnOutlinedIcon sx={{ fontSize: 28 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
