import React from 'react'
import { UseProjectContext } from '../store/context'

const Navbar = ({ types }) => {
  const {
    viewType: { type },
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

  return (
    <nav>
      <ul className='d-flex justify-content-end '>
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
