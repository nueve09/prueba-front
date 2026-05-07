import React, { useState } from "react";
import "../styles/Home.css";
import { BaseContainer } from "../../../components/common/BaseContainer";
import { Calculator } from "../../Calculator/components/Calculator";
import { RemesasTable } from "../../Remesas/components/RemesasTable";

export { Home };

function Home(): React.ReactElement {
  const [showCalculator, setShowCalculator] = useState(true);

  const handleToggleCalc = () => {
    setShowCalculator((prev) => !prev);
  };

  return (
    <BaseContainer
      isCalculatorVisible={showCalculator}
      onToggleCalculator={handleToggleCalc}
    >
      <div className={`dashboard-grid ${!showCalculator ? "hide-calc" : ""}`}>
        <div className="calculator-wrapper">
          <Calculator />
        </div>

        <RemesasTable
          isCalculatorVisible={showCalculator}
          onToggleCalculator={handleToggleCalc}
        />
      </div>
    </BaseContainer>
  );
}
