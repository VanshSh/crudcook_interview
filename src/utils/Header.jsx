import React from 'react'
import Button from './Button'

const Header = ({ props }) => {
  const { title, buttonTitle, type } = props

  return (
    <div className='d-flex justify-content-between my-5 align-items-center'>
      <h3 className='headerTitle'>{title}s</h3>
      <Button
        props={{
          icon: '+',
          buttonTitle,
          type,
          color: '#68ECED',
        }}
      />
    </div>
  )
}

export default Header
