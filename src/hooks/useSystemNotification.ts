import { useAppDispatch } from "../redux/hooks";
import {
  NotificationState,
  addNotification,
  clearNotification,
} from "../redux/features/notificationSlice";

export const useSystemNotification = () => {
  const dispatch = useAppDispatch();

  const displayNotification = (notification: NotificationState) => {
    dispatch(addNotification(notification));
  };

  const removeNotification = () => {
    dispatch(clearNotification());
  };

  return {
    displayNotification,
    removeNotification,
  };
};
