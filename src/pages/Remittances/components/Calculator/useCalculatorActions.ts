import { useAppDispatch } from "../../../../redux/hooks";
import {
  updateRemittanceId,
  updateByButtonRemittanceId,
  deleteLastChar,
  searchRemittance,
} from "../../RemittancesSlice";

export const useCalculatorActions = () => {
  const dispatch = useAppDispatch();

  const changeRemittanceId = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateRemittanceId(e.target.value));
  };

  const changeByButtonRemittanceId = (value: string) => {
    dispatch(updateByButtonRemittanceId(value));
  };

  const removeLastChart = () => {
    dispatch(deleteLastChar());
  };

  const findRemittance = (id: string) => {
    dispatch(searchRemittance(id));
  };

  return {
    changeRemittanceId,
    changeByButtonRemittanceId,
    removeLastChart,
    findRemittance,
  };
};
