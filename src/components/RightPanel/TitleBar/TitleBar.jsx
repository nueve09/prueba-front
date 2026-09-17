import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-regular-svg-icons'

import './TitleBar.css'

const today = new Date().toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function TitleBar() {
  return (
    <div className="titlebar">
      <div className="titlebar-info">
        <span className="titlebar-label">Hoy</span>
        <span className="titlebar-date">{today}</span>
      </div>
      <button type="button" className="titlebar-keyboard" aria-label="Teclado">
        <FontAwesomeIcon icon={faKeyboard} className="icon" />
      </button>
    </div>
  )
}

export default TitleBar
