import { useState } from "react";
import { useRemittanceStore } from "../store/useRemittanceStore";

export default function Calculator() {
  const [input, setInput] = useState("");
  const chargeRemesa = useRemittanceStore((s) => s.chargeRemesa);
  const clearError = useRemittanceStore((s) => s.clearError);

  const handleClick = (key: string) => {
    clearError();
    if (key === ".") {
      if (input.includes(".")) return;
      setInput((p) => p + key);
    } else {
      if (input.length >= 8) return;
      setInput((p) => p + key);
    }
  };

  const handleBack = () => {
    clearError();
    setInput((p) => p.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!input) return;
    chargeRemesa(input);
    setInput("");
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <div className="bg-gray-100 text-black rounded p-2 mb-4 text-2xl font-mono text-right">
        {input || "0"}
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-2">
        <button
          onClick={handleBack}
          className="
            bg-gray-100 text-black 
            row-start-1 col-start-4 row-span-2
            rounded-full flex items-center justify-center text-4xl
          "
        >
          ⌫
        </button>

        <button
          onClick={() => handleClick("1")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          1
        </button>
        <button
          onClick={() => handleClick("2")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          2
        </button>
        <button
          onClick={() => handleClick("3")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          3
        </button>

        <button
          onClick={() => handleClick("4")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          4
        </button>
        <button
          onClick={() => handleClick("5")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          5
        </button>
        <button
          onClick={() => handleClick("6")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          6
        </button>

        <button
          onClick={() => handleClick("7")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          7
        </button>
        <button
          onClick={() => handleClick("8")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          8
        </button>
        <button
          onClick={() => handleClick("9")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          9
        </button>

        <button
          onClick={handleSubmit}
          className="
            bg-blue-600 text-white 
            row-start-3 col-start-4 row-span-2
            rounded-full flex items-center justify-center text-4xl
          "
        >
          ↵
        </button>

        <button
          onClick={() => handleClick("0")}
          className="bg-gray-200 text-black text-xl col-span-2 rounded-full py-4"
        >
          0
        </button>
        <button
          onClick={() => handleClick(".")}
          className="bg-gray-200 text-black text-xl aspect-square rounded-full"
        >
          .
        </button>
      </div>
    </div>
  );
}
