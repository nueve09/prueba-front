import React, { CSSProperties } from 'react'
import { DIMENTIONS } from '@/utils/constants'
import '@/pages/remittances/views/calculator.css'

const { CALCBTN_SIZE, CALCBTNS_GAP } = DIMENTIONS

interface Props {
  size?: number
  direction?: 'horizontal' | 'vertical'
  children: React.ReactNode
  style?: CSSProperties
  onClick?: () => void
}

const CalcBtn = ({ size = 1, direction = 'horizontal', children, style = {}, onClick = () => { } }: Props) => {
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

export const CalculatorView = () => {
  return (
    <div className="calculator-container">
      <h3 className="title">Ventanilla <b>Digital</b></h3>
      <hr />
      <h2 className="subtitle">Remesas</h2>
      <div className="keyboard-container">
        <div className="input-search">
          <input />
          <label>|**</label>
        </div>
        <div className="row">
          <div className="col-3-4">
            <div className="row">
              <div className="col-1-3">
                <CalcBtn>1</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>2</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>3</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>4</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>5</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>6</CalcBtn>
              </div>
            </div>
          </div>
          <div className="col-1-4">
            <CalcBtn size={2} direction="vertical" style={{ color: 'var(--dark)' }}>
              <i className="fa-solid fa-delete-left"></i>
            </CalcBtn>
          </div>
        </div>
        <div className="row">
          <div className="col-3-4">
            <div className="row">
              <div className="col-1-3">
                <CalcBtn>7</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>8</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>9</CalcBtn>
              </div>
              <div className="col-2-3">
                <CalcBtn size={2}>0</CalcBtn>
              </div>
              <div className="col-1-3">
                <CalcBtn>.</CalcBtn>
              </div>
            </div>
          </div>
          <div className="col-1-4">
            <CalcBtn size={2} direction="vertical" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
              <i className="fa-solid fa-arrow-turn-down fa-rotate-90"></i>
            </CalcBtn>
          </div>
        </div>
      </div>
    </div>
  )
}