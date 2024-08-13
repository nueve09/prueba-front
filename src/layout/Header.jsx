import { useState } from "react";
import PrintIcon, {
  ArrowDownIcon,
  BellIcon,
  FilterIcon,
  KeyboardShowIcon,
  SearchIcon,
} from "../Icons/Svgs";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/slices/filter.slice";

const Header = ({setFilter}) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const toggleFilter = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };
  // const dispatch = useDispatch();
  const handleSelectedFilter = (e) => {
    setFilter(e.target.value)
    // dispatch(setFilter(e.target.value))
  }
  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="flex gap-5 place-items-center justify-end">
        <button>
          <span className="bg-light-gray rounded-full aspect-square p-2 block">
            <BellIcon />
          </span>
        </button>
        <div className="user-image-container h-full aspect-square rounded-full"></div>
        <div>
          <h2>Elizabeth</h2>
          <span>Operator</span>
        </div>
        <button>
          <ArrowDownIcon />
        </button>
      </div>
      <div className="flex justify-between">
        <div className="text-3xl font-bold">
          <h2 className="text-secondary-blue">Hoy</h2>
          <span className="text-gray-600">6 de Octubre 2023</span>
        </div>
        <button>
          <div className="bg-secondary-blue rounded-full text-primary-blue p-3">
            <KeyboardShowIcon />
          </div>
        </button>
      </div>
      <form className="relative flex gap-3 [&>button>div]:border-light-blue [&>button>div]:border-8 [&>button>div]:p-2 [&>button>div]:rounded-xl text-secondary-blue justify-end">
        <button>
          <div>
            <SearchIcon />
          </div>
        </button>
        <button type="button" onClick={toggleFilter}>
          <div>
            <FilterIcon />
          </div>
        </button>
        <div
          className={`absolute flex flex-col border-light-blue border-8 p-2 rounded-xl text-xl bg-white top-10 rigth-0 mt-10 ${
            isFiltersVisible ? "visible" : "hidden"
          }`}
        >
          <select name="searchFilter" id="filter-select" onChange={handleSelectedFilter}>
            <option value="id">ID</option>
            <option value="compañia">Compañia</option>
            <option value="cantidad">Cantidad</option>
          </select>
          {/* <div>
            <input type="radio" id="idFilter" name="filter" value="ID" checked onClick={() => {dispatch(setFilter("Id"))}}/>
            <label>Id</label>
          </div>
          <div>
            <input
              type="radio"
              id="companyFilter"
              name="filter"
              value="Compañia"
              onClick={() => {dispatch(setFilter("Compañia"))}}
            />
            <label>Compañia</label>
          </div>
          <div>
            <input
              type="radio"
              id="amountFilter"
              name="filter"
              value="Cantidad"
              onClick={() => {dispatch(setFilter("Cantidad"))}}
            />
            <label>Cantidad</label>
          </div> */}
        </div>
        <button type="button">
          <div>
            <PrintIcon />
          </div>
        </button>
      </form>
    </section>
  );
};
export default Header;
