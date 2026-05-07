import React from "react";
import "../styles/Sidebar.css";

export { Sidebar };

interface SidebarProps {
  isCalculatorVisible?: boolean;
  onToggleCalculator?: () => void;
}

function Sidebar({
  isCalculatorVisible = true,
  onToggleCalculator,
}: SidebarProps): React.ReactElement {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo-container">
        <div className="sidebar-logo">
          <span className="logo-text">n09</span>
        </div>

        {onToggleCalculator && (
          <button
            className="toggle-calc-btn"
            onClick={onToggleCalculator}
            title={
              isCalculatorVisible
                ? "Ocultar calculadora"
                : "Mostrar calculadora"
            }
          >
            <i
              className={`fa-solid fa-chevron-${isCalculatorVisible ? "left" : "right"}`}
            ></i>
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item">
          <i className="fa-solid fa-house"></i>
        </button>
        <button className="nav-item active">
          <i className="fa-solid fa-money-bill-transfer"></i>
        </button>
        <button className="nav-item">
          <i className="fa-solid fa-credit-card"></i>
        </button>
        <button className="nav-item">
          <i className="fa-solid fa-file-invoice-dollar"></i>
        </button>
        <button className="nav-item">
          <i className="fa-solid fa-clock-rotate-left"></i>
        </button>
        <button className="nav-item">
          <i className="fa-solid fa-chart-simple"></i>
        </button>
      </nav>
    </aside>
  );
}
