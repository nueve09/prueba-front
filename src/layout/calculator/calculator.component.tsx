import { useState, type FC } from "react";
import { FaBackspace } from "react-icons/fa";
import { FaArrowTurnUp } from "react-icons/fa6";

import "./Calculator.css";

type CalculatorButton = {
  children: React.ReactNode;
  value: string;
  area?: string;
  className?: string;
};

const buttons: CalculatorButton[][] = [
  [
    { children: "1", value: "1" },
    { children: "2", value: "2" },
    { children: "3", value: "3" },
    {
      children: <FaBackspace />,
      value: "backspace",
      area: "backspace",
    },
  ],
  [
    { children: "4", value: "4" },
    { children: "5", value: "5" },
    { children: "6", value: "6" },
  ],
  [
    { children: "7", value: "7" },
    { children: "8", value: "8" },
    { children: "9", value: "9" },
    {
      children: (
        <FaArrowTurnUp style={{ transform: "rotate(90deg) rotateX(180deg)" }} />
      ),
      value: "enter",
      area: "enter",
      className: "calculator__button--enter",
    },
  ],
  [
    { children: "0", value: "0" },
    {
      children: ".",
      value: ".",
      area: "dot",
    },
  ],
];

const Calculator: FC = () => {
  const [display, setDisplay] = useState("");

  const handleClick = (value: string) => {
    if (value === "backspace") {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay(display + value);
    }
  };

  const handleEnter = () => {
    console.log("Entered value:", display);

    setDisplay(""); // Clear display after entering
  };

  return (
    <div className="calculator">
      <h4 className="calculator__title">
        Ventanilla <b>Digital</b>
      </h4>
      <hr />
      <h3 className="calculator__subtitle">Remesas</h3>
      <div className="calculator__display">
        <input
          type="text"
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
          className="calculator__input"
          placeholder="0"
        />
      </div>
      <div className="calculator__buttons">
        {buttons.flat().map((btn, index) => (
          <button
            key={`calculator-btn-${index}`}
            className={`calculator__button ${btn.className || ""}`}
            style={{ gridArea: btn.area ? btn.area : `b${btn.value}` }}
            onClick={() => handleClick(btn.value)}
          >
            {btn.children}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
