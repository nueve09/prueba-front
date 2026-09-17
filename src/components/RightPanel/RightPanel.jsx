import { formatAmount } from '../../utils/remesas'

import TopBar from './TopBar'
import TitleBar from './TitleBar'
import ToolBar from './ToolBar'
import Pagination from './Pagination'

import './RightPanel.css'

function RightPanel({ items, searchQuery, onSearchChange, page, totalPages, onPageChange }) {
  return (
    <div className="list">
      <TopBar />
      <TitleBar />
      <ToolBar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <div className="list-rows">
        {items.map((remesa) => (
          <div className="list-row" key={remesa.id}>
            <div className="list-id">#{remesa.id}</div>
            <div className="list-company">{remesa.company}</div>
            <div className="list-amount">{formatAmount(remesa.amount)}</div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="list-empty">No se encontraron remesas cobradas.</div>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}

export default RightPanel
