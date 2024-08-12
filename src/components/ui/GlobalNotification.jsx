import React from "react";
import { useNotification } from "@/context/notifications";
import styles from "./UI.module.css";

const GlobalNotification = () => {
  const { notification, hideNotification } = useNotification();

  if (!notification) return null;

  return (
    <div className={styles.globalNotification} onClick={hideNotification}>
      {notification}
    </div>
  );
};

export default GlobalNotification;
