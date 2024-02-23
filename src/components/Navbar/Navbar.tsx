import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../../assets/images/nueve09.png";
import {
  faHouse,
  faHandHoldingDollar,
  faIdCard,
  faFileCirclePlus,
  faShare,
  faSquarePollVertical,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navbar() {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  const handleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div
      className={`bg-[#353535] justify-between px-10 flex items-center w-full h-[60px] relative md:px-2 md:flex-col md:py-6 md:h-dvh ${showNavbar ? "md:w-20" : "md:w-0 md:!p-0 bg-[#2b595f]"}`}
    >
      <div
        className={`h-7 w-7 bg-[#54cedf] rounded-full flex justify-center items-center absolute top-[115px] hidden right-[-12px] cursor-pointer md:flex ${showNavbar ? "right-[-12px]" : "left-[-8px]"}`}
        onClick={handleNavbar}
      >
        <FontAwesomeIcon
          icon={showNavbar ? faChevronLeft : faChevronRight}
          className="text-[#ffffff]"
        />
      </div>

      <div className={`contents	${showNavbar ? "" : "md:hidden"}`}>
        <img
          src={logo}
          alt="logo"
          className="rounded-xl p-1 w-[50px] md:w-[90px] md:rounded-2xl"
        />
        <div className="flex w-full justify-between pl-10 md:flex-col md:mt-12 md:w-20 md:pl-0 md:text-center">
          <Link to="/home" onClick={() => setSelectedOption(0)}>
            <FontAwesomeIcon
              icon={faHouse}
              size="2xl"
              className={
                selectedOption === 0
                  ? "text-[#4eb2c0]"
                  : "text-[#ffffff] hover:text-[#4eb2c0]"
              }
            />
          </Link>
          <Link
            to="/remittances"
            className="md:mt-16"
            onClick={() => setSelectedOption(1)}
          >
            <FontAwesomeIcon
              icon={faHandHoldingDollar}
              size="2xl"
              className={
                selectedOption === 1
                  ? "text-[#4eb2c0]"
                  : "text-[#ffffff] hover:text-[#4eb2c0]"
              }
            />
          </Link>
          <Link
            to="/module3"
            className="md:mt-16"
            onClick={() => setSelectedOption(2)}
          >
            <FontAwesomeIcon
              icon={faIdCard}
              size="2xl"
              className={
                selectedOption === 2
                  ? "text-[#4eb2c0]"
                  : "text-[#ffffff] hover:text-[#4eb2c0]"
              }
            />
          </Link>
          <Link
            to="/module4"
            className="md:mt-16"
            onClick={() => setSelectedOption(3)}
          >
            <FontAwesomeIcon
              icon={faFileCirclePlus}
              size="2xl"
              className={
                selectedOption === 3
                  ? "text-[#4eb2c0]"
                  : "text-[#ffffff] hover:text-[#4eb2c0]"
              }
            />
          </Link>
          <Link
            to="/module5"
            className="md:mt-16"
            onClick={() => setSelectedOption(4)}
          >
            <FontAwesomeIcon
              icon={faShare}
              size="2xl"
              className={
                selectedOption === 4
                  ? "text-[#4eb2c0]"
                  : "text-[#ffffff] hover:text-[#4eb2c0]"
              }
            />
          </Link>
          <Link
            to="/module6"
            className="md:mt-16"
            onClick={() => setSelectedOption(5)}
          >
            <FontAwesomeIcon
              icon={faSquarePollVertical}
              size="2xl"
              className={
                selectedOption === 5
                  ? "text-[#4eb2c0]"
                  : "text-[#ffffff] hover:text-[#4eb2c0]"
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
