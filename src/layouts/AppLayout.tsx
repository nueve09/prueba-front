import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector, useViewport } from '@/hooks'
import { setHiddenSidenav, setMiniSidenav } from '@/store/essentials'

interface Props {
    children: React.ReactNode
}

export const AppLayout = ({ children }: Props) => {
    const { hiddenSidenav, sidenavWidth } = useAppSelector(state => state.essentials)
    const dispatch = useAppDispatch()
    const { width } = useViewport()

    useEffect(() => {
        dispatch(setMiniSidenav(width < 1200))
        dispatch(setHiddenSidenav(width < 700))
    }, [width])

    return (
        <div className="container" style={{ paddingLeft: hiddenSidenav ? '0' : sidenavWidth }}>
            {children}
        </div>
    )
}