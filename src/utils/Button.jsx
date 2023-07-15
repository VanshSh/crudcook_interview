import React from 'react'

const Button = ({ props }) => {
  const { icon, color, buttonTitle, type } = props

  return (
    <div className='button buttonText' style={{ backgroundColor: `${color}` }}>
      <span>{icon}</span> <span>{buttonTitle}</span>
    </div>
  )
}

export default Button
