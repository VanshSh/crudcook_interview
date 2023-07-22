import React, { useState } from 'react'

import { UseProjectContext } from '../store/context'
import Toast from 'react-bootstrap/Toast'

function Toasts() {
  const { showToast, setShowToast } = UseProjectContext()

  return (
    <div>
      <div xs={6}>
        <Toast
          style={{ background: 'none' }}
          onClose={() => setShowToast((prev) => ({ ...prev, show: false }))}
          show={showToast.show}
          delay={2000}
          autohide
        >
          <Toast.Body>
            <div
              className={`bg-${showToast.color} text-capitalize p-4 m-3 rounded `}
            >
              <p className='fs-6 text-light m-0'>{showToast.message}</p>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </div>
  )
}

export default Toasts
