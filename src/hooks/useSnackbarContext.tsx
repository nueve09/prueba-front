import { useContext } from "react";
import { SnackbarContext } from "../context/snackbar.context";

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider",
    );
  }
  return context;
};
