import React from "react";
import "../styles/BaseContainer.css";
import { Sidebar } from "./Sidebar";

export { BaseContainer };

interface BaseContainerProps {
  children: React.ReactNode;
  isCalculatorVisible?: boolean;
  onToggleCalculator?: () => void;
}

function BaseContainer({
  children,
  isCalculatorVisible,
  onToggleCalculator,
}: BaseContainerProps): React.ReactElement {
  return (
    <div className="base-container">
      <Sidebar
        isCalculatorVisible={isCalculatorVisible}
        onToggleCalculator={onToggleCalculator}
      />
      <main className="main-content">{children}</main>
    </div>
  );
}
