import { createContext, useContext, useEffect, useState } from "react";
import type { Remesas } from "../types/identity";
import { INITIAL_DATA } from "../utils/mockRemesas";

export { RemesasProvider, useRemesas };

interface RemesasContextProps {
  remesas: Remesas[];
  cobrarRemesa: (id: string) => void;
}

const RemesasContext = createContext<RemesasContextProps | undefined>(
  undefined,
);

function RemesasProvider({ children }: { children: React.ReactNode }) {
  const [remesas, setRemesas] = useState<Remesas[]>(() => {
    const storedRemesas = localStorage.getItem("remesas");
    return storedRemesas ? JSON.parse(storedRemesas) : INITIAL_DATA;
  });

  useEffect(() => {
    localStorage.setItem("remesas", JSON.stringify(remesas));
  }, [remesas]);

  function cobrarRemesa(id: string) {
    setRemesas((prev) =>
      prev.map((remesa) => {
        if (remesa.id === id) {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, "0");
          const day = String(today.getDate()).padStart(2, "0");
          const formattedDate = `${year}${month}${day}`;

          return {
            ...remesa,
            status: "COBRADO",
            charget_at: formattedDate,
          };
        }
        return remesa;
      }),
    );
  }

  return (
    <RemesasContext.Provider value={{ remesas, cobrarRemesa }}>
      {children}
    </RemesasContext.Provider>
  );
}

function useRemesas() {
  const context = useContext(RemesasContext);
  if (!context) {
    throw new Error("useRemesas debe ser usado dentro de un RemesasProvider");
  }
  return context;
}
