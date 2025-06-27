import React from "react";
import Calculator from "./Calculator";
import { useUIStore } from "../store/useUIStore";

const RemittancePanel: React.FC = () => {
  const expanded = useUIStore((s) => s.expanded);
  const navClick = useUIStore((s) => s.navClick);

  const desktopClasses = expanded
    ? "hidden md:block absolute top-0 left-20 h-full bg-[#2a2a2a] translate-x-0 w-[min(40vw,20rem)] md:w-[min(45vw,24rem)] lg:w-[min(35vw,28rem)] xl:w-[min(30vw,32rem)] transform transition-transform duration-300 ease-in-out z-10"
    : "hidden md:block absolute top-0 left-20 h-full bg-[#2a2a2a] -translate-x-full transform transition-transform duration-300 ease-in-out z-10";

  const mobileClasses = expanded
    ? "fixed inset-x-0 bottom-0 z-20 md:hidden bg-[#2a2a2a] rounded-t-2xl p-6 translate-y-0 transform transition-transform duration-300 ease-out"
    : "fixed inset-x-0 bottom-0 z-20 md:hidden bg-[#2a2a2a] rounded-t-2xl p-6 translate-y-full transform transition-transform duration-300 ease-out";

  return (
    <>
      {/* Desktop */}
      <div className={desktopClasses}>
        <div className="p-4 lg:p-6">
          <h1 className="text-lg lg:text-2xl text-white">
            Ventanilla <strong>Digital</strong>
          </h1>
        </div>
        <hr className="w-5/6 mx-auto border-[#00cfdd] my-2" />
        <button
          onClick={() => navClick(1)}
          aria-label="Cerrar calculadora"
          className="absolute top-16 lg:top-18 left-2 w-8 h-8 bg-[#00cfdd] text-white rounded-full flex items-center justify-center focus:outline-none hover:bg-[#00b8c4] transition-colors"
        >
          <span className="text-sm">{"<"}</span>
        </button>
        <div className="p-4 lg:p-6">
          <h1 className="text-lg lg:text-2xl text-[#00cfdd]">Remesas</h1>
        </div>
        <div className="px-3 md:px-6 lg:px-8 xl:px-12 pb-4">
          <Calculator />
        </div>
      </div>

      {/* Mobile */}
      <div className={mobileClasses}>
        {expanded && (
          <>
            <div className="w-12 h-1.5 bg-gray-600 rounded mx-auto mb-4" />
            <h2 className="text-xl text-[#00cfdd] mb-4">Remesas</h2>
            <div className="overflow-auto max-h-[60vh]">
              <Calculator />
            </div>
            <button
              onClick={() => navClick(1)}
              aria-label="Cerrar calculadora"
              className="absolute top-4 right-4 w-8 h-8 bg-[#00cfdd] text-white rounded-full flex items-center justify-center focus:outline-none hover:bg-[#00b8c4] transition-colors"
            >
              ×
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RemittancePanel;
