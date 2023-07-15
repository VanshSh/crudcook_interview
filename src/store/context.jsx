import { useState, createContext, useContext, useEffect } from 'react'

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
  const fetchData = async (type) => {
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
      setData((prev) => ({ ...prev, getData: data }))
    }
  }
  useEffect(() => {
    setData((prev) => ({ ...prev, loading: true, error: null }))
    fetchData(viewType.type)
    setData((prev) => ({ ...prev, loading: false, error: null }))
  }, [viewType.type])

  return (
    <ProjectContext.Provider value={{ viewType, setViewType }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const UseProjectContext = () => useContext(ProjectContext)
