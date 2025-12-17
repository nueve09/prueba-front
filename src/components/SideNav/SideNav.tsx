"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faCog, faUser, faFile, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';
import styles from "./SideNav.module.css";

export default function SideNav() {
  return (
    <nav className={styles.sidebar}>
      <img src="https://play-lh.googleusercontent.com/QRCRv6fDxgSKQqBwVgCS5hy_dP_ne3sU2P4EzFUQh_E8vrXvCmZ2YF6ImBMdDcmxXQ" alt="logo" className={styles.logo} />
      <div className={styles.navIcons}>
        <button className={styles.navIcon} aria-label="Inicio">
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button className={styles.navIcon} aria-label="Remesas">
          <FontAwesomeIcon icon={faChartLine} />
        </button>
        <button className={styles.navIcon} aria-label="Configuración">
          <FontAwesomeIcon icon={faCog} />
        </button>
        <button className={styles.navIcon} aria-label="Usuario">
          <FontAwesomeIcon icon={faFile} />
        </button>
        <button className={styles.navIcon} aria-label="Usuario">
          <FontAwesomeIcon icon={faArrowTurnDown} />
        </button>
        <button className={styles.navIcon} aria-label="Usuario">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </nav>
  );
}

