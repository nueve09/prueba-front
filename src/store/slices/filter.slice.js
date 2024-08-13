import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    value: "id",
    searchString: ""
  },
  reducers: {
    setFilter: (state, action) => {
      const newFilter = action.payload;
      state.value = newFilter;
    },
    setSearchString: (state, action) => {
      const newSearchString = action.payload;
      state.value = newSearchString
    }
  },
});

export const { setFilter, setSearchString } = filterSlice.actions;

export default filterSlice.reducer;