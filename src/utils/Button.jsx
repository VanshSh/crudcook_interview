import React from 'react'

const Button = ({ props }) => {
  const { icon, color, buttonTitle, handleClick, status } = props

  return (
    <div
      onClick={handleClick}
      className={`button buttonText ${status}`}
      style={{ backgroundColor: `${color}` }}
    >
      <span>{icon}</span> <span>{buttonTitle}</span>
    </div>
  )
}

export default Button
