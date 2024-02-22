import { ModuleHeader } from "../../components/ModuleHeader/ModuleHeader";
import Calculator from "./components/Calculator/Calculator";
import Settings from "../../components/Settings/Settings";
import RemittancesTools from "./components/RemittancesTools/RemittancesTools";
import RemittancesList from "./components/RemittancesList/RemittancesList";
import { useState } from "react";
import SearchTools from "./components/SearchTools/SearchTools";
import TitleKeyboard from "./components/TitleKeyboard/TitleKeyboard";
import { Button } from "../../components/Button/Button";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useSearchToolsActions } from "./components/SearchTools/useSearchToolsActions";

function Remittances() {
  const { restoreList } = useSearchToolsActions();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const pullSelectedOption = (type: string) => {
    setSelectedOption(type);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full">
      <div className="order-last">
        <ModuleHeader title="Remesas" />
        <Calculator />
      </div>
      <div className="flex flex-col bg-white text-black px-6 py-4 md:order-last">
        <Settings />
        <TitleKeyboard />
        {selectedOption === "" ? (
          <RemittancesTools searchTool={pullSelectedOption} />
        ) : (
          <>
            <div className="grid grid-cols-[60px_auto] my-2 max-h-14">
              <div className="flex items-end">
                <Button
                  icon={faCircleXmark}
                  textColor="text-red-500"
                  onClick={() => {
                    setSelectedOption("");
                    restoreList();
                  }}
                />
              </div>
              {selectedOption === "search" ? <SearchTools /> : null}
            </div>
          </>
        )}

        <RemittancesList />
      </div>
    </div>
  );
}

export default Remittances;
