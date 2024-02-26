export interface AlertMsg {
    title: string
    message: string
    type: 'success' | 'error' | 'warning'
    duration: number
}

export enum AlertMsgIcon {
    success = 'fa-solid fa-circle-check text-white',
    error = 'fa-solid fa-triangle-exclamation text-white',
    warning = 'fa-solid fa-circle-exclamation',
}