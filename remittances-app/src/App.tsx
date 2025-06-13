import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Calculator from "./components/Calculator";
import RemittanceList from "./components/RemittanceList";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import RemittanceHeader from "./components/RemittanceHeader";

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (index: number) => {
    if (index === 1) {
      setExpanded((e) => !e);
    } else {
      setExpanded(false);
    }
    setSelectedIndex(index);
    setDrawerOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar
        selectedIndex={selectedIndex}
        onNavClick={handleNavClick}
        drawerOpen={drawerOpen}
        onDrawerToggle={() => setDrawerOpen((o) => !o)}
      />

      <div
        className={`
          hidden md:block absolute top-0 left-20 h-full bg-gray-800
          w-1/2 max-w-lg
          transform transition-transform duration-300 ease-in-out
          ${expanded ? "translate-x-0" : "-translate-x-full"}
          z-10
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl md:text-md text-white">
            Ventanilla <strong>Digital</strong>
          </h1>
        </div>
        <hr className="w-5/6 mx-auto  border-blue-400 my-2" />

        <button
          onClick={() => handleNavClick(1)}
          className="absolute top-18 left-2 w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center focus:outline-none "
          aria-label="Cerrar calculadora"
        >
          <p>{"<"}</p>
        </button>

        <div className="p-6">
          <h1 className="text-2xl md:text-md text-blue-400">Remesas</h1>
        </div>

        <div className="pl-12 pr-12">
          <Calculator />
        </div>
      </div>

      <div
        className={`
          flex-1 p-4 md:p-6 overflow-y-auto
          transition-all duration-300 ease-in-out
          ${expanded ? "md:ml-[calc(5rem+28rem)]" : "md:ml-0"}
        `}
      >
        <RemittanceHeader onDrawerToggle={() => setDrawerOpen((o) => !o)} />

        <div className="mb-4 flex space-x-2">
          <ErrorMessage />
        </div>
        <RemittanceList />
        <Pagination />
      </div>

      {expanded && (
        <div
          className={`
            fixed inset-x-0 bottom-0 z-20 md:hidden
            bg-gray-800 rounded-t-2xl p-6
            transform transition-transform duration-300 ease-out
            ${expanded ? "translate-y-0" : "translate-y-full"}
          `}
        >
          <div className="w-12 h-1.5 bg-gray-600 rounded mx-auto mb-4" />
          <h2 className="text-xl text-white mb-4">Remesas</h2>
          <div className="overflow-auto max-h-[60vh]">
            <Calculator />
          </div>

          <button
            onClick={() => handleNavClick(1)}
            className="absolute top-4 right-4 w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center focus:outline-none"
            aria-label="Cerrar calculadora"
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}
