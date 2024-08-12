import React from "react";
import Image from "next/image";
import styles from "./UI.module.css";

function Avatar({ alt, image }) {
  return <Image className={`${styles.avatar}`} alt={alt} src={image} />;
}

export default Avatar;
