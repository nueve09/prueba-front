export interface ErrorAlert {
    id: string
    title: string
    message: string
    icon: 'fa-solid fa-circle-exclamation' | 'fa-solid fa-triangle-exclamation'
    color: 'error' | 'warning'
    duration: number
}