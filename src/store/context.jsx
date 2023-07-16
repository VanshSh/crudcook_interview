import { useState, createContext, useContext, useEffect } from 'react'

const ProjectContext = createContext()

export const ProjectContextProvider = ({ children }) => {
  const [allUserName, setAllUserName] = useState([])
  const [data, setData] = useState({
    getData: [],
    loading: false,
    error: null,
  })
  const [showFormModal, setShowFormModal] = useState(false)
  const [showUpdateModalForm, setshowUpdateModalForm] = useState(false)
  const [currentPostData, setCurrentPostData] = useState({})
  const [currentUserData, setCurrentUserData] = useState({})
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
  // GET All user name

  async function getAllUserName() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (response.ok) {
      const data = await response.json()
      const userList = data.map(({ name }) => name)
      setAllUserName(userList)
    } else {
      throw new Error('Something went wrong')
    }
  }

  // GET Req from API
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

  // DELETE post/user
  const deleteData = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${viewType.type}s/${id}`,
      {
        method: 'DELETE',
      }
    )
    if (response.ok) {
      fetchData(viewType.type)
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

  // POST new post/user
  const createNewDocument = async (data) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${viewType.type}s`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
    if (response.ok) {
      fetchData(viewType.type)
      setShowToast((prev) => {
        return {
          ...prev,
          show: !prev.show,
          message: `${viewType.type} created successfully`,
          color: 'success',
          type: 'success',
          event: 'create',
        }
      })
      setShowFormModal(!showFormModal)
    } else {
      setShowToast((prev) => {
        return {
          ...prev,
          show: !prev.show,
          message: 'Something went wrong',
          color: 'warning',
          type: 'warning',
          event: 'create',
        }
      })
      setShowFormModal(!showFormModal)
    }
  }

  // PUT update a document
  const updateDocument = async (data) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/${viewType.type}s/${data.id}`,

      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
    const result = await response.json()
    if (response.ok) {
      setshowUpdateModalForm((prev) => !prev)

      fetchData(viewType.type)
      setShowToast((prev) => {
        return {
          ...prev,
          show: !prev.show,
          message: `${viewType.type} updated successfully`,
          color: 'success',
          type: 'success',
          event: 'update',
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
          event: 'update',
        }
      })
      setshowUpdateModalForm((prev) => !prev)
    }
  }

  useEffect(() => {
    fetchData(viewType.type)
    getAllUserName()
  }, [viewType.type])

  return (
    <ProjectContext.Provider
      value={{
        viewType,
        setViewType,
        data,
        deleteData,
        showFormModal,
        setShowFormModal,
        showToast,
        setShowToast,
        createNewDocument,
        showUpdateModalForm,
        setshowUpdateModalForm,
        updateDocument,
        currentPostData,
        setCurrentPostData,
        currentUserData,
        setCurrentUserData,
        allUserName,
        setAllUserName,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export const UseProjectContext = () => useContext(ProjectContext)
