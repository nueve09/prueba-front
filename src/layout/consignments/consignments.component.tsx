import { type FC } from "react";
import { FaSearch, FaPrint, FaUserCircle } from "react-icons/fa";
import { PiSlidersHorizontalFill } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";

import "./consignments.css";
import { useConsignmentContext } from "../../hooks/useCondignmentContext";
import SearchPanel from "./components/search/search.component";

const user = {
  name: "Hugo Gómez",
  role: "Administrador",
  avatar: <FaUserCircle size={40} />,
};

const today = new Date().toLocaleDateString("es-ES", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

const Consignments: FC = () => {
  const { paidConsignments, setShowSearchPanel } = useConsignmentContext();

  const toggleSearchPanel = () => {
    setShowSearchPanel((prev) => !prev);
  };

  return (
    <div className="consignments-table__container">
      <div className="consignments-table__header">
        <div className="consignments-table__user">
          <button
            className="consignments-table__user-notification"
            data-notification="3"
          >
            <IoMdNotificationsOutline />
          </button>
          {user.avatar}
          <div className="consignments-table__userinfo">
            <div className="consignments-table__username">{user.name}</div>
            <div className="consignments-table__role">{user.role}</div>
          </div>
        </div>
      </div>
      <div className="consignments-table__date">
        <p className="consignments-table__date-label">Hoy</p>
        {today}
      </div>
      <div className="consignments-table__actions">
        <button
          className="consignments-table__action-btn"
          onClick={toggleSearchPanel}
        >
          <FaSearch />
        </button>
        <button className="consignments-table__action-btn">
          <PiSlidersHorizontalFill />
        </button>
        <button className="consignments-table__action-btn">
          <FaPrint />
        </button>
      </div>
      <SearchPanel />
      <table className="consignments-table">
        <tbody>
          {paidConsignments
            .sort(
              (a, b) =>
                new Date(b.charged_at).getTime() -
                new Date(a.charged_at).getTime(),
            )
            .map((c) => (
              <tr key={c.id}>
                <td>#{c.id}</td>
                <td>{c.company}</td>
                <td>
                  $
                  {Number(c.amount).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Consignments;
