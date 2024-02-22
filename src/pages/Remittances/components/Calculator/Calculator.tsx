import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { useAppSelector } from "../../../../redux/hooks";
import {
  faDeleteLeft,
  faArrowTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { useCalculatorActions } from "./useCalculatorActions";
import { useSystemNotification } from "../../../../hooks/useSystemNotification";
import { remittances } from "../../../../data/remittances";
import { findElement } from "../../../../utils/arraysUtils";

function Calculator() {
  const { remittanceId } = useAppSelector((state) => state.remittances);

  const { displayNotification } = useSystemNotification();

  const {
    changeRemittanceId,
    changeByButtonRemittanceId,
    removeLastChart,
    findRemittance,
  } = useCalculatorActions();

  const enter = () => {
    findRemittance(remittanceId);
    const remittence = findElement(remittances, +remittanceId);
    if (remittanceId.length === 8) {
      if (remittence?.status === "NO_COBRADO") {
        displayNotification({
          message: "La remesa se cobro correctamente y se agrego a la lista",
        });
      } else if (remittence === undefined) {
        displayNotification({ message: "La remesa no existe", type: "error" });
      } else {
        displayNotification({
          message: "Esta remesa ya ha sido cobrada correctamente",
          type: "warning",
        });
      }
    } else {
      displayNotification({ message: "La remesa no existe", type: "error" });
    }
  };

  return (
    <div className="px-6 max-w-[480px] m-auto">
      <Input
        calculatorInput={true}
        value={remittanceId}
        onChange={changeRemittanceId}
      />
      <div className="grid grid-cols-4 gap-6 mt-12">
        <Button
          label="1"
          onClick={() => changeByButtonRemittanceId("1")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <Button
          label="2"
          onClick={() => changeByButtonRemittanceId("2")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <Button
          label="3"
          onClick={() => changeByButtonRemittanceId("3")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <div className="row-span-2">
          <Button
            icon={faDeleteLeft}
            span="row"
            onClick={removeLastChart}
            width="w-16 lg:w-24"
          />
        </div>
        <Button
          label="4"
          onClick={() => changeByButtonRemittanceId("4")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <Button
          label="5"
          onClick={() => changeByButtonRemittanceId("5")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <Button
          label="6"
          onClick={() => changeByButtonRemittanceId("6")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <Button
          label="7"
          onClick={() => changeByButtonRemittanceId("7")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <Button
          label="8"
          onClick={() => changeByButtonRemittanceId("8")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <Button
          label="9"
          onClick={() => changeByButtonRemittanceId("9")}
          width="w-16 lg:w-24"
          height="h-16 lg:h-24"
        />
        <div className="row-span-2">
          <Button
            icon={faArrowTurnDown}
            span="row"
            rotate90={true}
            bgColor="bg-[#00289E]"
            textColor="text-[#ffffff]"
            onClick={() => enter()}
            width="w-16 lg:w-24"
          />
        </div>
        <div className="col-span-2">
          <Button
            label="0"
            span="col"
            onClick={() => changeByButtonRemittanceId("0")}
            height="h-16"
          />
        </div>
        <Button label="." width="w-16 lg:w-24" height="h-16 lg:h-24" />
      </div>
    </div>
  );
}

export default Calculator;
