import { useState } from "react";

import "../styles/Calculator.css";
import { useRemesas } from "../../../stores/RemesasContext";
import { useNotification } from "../../../stores/NotificationContext";
import { CustomButton } from "../../../components/common/CustomButton";

export { Calculator };

function Calculator(): React.ReactElement {
  const [inputValue, setInputValue] = useState("");
  const { remesas, cobrarRemesa } = useRemesas();
  const { showNotification } = useNotification();

  const handleKeyPress = (val: string) => {
    if (inputValue.length < 8) {
      setInputValue((prev) => prev + val);
    }
  };

  const handleBackspace = () => {
    setInputValue((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    if (inputValue.trim() === "") return;

    const remesa = remesas.find((r) => r.id === inputValue);

    if (!remesa) {
      showNotification(
        "El ID ingresado no corresponde a ninguna remesa.",
        "error",
      );
      return;
    }

    if (remesa.status === "COBRADO") {
      showNotification(
        `La remesa #${inputValue} ya ha sido cobrada anteriormente.`,
        "alert",
      );
      return;
    }

    cobrarRemesa(inputValue);
    showNotification(
      `La remesa #${inputValue} se cobró exitosamente`,
      "success",
    );
    setInputValue("");
  };

  const padButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <section className="calculator-section">
      <header>
        <p className="subtitle">
          Ventanilla <strong>Digital</strong>
        </p>
        <h1 className="title">Remesas</h1>
      </header>

      <div className="calc-display">
        <span className="cursor-text">|**</span>
        <span className="value-text">{inputValue}</span>
      </div>

      <div className="calc-grid">
        {padButtons.map((num) => (
          <CustomButton
            key={num}
            variant="secondary"
            size="calc"
            onClick={() => handleKeyPress(num)}
          >
            {num}
          </CustomButton>
        ))}

        <CustomButton
          variant="secondary"
          size="calc"
          className="btn-zero"
          onClick={() => handleKeyPress("0")}
        >
          0
        </CustomButton>
        <CustomButton
          variant="secondary"
          size="calc"
          onClick={() => handleKeyPress(".")}
        >
          .
        </CustomButton>

        <CustomButton
          variant="ghost"
          size="calc"
          className="btn-backspace"
          onClick={handleBackspace}
        >
          <i className="fa-solid fa-delete-left"></i>
        </CustomButton>

        <CustomButton
          variant="primary"
          size="calc"
          className="btn-enter"
          onClick={handleEnter}
        >
          <i className="fa-solid fa-arrow-turn-down fa-rotate-90"></i>
        </CustomButton>
      </div>
    </section>
  );
}
