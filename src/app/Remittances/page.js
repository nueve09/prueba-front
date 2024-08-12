"use client";
import styles from "./page.module.css";
import Remittances from "@/components/Remittances/Remittances";
import { NotificationProvider } from "@/context/notifications";
import GlobalNotification from "@/components/ui/GlobalNotification";

export default function PageRemittances() {
  return (
    <main className={styles.main}>
      <NotificationProvider>
        <GlobalNotification />
        <Remittances />
      </NotificationProvider>
    </main>
  );
}
