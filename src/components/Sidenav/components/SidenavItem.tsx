import React from 'react'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    title: string
    icon: string
}

export const SidenavItem = ({ title, icon, ...rest }: Props) => {
    return (
        <button title={title} {...rest}>
            <i className={icon}></i>
            <h2>{title}</h2>
        </button>
    )
}