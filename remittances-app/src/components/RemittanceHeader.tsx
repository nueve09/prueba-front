import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faKeyboard,
  faPrint,
  faFilter,
  faSearch,
  faChevronDown,
  faCircleUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRemittanceStore } from "../store/useRemittanceStore";
import SearchBar from "./SearchBar";

interface RemittanceHeaderProps {
  onDrawerToggle: () => void;
}

export default function RemittanceHeader({
  onDrawerToggle,
}: RemittanceHeaderProps) {
  const [open, setOpen] = useState(false);
  const setFilter = useRemittanceStore((s) => s.setFilter);
  const clearFilter = useRemittanceStore((s) => s.clearFilter);
  const [showSearch, setShowSearch] = useState(false);

  const applyFilter = (
    type: "amount_desc" | "amount_asc" | "date_asc" | "date_desc" | null
  ) => {
    if (type) setFilter(type);
    else clearFilter();
    setOpen(false);
  };

  const getDay = () => {
    const today = new Date();
    const getFullYear = today.getFullYear();
    const getMonth = today.getMonth() + 1;
    const getDay = today.getDate();
    return `${getDay} de ${getMonth} de ${getFullYear}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="mb-4">
      <div className="flex justify-between md:justify-end-safe items-center mb-2">
        <button
          className="md:hidden"
          onClick={onDrawerToggle}
          aria-label="Abrir menú"
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl text-gray-700" />
        </button>
        <div className="flex items-center gap-4">
          <div className="relative pr-4">
            <FontAwesomeIcon icon={faBell} className="text-xl text-gray-600" />
            <span className="absolute top-0 right-4 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </div>

          <FontAwesomeIcon
            icon={faCircleUser}
            className="rounded-full object-cover"
            size="2x"
          />

          <button className="flex items-center gap-1 text-gray-800 font-semibold">
            Juan Pérez
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-blue-600">Hoy</h2>
          <p className="text-md font-bold">{getDay()}</p>
        </div>

        <button className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
          <FontAwesomeIcon icon={faKeyboard} className="text-blue-400" />
        </button>
      </div>

      <div className="flex justify-end-safe items-center">
        <div className="relative overflow-hidden h-12 mb-4">
          <div
            className={
              "h-full w-full  " +
              (showSearch ? "translate-x-0" : "translate-x-full") +
              " transition-transform duration-300 ease-in-out"
            }
          >
            <SearchBar />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSearch((s) => !s)}
            className="border-4 border-blue-300 text-blue-500 px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="border-4 border-blue-300 text-blue-500 px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
          {open && (
            <div className="absolute right-20 mt-6 w-44 bg-white border-gray-400 rounded shadow-lg p-2 z-30">
              <button
                onClick={() => applyFilter("amount_desc")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-gray-500"
              >
                Mayor monto
              </button>
              <button
                onClick={() => applyFilter("amount_asc")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100  text-gray-500"
              >
                Menor monto
              </button>
              <button
                onClick={() => applyFilter("date_asc")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100  text-gray-500"
              >
                Más antigua
              </button>
              <button
                onClick={() => applyFilter("date_desc")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-100  text-gray-500"
              >
                Más reciente
              </button>
              <hr className="my-2" />
              <button
                onClick={() => applyFilter(null)}
                className="block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-100"
              >
                Borrar filtros
              </button>
            </div>
          )}

          <button
            onClick={handlePrint}
            className="border-4 border-blue-300 text-blue-500 px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      </div>
    </header>
  );
}
