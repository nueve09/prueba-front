import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useSystemNotification } from "../../hooks/useSystemNotification";
import { useAppSelector } from "../../redux/hooks";

export const SystemNotification = () => {
  const { open, timeout, type, message } = useAppSelector(
    (state) => state.notification,
  );
  const { removeNotification } = useSystemNotification();

  const handleClose = (_: unknown, reason?: SnackbarCloseReason) =>
    reason != "clickaway" && removeNotification();
  return (
    <Snackbar
      open={open}
      autoHideDuration={timeout}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert variant="filled" onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};
