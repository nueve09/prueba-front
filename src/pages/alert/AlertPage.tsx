import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setAlertMsg } from '@/store/essentials'
import { AlertMsgIcon } from '@/interfaces'
import '@/pages/alert/alert.css'

export const AlertPage = () => {
    const { alertMsg } = useAppSelector(state => state.essentials)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!!alertMsg) {
            setTimeout(() => {
                dispatch(setAlertMsg(null))
            }, alertMsg.duration * 1000)
        }
    }, [alertMsg])

    if (!alertMsg) return null

    return (
        <div className={`alert-page-container ${alertMsg.type}`}>
            <div className="alert-card">
                <h1>
                    <i className={AlertMsgIcon[alertMsg.type]}></i>
                    {alertMsg.title}
                </h1>
                <h3>{alertMsg.message}</h3>
            </div>
        </div>
    )
}