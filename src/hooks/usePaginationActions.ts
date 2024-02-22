import { updatePagination } from "../pages/Remittances/RemittancesSlice";
import { useAppDispatch } from "../redux/hooks";

export const usePaginationActions = () => {
  const dispatch = useAppDispatch();

  const changePagination = (page: number) => {
    if (page > 0) {
      dispatch(updatePagination(page));
    }
  };

  return {
    changePagination,
  };
};
