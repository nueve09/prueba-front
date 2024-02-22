import { createSlice } from "@reduxjs/toolkit";
import { remittances } from "../../data/remittances";
import { PaginationProps, Remittence } from "./remittancesTypes";
import { getTodayRemittence } from "../../utils/dateTime";
import { paginate } from "../../utils/pagination";
import {
  filterByStatus,
  findElement,
  getFilteredList,
  sortRemittences,
} from "../../utils/arraysUtils";

export interface RemittancesSliceState {
  remittanceId: string;
  remittanceList: Array<Remittence>;
  filteredRemittanceList: Array<Remittence>;
  paginatedRemittances: PaginationProps;
  chargedRemittance: boolean;
}

const getPaginatedRemittences = (
  remittances: Array<Remittence>,
  page: number = 1,
) => {
  return paginate(
    sortRemittences(filterByStatus(remittances, "COBRADO")),
    page,
  );
};

const initialState: RemittancesSliceState = {
  remittanceId: "",
  remittanceList: remittances,
  filteredRemittanceList: remittances,
  paginatedRemittances: getPaginatedRemittences(remittances),
  chargedRemittance: false,
};

export const remittancesSlice = createSlice({
  name: "remittances",
  initialState,
  reducers: {
    updateRemittanceId: (state, action) => {
      state.remittanceId = action.payload;
    },
    updateByButtonRemittanceId: (state, action) => {
      if (state.remittanceId.length < 8) state.remittanceId += action.payload;
    },
    deleteLastChar: (state) => {
      state.remittanceId = state.remittanceId.slice(0, -1);
    },
    searchRemittance: (state, action) => {
      const remittance = findElement(state.remittanceList, +action.payload);
      if (remittance) {
        state.chargedRemittance = true;
        remittance.status = "COBRADO";
        remittance.charged_at = getTodayRemittence();
      } else {
        state.chargedRemittance = false;
      }
      state.paginatedRemittances = getPaginatedRemittences(
        state.remittanceList,
      );
    },
    applyFilter: (state, action) => {
      const { searchId, searchCompany, searchAmount } = action.payload;
      state.filteredRemittanceList = getFilteredList(
        state.remittanceList,
        searchId,
        searchCompany,
        searchAmount,
      );
      state.paginatedRemittances = getPaginatedRemittences(
        state.filteredRemittanceList,
      );
    },
    restartRemittances: (state) => {
      state.filteredRemittanceList = sortRemittences(
        filterByStatus(state.remittanceList, "COBRADO"),
      );
    },
    updatePagination: (state, action) => {
      state.paginatedRemittances = getPaginatedRemittences(
        state.remittanceList,
        action.payload,
      );
    },
  },
});

export const {
  updateRemittanceId,
  updateByButtonRemittanceId,
  deleteLastChar,
  searchRemittance,
  applyFilter,
  restartRemittances,
  updatePagination,
} = remittancesSlice.actions;
export default remittancesSlice;
