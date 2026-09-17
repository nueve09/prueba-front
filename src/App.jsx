
import { useRemesas } from './hooks/useRemesas'
import SideBar from './components/SideBar'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import ErrorPopup from './components/ErrorPopup'

import './App.css'

function App() {
  const {
    items,
    searchQuery,
    onSearchChange,
    page,
    totalPages,
    onPageChange,
    setCobrado,
    error,
    clearError,
  } = useRemesas();

  return (
    <>
      <ErrorPopup message={error} onClose={clearError} />
      <div className="layout">
        <SideBar />
        <section className="panel panel-left">
          <LeftPanel setCobrado={setCobrado}/>
        </section>
        <section className="panel panel-right">
          <RightPanel
            items={items}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </section>
      </div>
    </>
  )
}

export default App
