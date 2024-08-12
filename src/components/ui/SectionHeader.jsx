"use client";
import React from "react";
import styles from "./UI.module.css";
import { usePathname } from "next/navigation";

function SectionHeader() {
  const pathname = usePathname();
  const activeRoute = pathname.substring(pathname.lastIndexOf("/") + 1);
  return (
    <div className={`${styles.sectionHeader}`}>
      <p>
        Ventanilla <span>Digital</span>
      </p>
      <p>{activeRoute}</p>
    </div>
  );
}

export default SectionHeader;
