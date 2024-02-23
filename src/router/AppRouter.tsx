import { Navigate, Route, Routes } from 'react-router-dom'
import { EmptyPage, MainPage, RemittancesPage } from '@/pages'
import { Sidebar } from '@/components'

export const AppRouter = () => {
    return (
        <div>
            <Sidebar />
            <div className="container">
                <button className="toogle-button">
                    <i className="fa-solid fa-chevron-right expand"></i>
                    <i className="fa-solid fa-chevron-left collapse"></i>
                </button>
                <Routes>
                    <Route path="/" element={<RemittancesPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/cards" element={<EmptyPage title="Tarjetas" />} />
                    <Route path="/invoices" element={<EmptyPage title="Facturas" />} />
                    <Route path="/share" element={<EmptyPage title="Compartir" />} />
                    <Route path="/files" element={<EmptyPage title="Archivos" />} />

                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    )
}