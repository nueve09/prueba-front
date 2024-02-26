import { useLocation, useNavigate } from 'react-router-dom'
import logo from '@/assets/img/logo.png'
import { SidenavItem, ToogleBtn } from '@/components/Sidenav/components'
import { useAppSelector } from '@/hooks'
import { BRAND } from '@/utils/constants'
import '@/components/Sidenav/sidenav.css'

export const Sidenav = () => {
    const { hiddenSidenav, miniSidenav, sidenavWidth } = useAppSelector(state => state.essentials)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return (
        <>
            <div className="sidenav" style={{ width: sidenavWidth, left: hiddenSidenav && miniSidenav ? `-${sidenavWidth}` : '0' }}>
                <div className="brand-container">
                    <img src={logo} />
                    <h1>{BRAND}</h1>
                </div>
                <div className="sidenav-content">
                    <SidenavItem
                        title="Principal"
                        icon="fa-solid fa-home"
                        className={pathname === '/main' ? 'active' : ''}
                        onClick={() => navigate('/main')}
                    />
                    <SidenavItem
                        title="Remesas"
                        icon="fa-solid fa-dollar-sign"
                        className={pathname === '/' ? 'active' : ''}
                        onClick={() => navigate('/')}
                    />
                    <SidenavItem
                        title="Tarjetas"
                        icon="fa-solid fa-credit-card"
                        className={pathname === '/cards' ? 'active' : ''}
                        onClick={() => navigate('/cards')}
                    />
                    <SidenavItem
                        title="Facturas"
                        icon="fa-solid fa-file-invoice-dollar"
                        className={pathname === '/invoices' ? 'active' : ''}
                        onClick={() => navigate('/invoices')}
                    />
                    <SidenavItem
                        title="Compartir"
                        icon="fa-solid fa-share"
                        className={pathname === '/share' ? 'active' : ''}
                        onClick={() => navigate('/share')}
                    />
                    <SidenavItem
                        title="Archivos"
                        icon="fa-solid fa-folder"
                        className={pathname === '/files' ? 'active' : ''}
                        onClick={() => navigate('/files')}
                    />
                </div>
            </div>
            <ToogleBtn />
        </>
    )
}