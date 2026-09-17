import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSliders, faPrint } from '@fortawesome/free-solid-svg-icons'

import './ToolBar.css'

function ToolBar({ searchQuery, onSearchChange }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => {
    if (isSearchOpen) {
      onSearchChange('')
    }
    setIsSearchOpen((open) => !open)
  }

  return (
    <div className="toolbar">
      <input
        type="text"
        className={`toolbar-search-input${isSearchOpen ? ' is-open' : ''}`}
        placeholder="Buscar por id, compañía o monto"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <div className="toolbar-actions">
        <button
          type="button"
          className="toolbar-button"
          aria-label={isSearchOpen ? 'Cerrar búsqueda' : 'Buscar'}
          onClick={toggleSearch}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        </button>
        <button type="button" className="toolbar-button" aria-label="Filtros">
          <FontAwesomeIcon icon={faSliders} className="icon" />
        </button>
        <button type="button" className="toolbar-button" aria-label="Imprimir">
          <FontAwesomeIcon icon={faPrint} className="icon" />
        </button>
      </div>
    </div>
  )
}

export default ToolBar
