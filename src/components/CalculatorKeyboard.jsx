import { useState } from "react";
import { DeleteIcon, EnterIcon } from "../Icons/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchString } from "../store/slices/filter.slice";

const CalculatorKeyboard = ({setSearchString}) => {
  const [inputCalculator, setInputCalculator] = useState("");
  const filter = useSelector((store) => store.filter.se);
  const handleControlledInput = (e) => {
    setInputCalculator(e.target.value);
    setSearchString(e.target.value)
  };
  const handleButton = (keyValue) => {
    setInputCalculator(inputCalculator + keyValue);
    setSearchString(inputCalculator + keyValue)
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.searchValue.value
    setSearchString(searchValue)

  }
  return (
    <section className="bg-secondary-gray sm:h-screen min-h-min sm:w-[40%] w-full min-w-[340px] sm:pb-0 pb-8">
      <div className="pr-3 pl-6 mt-4">
        <span className="text-white text-xl block mb-3">
          Ventanilla <b>Digital</b>
        </span>
        <h2 className="text-primary-blue text-2xl font-semibold border-primary-blue border-t-[1px] pt-3">
          Remesas
        </h2>
      </div>
      <form className="w-[70%] mx-auto px-2" onSubmit={handleSubmit}>
        <div className="flex flex-row my-8 bg-white rounded-lg pt-2 pb-3 pl-3 text-3xl font-bold">
          <span className="align-top block">|</span>
          <span className="translate-y-1/4">**</span>
          <input
            className="w-full ml-2"
            type="text"
            value={inputCalculator}
            name="searchValue"
            onChange={(e) => handleControlledInput(e)}
            autoComplete="off"
          />
        </div>
        <div className="[&>button]:bg-white [&>button]:rounded-full text-3xl font-bold grid gap-5 grid-cols-[repeat(4,min-content)] justify-center">
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("1");
            }}
          >
            1
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("2");
            }}
          >
            2
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("3");
            }}
          >
            3
          </button>
          <button
            className="row-span-2"
            type="button"
            onClick={() => {
              setInputCalculator(inputCalculator.slice(0, -1));
              setSearchString(inputCalculator.slice(0, -1));
            }}
          >
            <div className="bg-white rounded-full w-16 h-full grid place-items-center">
              <DeleteIcon />
            </div>
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("4");
            }}
          >
            4
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("5");
            }}
          >
            5
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("6");
            }}
          >
            6
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("7");
            }}
          >
            7
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("8");
            }}
          >
            8
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton("9");
            }}
          >
            9
          </button>
          <button className="row-span-2" type="button">
            <div className="bg-secondary-blue text-white rounded-full w-16 h-full grid place-items-center">
              <EnterIcon />
            </div>
          </button>
          <button className="col-span-2" type="button">
            <div
              className="bg-white rounded-full w-full h-16 grid place-items-center"
              onClick={() => {
                handleButton("0");
              }}
            >
              0
            </div>
          </button>
          <button
            className="aspect-square h-16"
            type="button"
            onClick={() => {
              handleButton(".");
            }}
          >
            .
          </button>
        </div>
      </form>
    </section>
  );
};
export default CalculatorKeyboard;
