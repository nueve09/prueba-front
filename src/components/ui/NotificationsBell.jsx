"use client";
import React, { useState } from "react";
import bell from "../../../public/assets/icons/bell.png";
import Image from "next/image";
import styles from "./UI.module.css";

function NotificationsBell() {
  const [notifications, setNotifications] = useState(0);
  return (
    <div className={`${styles.notificationsBellContainer}`}>
      <Image
        alt="Bell icon"
        src={bell}
        className={`${styles.notificationsBell}`}
      />
      <div className={`${styles.notificationsBubble}`}>{notifications}</div>
    </div>
  );
}

export default NotificationsBell;
