import React, { useEffect, useState } from 'react'
import Button from './Button'
import { UseProjectContext } from '../store/context'

const UpdateDocumentForm = ({ fields, type, values }) => {
  const { setshowUpdateModalForm, updateDocument, allUserName } =
    UseProjectContext()

  const [selectClicked, setSelectClicked] = useState(false)
  const [filterQuery, setFilterQuery] = useState('')

  const filterQueryHandler = (e) => {
    setFilterQuery(e.target.value)
  }
  const filteredUserName = allUserName.filter((item) => {
    return item.toLowerCase().includes(filterQuery.toLowerCase())
  })

  const handleSelectClick = () => {
    setSelectClicked((prev) => !prev)
  }
  const [formData, setFormData] = useState({})
  useEffect(() => {
    if (values) {
      setFormData(values)
    }
  }, [values])

  const handleChange = (e, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: e.target.value,
    }))
  }
  const handleUpdate = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      id: e.target.value,
    }))

    // Handle form submission with formData
    updateDocument(formData)
  }

  const closeModal = () => {
    setshowUpdateModalForm((prev) => !prev)
  }
  const validateForm = (inputFields) => {
    for (let i = 0; i < inputFields.length; i++) {
      const { pattern, name } = inputFields[i]
      const value = formData[name]

      if (!value || value.trim() === '') {
        return false // Empty field
      }

      if (pattern && !pattern.test(value)) {
        return false // Pattern mismatch
      }
    }

    return true // All fields are valid
  }

  return (
    <div className='createFormModal p-3'>
      <div className=' createFormModal__header'>
        <div className='d-flex align-items-center my-3'>
          <span className='pointer ' onClick={closeModal}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='39'
              height='39'
              viewBox='0 0 39 39'
              fill='none'
            >
              <path
                d='M21.6011 10.2261L12.3272 19.5L21.6011 28.7739L23.8989 26.4761L16.9227 19.5L23.8989 12.5239L21.6011 10.2261Z'
                fill='white'
              />
            </svg>
          </span>
          <span className='heading col-11 text-center'>Edit {type}</span>
        </div>
      </div>
      <div className='createFormModal__body row mx-5 mt-5 '>
        {fields.map((field, index) => {
          if (type === 'Post' && field.name === 'username') {
            return (
              <div key={index} className='w-50 mb-4  '>
                <label className='label text-left' htmlFor={field.name}>
                  {field.label}
                  {selectClicked}
                </label>
                <br />
                <div className='cutsom-select addSearchInput'>
                  <input
                    type='text'
                    placeholder='Type here...'
                    className={`${
                      selectClicked ? 'd-block' : 'd-none'
                    } searchInput`}
                    onChange={(event) => filterQueryHandler(event)}
                  />
                  <select
                    name={field.name}
                    id='username'
                    onClick={handleSelectClick}
                    onChange={(e) => handleChange(e, field.name)}
                    required
                    className={`text-light optionSelect   ${
                      selectClicked ? '' : 'p-2'
                    }`}
                    value={formData[field.name] || ''}
                    size={selectClicked ? 4 : 1}
                  >
                    <option className='text-light' value=''>
                      Select Name
                    </option>
                    {filteredUserName?.map((item, index) => {
                      return (
                        <option className='text-light' key={item} value={item}>
                          {item}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className='w-50 mb-4  '>
                <label className='label text-left' htmlFor={field.name}>
                  {field.label}
                </label>
                <br />
                <input
                  type={field.type}
                  placeholder={field.label}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(e, field.name)}
                  required={field.required}
                  pattern={field.validation ? field.validation : undefined}
                />
              </div>
            )
          }
        })}
      </div>
      <div className='createFormModal__footer mt-5 mb-3 d-flex gap-2 align-items-center justify-content-center'>
        <Button
          props={{
            handleClick: closeModal,
            icon: 'x',
            buttonTitle: 'Cancel',
            color: '#fff',
          }}
        />
        <Button
          props={{
            status: validateForm(fields) ? '' : 'pointer-event-none',
            handleClick: handleUpdate,
            icon: '',
            buttonTitle: `Save ${type}`,
            color: '#68ECED',
          }}
        />
      </div>
    </div>
  )
}

export default UpdateDocumentForm
