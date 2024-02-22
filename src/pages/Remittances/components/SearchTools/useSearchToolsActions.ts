import { useAppDispatch } from "../../../../redux/hooks";
import { applyFilter, restartRemittances } from "../../RemittancesSlice";
import { searchPropsTypes } from "../../remittancesTypes";

export const useSearchToolsActions = () => {
  const dispatch = useAppDispatch();
  const searchInList = ({
    searchId,
    searchCompany,
    searchAmount,
  }: searchPropsTypes) => {
    dispatch(applyFilter({ searchId, searchCompany, searchAmount }));
  };

  const restoreList = () => {
    dispatch(restartRemittances());
  };

  return {
    searchInList,
    restoreList,
  };
};
