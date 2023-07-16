import React from 'react'
import Button from './Button'
import { UseProjectContext } from '../store/context'

const Header = ({ props }) => {
  const { showFormModal, setShowFormModal } = UseProjectContext()
  const { title, buttonTitle, type } = props

  const openFormModal = () => {
    setShowFormModal(!showFormModal)
  }
  return (
    <div className='d-flex justify-content-between my-5 align-items-center'>
      <h3 className='headerTitle'>{title}s</h3>
      <Button
        props={{
          handleClick: openFormModal,
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
