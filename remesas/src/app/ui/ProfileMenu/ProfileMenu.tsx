import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

import "./style.scss";

export default function ProfileMenu() {
  return (
    <div className="profile-menu-container">
      <Image
        className="profile-menu-container__photo"
        src={"https://testingbot.com/free-online-tools/random-avatar/300"}
        alt="profile-iamge"
        width={36}
        height={36}
      />

      <div className="profile-menu-container__info">
        <span className="profile-menu-container__info__name">
          Example user name
        </span>
        <span className="profile-menu-container__info__role">Example role</span>
      </div>
      <div className="profile-menu-container__menu">
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
}
