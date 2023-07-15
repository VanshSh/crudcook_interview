import React from 'react'
import { UseProjectContext } from '../store/context'

const Navbar = ({ types }) => {
  const {
    viewType: { type, title, buttonTitle },
    setViewType,
  } = UseProjectContext()

  const changeTypeHandler = (typeTitle) => {
    setViewType((prev) => {
      return {
        ...prev,
        title: typeTitle,
        buttonTitle: `Create ${typeTitle}`,
        type: typeTitle,
      }
    })
  }
  console.log('😇 L-15 in Navbar.jsx=> ', UseProjectContext().viewType)
  return (
    <nav>
      <ul className='d-flex justify-content-end gap-3'>
        {types.map((typeTitle) => {
          return (
            <li
              className={` ${type === typeTitle ? 'activeType' : ''} type`}
              key={typeTitle}
              onClick={() => changeTypeHandler(typeTitle)}
            >
              {typeTitle}s
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
