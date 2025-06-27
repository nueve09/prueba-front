import { useState, useCallback } from "react";
import { useRemittanceStore } from "../store/useRemittanceStore";

const MAX_LENGTH = 8;

const isValidValue = (val: string) => {
  if (!/^\d*\.?\d*$/.test(val)) return false;
  if ((val.match(/\./g) || []).length > 1) return false;
  if (val.length > MAX_LENGTH) return false;
  return true;
};

export default function Calculator() {
  const [input, setInput] = useState("");
  const chargeRemesa = useRemittanceStore((s) => s.chargeRemesa);
  const clearError = useRemittanceStore((s) => s.clearError);

  const updateInput = useCallback(
    (newVal: string) => {
      if (isValidValue(newVal)) {
        setInput(newVal);
      }
    },
    [setInput]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    updateInput(e.target.value);
  };

  const handleBack = () => {
    clearError();
    setInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!input) return;
    chargeRemesa(input);
    setInput("");
  };

  const handleButtonClick = (key: string) => {
    clearError();
    updateInput(input + key);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "."],
  ];

  return (
    <div className="bg-[#2a2a2a] text-white p-4 rounded-lg">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-gray-100 text-black rounded p-2 mb-4 text-2xl font-mono text-center w-full outline-none"
        inputMode="decimal"
        maxLength={MAX_LENGTH}
      />

      <div className="grid grid-cols-4 grid-rows-4 gap-2  ">
        <button
          onClick={handleBack}
          className="
            bg-gray-100 text-black font-bold
            row-start-1 col-start-4 row-span-2
            rounded-full max-w-[56px] sm:max-w-[72px] md:max-w-[96px]
            flex items-center justify-center text-4xl
          "
        >
          ⌫
        </button>

        {buttons.flatMap((row, rowIndex) =>
          row.map((key) => {
            const isZeroButton = key === "0";
            const spanClass = isZeroButton
              ? "col-span-2 rounded-full"
              : "aspect-square rounded-full max-w-[56px] sm:max-w-[72px] md:max-w-[96px]";
            return (
              <button
                key={key}
                onClick={() => handleButtonClick(key)}
                className={`bg-gray-200 text-black text-3xl font-bold ${spanClass}`}
                style={{
                  gridColumn:
                    rowIndex === 3 && isZeroButton ? "1 / span 2" : undefined,
                }}
              >
                {key}
              </button>
            );
          })
        )}

        <button
          onClick={handleSubmit}
          className="
            bg-[#00289e] text-white font-bold
            row-start-3 col-start-4 row-span-2
            rounded-full max-w-[56px] sm:max-w-[72px] md:max-w-[96px]
            flex items-center justify-center text-4xl
          "
        >
          ↵
        </button>
      </div>
    </div>
  );
}
