import type { AlertProps } from "@mui/material";
import { useSnackbarContext } from "./useSnackbarContext";

interface SnackbarOptions {
  message: string;
  severity?: AlertProps["severity"];
}

export const useSnackbar = () => {
  const { setMessage, setOpen, setSeverity } = useSnackbarContext();

  const showSnackbar = (arg: string | SnackbarOptions): void => {
    if (typeof arg === "string") {
      setMessage(arg);
      setSeverity("info");
    } else {
      setMessage(arg.message);
      setSeverity(arg.severity || "info");
    }
    setOpen(true);
  };

  return { showSnackbar };
};
