import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filter.slice";

export default configureStore({
    reducer: {
       filter: filterSlice
    },
})