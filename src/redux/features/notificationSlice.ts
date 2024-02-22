import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface NotificationState {
  open?: boolean;
  type?: AlertColor;
  message?: string;
  timeout?: number | null;
}

const initialState: NotificationState = {
  open: false,
  type: "success",
  message: "",
  timeout: 5000,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (_state, action: PayloadAction<NotificationState>) => ({
      ...initialState,
      ...action.payload,
      open: true,
    }),
    clearNotification: (state) => ({ ...state, open: false }),
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice;
