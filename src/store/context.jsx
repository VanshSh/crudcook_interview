import { useState, createContext, useContext, useEffect } from 'react'
import Toasts from '../utils/Toasts'

const ProjectContext = createContext()

export const ProjectContextProvider = ({ children }) => {
  const [data, setData] = useState({
    getData: [],
    loading: false,
    error: null,
  })
  const [viewType, setViewType] = useState({
    title: 'post',
    buttonTitle: 'Create Post',
    type: 'post',
  })

  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: '',
    color: '',
  })

  // Fetching data from API
  const fetchData = async (type) => {
    setData((prev) => ({ ...prev, loading: true, error: null }))
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${type}s`
    )
    if (!response.ok) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: 'Something went wrong',
      }))
      return
    } else {
      const data = await response.json()
      setData((prev) => ({
        ...prev,
        getData: data,
        loading: false,
        error: null,
      }))
    }
  }
  useEffect(() => {
    fetchData(viewType.type)
  }, [viewType.type])

  // Delete post/user
  const deleteData = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${viewType.type}s/${id}`,
      {
        method: 'DELETE',
      }
    )
    if (response.ok) {
      setShowToast((prev) => {
        return {
          ...prev,
          show: !prev.show,
          message: `${viewType.type} deleted successfully`,
          color: 'success',
          type: 'success',
          event: 'delete',
        }
      })
    } else {
      setShowToast((prev) => {
        return {
          ...prev,
          show: !prev.show,
          message: 'Something went wrong',
          color: 'warning',
          type: 'warning',
          event: 'delete',
        }
      })
    }
  }
  return (
    <ProjectContext.Provider
      value={{
        viewType,
        setViewType,
        data,
        deleteData,
        showToast,
        setShowToast,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export const UseProjectContext = () => useContext(ProjectContext)
