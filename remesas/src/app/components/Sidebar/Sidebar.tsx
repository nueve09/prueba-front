"use client";

import useMenu from "./hooks/UseMenu";
import Image from "next/image";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { usePathname } from "next/navigation";
import "./style.scss";

export default function Sidebar() {
  const pathName = usePathname();

  const {
    SIDEBAR_ITEMS,
    selectedItem,
    isToolExpanded,
    handleMenuItemClick,
    hanldleToolExpand,
  } = useMenu(pathName);

  return (
    <div className="sidebar-container">
      <div className="sidebar-container__menu">
        <div className="sidebar-container__menu__logo-container`">
          <Image
            className="sidebar-container__menu__logo-container__logo"
            src="/logo.png"
            alt="Logo"
            width={72}
            height={72}
          />

          {pathName.includes("remittance") && (
            <button
              className="sidebar-container__menu__logo-container__adornment"
              onClick={hanldleToolExpand}
            >
              <ArrowForwardIosOutlinedIcon sx={{ fontSize: 12 }} />
            </button>
          )}
        </div>

        {SIDEBAR_ITEMS.map((item) => {
          return (
            <button
              key={item.id}
              className={`sidebar-container__menu__item ${selectedItem?.id === item.id ? "active" : ""}`}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <item.icon sx={{ fontSize: 32 }} />
            </button>
          );
        })}
      </div>

      <div
        className={`sidebar-container__content ${selectedItem?.component && isToolExpanded ? "expanded" : ""}`}
      >
        {selectedItem?.component && <selectedItem.component />}
      </div>
    </div>
  );
}
