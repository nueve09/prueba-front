import { useLocation, useNavigate } from 'react-router-dom'
import logo from '@/assets/img/logo.png'
import '@/components/Sidebar/styles.css'

export const Sidebar = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <div className="sidebar">
            <div className="brand-container">
                <img src={logo} />
                <h2>Alejandro Ríos</h2>
            </div>
            <div className="sidebar-content">
                <button title="Principal" onClick={() => navigate('/main')} className={pathname === '/main' ? 'active' : ''}>
                    <i className="fa-solid fa-home"></i>
                    <h2>Principal</h2>
                </button>
                <button title="Remesas" onClick={() => navigate('/')} className={pathname === '/' ? 'active' : ''}>
                    <i className="fa-solid fa-dollar-sign"></i>
                    <h2>Remesas</h2>
                </button>
                <button title="Tarjetas" onClick={() => navigate('/cards')} className={pathname === '/cards' ? 'active' : ''}>
                    <i className="fa-solid fa-credit-card"></i>
                    <h2>Tarjetas</h2>
                </button>
                <button title="Facturas" onClick={() => navigate('/invoices')} className={pathname === '/invoices' ? 'active' : ''}>
                    <i className="fa-solid fa-file-invoice-dollar"></i>
                    <h2>Facturas</h2>
                </button>
                <button title="Compartir" onClick={() => navigate('/share')} className={pathname === '/share' ? 'active' : ''}>
                    <i className="fa-solid fa-share"></i>
                    <h2>Compartir</h2>
                </button>
                <button title="Archivos" onClick={() => navigate('/files')} className={pathname === '/files' ? 'active' : ''}>
                    <i className="fa-solid fa-folder"></i>
                    <h2>Archivos</h2>
                </button>
            </div>
        </div>
    )
}