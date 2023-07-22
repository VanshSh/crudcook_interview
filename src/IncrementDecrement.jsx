import React, { useEffect, useState } from 'react'

const IncrementDecrement = () => {
  const [count, setCount] = useState(1)
  const [btnStatus, setBtnStatus] = useState({
    increase: false,
    decrease: true,
  })

  const increase = () => {
    setCount((prevCount) => {
      return prevCount + 1
    })
  }

  const decrease = () => {
    setCount((prevCount) => {
      return prevCount - 1
    })
  }

  useEffect(() => {
    document.getElementById('increase').addEventListener('click', increase)
    document.getElementById('decrease').addEventListener('click', decrease)

    return () => {
      document.getElementById('increase').removeEventListener('click', increase)
      document.getElementById('decrease').removeEventListener('click', decrease)
    }
  }, [])

  useEffect(() => {
    if (count === 1) {
      setBtnStatus((prev) => {
        return {
          ...prev,
          decrease: false,
          increase: true,
        }
      })
    } else if (count === 8) {
      setBtnStatus((prev) => {
        return {
          ...prev,
          increase: false,
          decrease: true,
        }
      })
    }
  }, [count])

  return (
    <div className='incrementDecrementDiv'>
      <input type='number' value={count} />
      <div>
        <button disabled={!btnStatus.increase} id='increase'>
          Up
        </button>
        <button disabled={!btnStatus.decrease} id='decrease'>
          Down
        </button>
      </div>
    </div>
  )
}

export default IncrementDecrement
