import React from 'react'
import { UseProjectContext } from '../store/context'
import SpinnerComp from '../utils/Spinner'
import Pagination from '../utils/Pagination'

const PostList = ({ data }) => {
  const {
    deleteData,
    showUpdateModalForm,
    setshowUpdateModalForm,
    setCurrentPostData,
  } = UseProjectContext()
  const { getData, loading, error } = data
  const openModal = (userId, title, id, body) => {
    setshowUpdateModalForm((prev) => !prev)
    setCurrentPostData((prev) => ({
      ...prev,
      userid: `${userId}`,
      title,
      id,
      username: '',
      body,
    }))
  }
  return (
    <div className='showListDiv py-4 px-5'>
      <div className='row'>
        <p className='showListTitle col-3 text-center'>USER ID</p>
        <p className=' text-left showListTitle col-6'>TITLE</p>
        <p className='showListTitle col-3 text-center'>ACTIONS</p>
      </div>
      {loading ? (
        <div className='d-flex justify-content-center'>
          <SpinnerComp />
        </div>
      ) : (
        <Pagination itemsPerPage='6'>
          {getData.map(({ userId, title, id, body }) => {
            return (
              <div key={id} className='row my-3'>
                <p className='showListValues col-3 text-center'>#{id}</p>
                <p className='showListValues text-left col-6'>{title}</p>
                <p className='showListValues d-flex align-item-center justify-content-center gap-5 col-3'>
                  <span
                    className='pointer'
                    onClick={() => openModal(id, title, userId, body)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M12 20H21'
                        stroke='#D6D6D6'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04016C19.0692 3.14676 19.303 3.30302 19.5 3.5C19.697 3.69698 19.8532 3.93083 19.9598 4.18821C20.0665 4.44558 20.1213 4.72142 20.1213 5C20.1213 5.27858 20.0665 5.55442 19.9598 5.81179C19.8532 6.06916 19.697 6.30302 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z'
                        stroke='#D6D6D6'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                  <span className='pointer' onClick={() => deleteData(id)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='22'
                      viewBox='0 0 20 22'
                      fill='none'
                    >
                      <path
                        d='M1 4.99991H3H19'
                        stroke='#D6D6D6'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5M17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5H17Z'
                        stroke='#D6D6D6'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M8 9.99991V15.9999'
                        stroke='#D6D6D6'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M12 9.99991V15.9999'
                        stroke='#D6D6D6'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                </p>
              </div>
            )
          })}
        </Pagination>
      )}

      {error && <p>{error}</p>}
    </div>
  )
}

export default PostList
