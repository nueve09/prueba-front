import React, { CSSProperties } from 'react'
import { DIMENTIONS } from '@/utils/constants'
const { CALCBTN_SIZE, CALCBTNS_GAP } = DIMENTIONS

interface Props {
    size?: number
    direction?: 'horizontal' | 'vertical'
    children: React.ReactNode
    style?: CSSProperties
    onClick?: () => void
}

export const CalcBtn = ({ size = 1, direction = 'horizontal', children, style = {}, onClick = () => { } }: Props) => {
    const buttonSizeInDirection = `calc(${CALCBTN_SIZE} * ${size} + ${CALCBTNS_GAP} * ${size - 1})`

    style.minHeight = direction === 'horizontal' ? CALCBTN_SIZE : buttonSizeInDirection
    style.minWidth = direction === 'horizontal' ? buttonSizeInDirection : CALCBTN_SIZE

    if (size === 1) {
        style.width = '100%'
        style.aspectRatio = '1 / 1'
    } else {
        if (direction === 'horizontal') {
            style.width = '100%'
            style.aspectRatio = '2 / 1'
        } else {
            style.height = '100%'
            style.aspectRatio = '1 / 2'
        }
    }

    return (
        <div className="calc-button-container">
            <button
                className="calc-button"
                onClick={() => onClick()}
                style={style}
            >
                {children}
            </button>
        </div>
    )
}