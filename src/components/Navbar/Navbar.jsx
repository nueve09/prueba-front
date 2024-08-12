import React from "react";
import styles from "./Navbar.module.css";
import { navbarButtons } from "./navbarButtons";
import LinkIconButton from "../ui/LinkIconButton";
import Logo from "../ui/Logo";

function Navbar() {
  return (
    <div className={`${styles.navbar}`}>
      <Logo />
      <div className={`${styles.navbarButtonsContainer}`}>
        {navbarButtons?.length > 0 &&
          navbarButtons.map((navbarButton, index) => (
            <LinkIconButton
              key={index}
              activeComponent={navbarButton.activeComponent}
              route={navbarButton.route}
              icon={navbarButton.icon}
              iconSelected={navbarButton.iconSelected}
            />
          ))}
      </div>
    </div>
  );
}

export default Navbar;
