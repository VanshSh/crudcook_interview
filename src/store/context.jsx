import { useState, createContext, useContext } from 'react'

const ProjectContext = createContext()

export const ProjectContextProvider = ({ children }) => {
  const [viewType, setViewType] = useState({
    title: 'Posts',
    buttonTitle: 'Create Post',
    type: 'post',
  })
  return (
    <ProjectContext.Provider value={{ viewType, setViewType }}>
      {children}
    </ProjectContext.Provider>
  )
}
