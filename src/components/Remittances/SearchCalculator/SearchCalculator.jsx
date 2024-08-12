import React, { useState } from "react";
import styles from "./SearchCalculator.module.css";
import CircleButton from "@/components/ui/CircleButton";
import CapsuleButton from "@/components/ui/CapsuleButton";
import Input from "@/components/ui/Input";
import SectionHeader from "@/components/ui/SectionHeader";
import { useNotification } from "@/context/notifications";

function SearchCalculator({ updateRemittanceStatus }) {
  const [inputValue, setInputValue] = useState("");
  const { showNotification } = useNotification();

  const handleButtonClick = (value) => {
    if (inputValue.length < 8) {
      setInputValue((prevValue) => prevValue + value);
    } else {
      showNotification("This field only accepts 8 numbers.");
    }
  };

  const handleDeleteClick = () => {
    setInputValue((prevValue) => prevValue.slice(0, -1));
  };

  const handleEnterClick = () => {
    if (inputValue) {
      updateRemittanceStatus(inputValue);
    }
  };

  const handleKeyDown = (event) => {
    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
      showNotification("This field only accepts numbers.");
    }

    if (inputValue.length >= 8 && event.key !== "Backspace") {
      event.preventDefault();
      showNotification("This field only accepts 8 numbers.");
    }
  };

  const buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons.push(
      <CircleButton
        key={i}
        value={i.toString()}
        onClick={() => handleButtonClick(i.toString())}
      />
    );
  }

  return (
    <div className={`${styles.searchCalculatorContainer}`}>
      <SectionHeader />
      <div className={`${styles.searchCalculator}`}>
        <div className={`${styles.inputSearchCalculator}`}>
          <Input
            inputSuffix="|**"
            textAlign="center"
            value={inputValue}
            onKeyDown={handleKeyDown}
            readOnly={true} // Prevent direct input
          />
        </div>
        <div className={styles.horizontalCapsuleWrapper}>
          <div className={styles.verticalCapsuleWrapper}>
            <div className={`${styles.oneToNineButtons}`}>{buttons}</div>
            <div className={styles.horizontalCapsuleWrapper}>
              <CapsuleButton
                direction="horizontal"
                value="0"
                onClick={() => handleButtonClick("0")}
              />
              <CircleButton value="." onClick={() => handleButtonClick(".")} />
            </div>
          </div>
          <div className={styles.verticalCapsuleWrapper}>
            <CapsuleButton
              direction="vertical"
              deleteIcon
              onClick={handleDeleteClick}
            />
            <CapsuleButton
              direction="vertical"
              enter
              enterIcon
              onClick={handleEnterClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCalculator;
