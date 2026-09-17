import Calculator from './Calculator'
import './LeftPanel.css'

function LeftPanel({ setCobrado }) {
  return (
    <div className="left-panel">
      <div className="left-panel-header">
        <span className="left-panel-title">
          Ventanilla <strong>Digital</strong>
        </span>
      </div>
      <h2 className="left-panel-heading">Remesas</h2>
      <Calculator setCobrado={setCobrado} />
    </div>
  )
}

export default LeftPanel
