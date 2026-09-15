import Notifications from "@ui/Notifications/Notifications";
import ProfileMenu from "@ui/ProfileMenu/ProfileMenu";
import "./style.scss";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <Notifications />
      <ProfileMenu />
    </div>
  );
}
