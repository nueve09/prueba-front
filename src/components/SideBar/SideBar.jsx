import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCreditCard, faShareFromSquare, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { faBolt, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'

import './SideBar.css'

const NAV_ITEMS = [
  { icon: faHouse, active: false },
  { icon: faBolt, active: true },
  { icon: faCreditCard, active: false },
  { icon: faCircleDollarToSlot, active: false },
  { icon: faShareFromSquare, active: false },
  { icon: faChartBar, active: false },
]

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-mark" />
        <span className="sidebar-logo-badge" />
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ icon, active }, index) => (
          <span key={index} className={`sidebar-nav-item${active ? ' is-active' : ''}`}>
            <FontAwesomeIcon icon={icon} className="icon" />
          </span>
        ))}
      </nav>
    </div>
  )
}

export default SideBar
