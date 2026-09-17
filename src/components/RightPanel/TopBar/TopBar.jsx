// README: librería de íconos (Font Awesome), usada también en TitleBar, ToolBar, Calculator y SideBar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'

import user from '../../../utils/user'
import './TopBar.css'

function TopBar() {
  return (
    <div className="topbar">
      <button type="button" className="topbar-bell" aria-label="Notificaciones">
        <FontAwesomeIcon icon={faBell} className="icon" />
        <span className="topbar-badge" />
      </button>

      <div className="topbar-profile">
        <div className="topbar-avatar">{user.avatar}</div>
        <div className="topbar-profile-text">
          <span className="topbar-name">{user.name}</span>
          <span className="topbar-title">{user.title}</span>
        </div>
        <svg className="icon topbar-chevron" role="presentation" aria-hidden="true">
          <use href="/icons.svg#chevron-down-icon"></use>
        </svg>
      </div>
    </div>
  )
}

export default TopBar
