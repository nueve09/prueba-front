import React from 'react'
import '@/components/Button/button.css'

interface Props {
    title: string
    color: 'primary' | 'outline-primary' | 'light' | 'secondary' | 'outline-secondary'
    circle?: boolean
    disabled?: boolean
    children?: React.ReactNode
    onClick?: () => void
}

export const Button = ({ title, color, circle = false, disabled, children, onClick = () => { } }: Props) => {
    return (
        <button
            title={title}
            className={`btn btn-${color} ${circle ? 'btn-circle' : ''}`}
            disabled={disabled}
            onClick={() => onClick()}
        >
            {!!children ? children : title}
        </button>
    )
}