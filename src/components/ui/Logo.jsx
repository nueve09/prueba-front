import React from "react";
import Image from "next/image";
import logo from "../../../public/assets/images/logo.png";
import styles from "./UI.module.css";

function Logo() {
  return <Image className={`${styles.logo}`} alt="Logo icon" src={logo} />;
}

export default Logo;
