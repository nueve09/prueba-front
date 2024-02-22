import { combineSlices, configureStore } from "@reduxjs/toolkit";
import remittancesSlice from "../pages/Remittances/RemittancesSlice";
import notificationSlice from "./features/notificationSlice";

const rootReducer = combineSlices(remittancesSlice, notificationSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
