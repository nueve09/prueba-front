import { useAppDispatch, useAppSelector } from '@/hooks'
import { setMiniSidenav } from '@/store/essentials'

export const ToogleBtn = () => {
    const { hiddenSidenav, miniSidenav, sidenavWidth } = useAppSelector(state => state.essentials)
    const dispatch = useAppDispatch()

    const toogleSidenav = () => dispatch(setMiniSidenav(!miniSidenav))

    return (
        <button
            className="toogle-button"
            onClick={toogleSidenav}
            style={{ left: hiddenSidenav && miniSidenav ? '0' : `calc(${sidenavWidth} - .625rem)`, zIndex: '1001' }}
        >
            {
                miniSidenav ? (
                    <i className="fa-solid fa-chevron-right"></i>
                ) : (
                    <i className="fa-solid fa-chevron-left"></i>
                )
            }
        </button>
    )
}