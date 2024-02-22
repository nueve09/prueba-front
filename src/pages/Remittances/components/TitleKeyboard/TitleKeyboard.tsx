import { faKeyboard } from "@fortawesome/free-regular-svg-icons/faKeyboard";
import { Button } from "../../../../components/Button/Button";
import { getTodayHuman } from "../../../../utils/dateTime";

function TitleKeyboard() {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl text-[#00289e]">Hoy</h1>
        <span className="font-bold text-base">{getTodayHuman()}</span>
      </div>
      <Button
        icon={faKeyboard}
        bgColor="bg-[#00289E]"
        textColor="text-[#00CFDD]"
        iconSize="sm"
        width="w-16"
        height="h-16"
      />
    </div>
  );
}

export default TitleKeyboard;
