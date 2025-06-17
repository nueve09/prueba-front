import { useState, type ReactNode } from "react";
import { SnackbarContext } from "./snackbar.context"; // Ajusta la ruta si es necesario
import { Alert, Snackbar, type AlertProps } from "@mui/material";

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertProps["severity"]>();

  return (
    <SnackbarContext.Provider
      value={{
        open,
        setOpen,
        message,
        setMessage,
        severity,
        setSeverity,
      }}
    >
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity || "info"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
