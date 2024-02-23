import { Button } from "../../../../components/Button/Button";
import {
  faMagnifyingGlass,
  faSliders,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

function RemittancesTools(props: { searchTool: (type: string) => void }) {
  const handleSelectedOption = (type: string) => {
    props.searchTool(type);
  };

  return (
    <div className="flex justify-end items-center mt-6">
      <Button
        type="square"
        icon={faMagnifyingGlass}
        textColor="text-[#00289E]"
        borderColor="border-[#CED2EF]"
        iconSize="xs"
        width="w-10"
        height="h-10"
        onClick={() => handleSelectedOption("search")}
      />
      <Button
        type="square"
        icon={faSliders}
        textColor="text-[#00289E]"
        borderColor="border-[#CED2EF]"
        iconSize="xs"
        className="ml-3.5"
        width="w-10"
        height="h-10"
        onClick={() => handleSelectedOption("")}
      />
      <Button
        type="square"
        icon={faPrint}
        textColor="text-[#00289E]"
        borderColor="border-[#CED2EF]"
        iconSize="xs"
        className="ml-3.5"
        width="w-10"
        height="h-10"
        onClick={() => handleSelectedOption("")}
      />
    </div>
  );
}

export default RemittancesTools;
