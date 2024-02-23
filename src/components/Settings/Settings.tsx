import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/images/user.jpeg";

function Settings() {
  return (
    <div className="flex justify-end">
      <div className="rounded-full w-12 h-12 bg-[#e8e8e8] flex justify-center items-center relative cursor-pointer">
        <FontAwesomeIcon icon={faBell} size="lg" />
        <div className="bg-red-700 rounded-full w-3.5 h-3.5 text-[8px] flex justify-center items-center text-white absolute top-[12px] right-[12px]">
          <b>1</b>
        </div>
      </div>
      <img
        src={user}
        alt="User picture"
        className="ml-6 rounded-full w-12 h-12 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
      />
      <div className="flex items-center ml-6 cursor-pointer">
        <div className="flex flex-col">
          <span className="text-sm">Juan Alberto</span>
          <span className="text-xs">
            <b>Operador</b>
          </span>
        </div>
        <FontAwesomeIcon icon={faChevronDown} size="xs" className="ml-3" />
      </div>
    </div>
  );
}

export default Settings;
