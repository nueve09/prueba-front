import type { AlertProps } from "@mui/material";
import { createContext, type Dispatch, type SetStateAction } from "react";

export type SnackbarContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  severity?: AlertProps["severity"];
  setSeverity: Dispatch<SetStateAction<AlertProps["severity"] | undefined>>;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);
