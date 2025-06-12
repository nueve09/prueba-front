import { useState, type FC } from "react";
import {
  FaHome,
  FaUser,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaChevronCircleRight,
} from "react-icons/fa";
import "./sideMenu.css";
import n09Logo from "../../assets/n09Logo.svg";

const icons = [
  { icon: <FaHome />, label: "Home" },
  { icon: <FaUser />, label: "Profile" },
  {
    icon: <FaBell />,
    label: "Notifications",
  },
  { icon: <FaCog />, label: "Settings" },
  { icon: <FaSignOutAlt />, label: "Logout" },
];

const SideMenu: FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <nav className="side-menu" style={{ width: expanded ? "200px" : "60px" }}>
      <section className="side-menu__logo-container">
        <img src={n09Logo} alt="Logo" className="side-menu__logo" />
        <button
          className="side-menu__toggle"
          onClick={() => setExpanded(!expanded)}
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-label={expanded ? "Collapse menu" : "Expand menu"}
        >
          <FaChevronCircleRight />
        </button>
      </section>
      {icons.map(({ icon, label }) => (
        <button
          key={label}
          title={label}
          className="side-menu__button"
          aria-label={label}
        >
          {icon}
          <span
            className="side-menu__button-label"
            style={{
              display: expanded ? "inline" : "none",
            }}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default SideMenu;
