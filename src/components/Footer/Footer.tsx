import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Button } from "../Button/Button";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const [showFooter, setShowFooter] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowFooter(false);
    }, 5000);
  }, []);

  const handleClose = () => {
    setShowFooter(false);
  };

  return (
    <div>
      {showFooter && (
        <div className="fixed w-[280px] bg-gray-800 bottom-0 left-[50%] translate-x-[-50%] h-[100px] flex flex-col items-center justify-center rounded-t-lg">
          <b>Developed by</b>
          <img src={logo} className="w-[80%]" />
          <Button
            icon={faCircleXmark}
            textColor="text-red-500"
            bgColor="bg-white"
            className="absolute top-[-10px] right-[-10px]"
            width="w-6"
            height="h-6"
            onClick={handleClose}
          />
        </div>
      )}
    </div>
  );
}

export default Footer;
