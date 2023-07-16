import React, { useState } from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'

const Pagination = ({ itemsPerPage, children }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalItems = React.Children.count(children) - 1
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = React.Children.toArray(children).slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      {currentItems}
      <div className='d-flex justify-content-center'>
        <BootstrapPagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <BootstrapPagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
              className='d-flex justify-content-center'
            >
              {index + 1}
            </BootstrapPagination.Item>
          ))}
        </BootstrapPagination>
      </div>
    </div>
  )
}

export default Pagination
