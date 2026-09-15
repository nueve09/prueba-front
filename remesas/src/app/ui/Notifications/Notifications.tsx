import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import "./style.scss";

export default function Notifications() {
  return (
    <div className="notifications-container">
      <NotificationsNoneIcon />
      <div className="notifications-container__ammount">10</div>
    </div>
  );
}
