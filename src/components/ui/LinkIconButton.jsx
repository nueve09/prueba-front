"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./UI.module.css";

function LinkIconButton({ activeComponent, route, icon, iconSelected }) {
  const pathname = usePathname();
  const activeRoute = pathname.substring(pathname.lastIndexOf("/") + 1);
  return (
    <Link href={`${route}`}>
      <Image
        className={` ${styles.linkButton}`}
        src={route === `/${activeRoute}` ? iconSelected : icon}
        alt={`${activeComponent} icon`}
      />
    </Link>
  );
}

export default LinkIconButton;
