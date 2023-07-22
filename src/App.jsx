import { UseProjectContext } from './store/context'
import Navbar from './utils/Navbar'
import Header from './utils/Header'
import PostList from './posts/PostList'
import UserList from './users/UserList'
import ReactDOM from 'react-dom'
import Toasts from './utils/Toasts'
import CreateNewDocumentForm from './utils/CreateNewDocumentForm'
import UpdateDocumentForm from './utils/UpdateDocumentForm'

const App = () => {
  const {
    viewType,
    data,
    showFormModal,
    showUpdateModalForm,
    currentPostData,
    currentUserData,
  } = UseProjectContext()

  const newUserData = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z ]+$/,
    },
    {
      name: 'username',
      label: 'User name',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z0-9]+$/,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    {
      name: 'phone',
      label: 'Phone no.',
      type: 'text',
      required: true,
      pattern: /^\d{10}$/,
    },
    {
      name: 'street',
      label: 'Street',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z0-9 ]+$/,
    },
    {
      name: 'suite',
      label: 'Suite',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z0-9 ]+$/,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z ]+$/,
    },
    {
      name: 'zipcode',
      label: 'Zipcode',
      type: 'text',
      required: true,
      validation: /^[0-9]+$/,
    },
  ]

  const newPostData = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z0-9]+$/,
    },
    {
      name: 'userid',
      label: 'User ID',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z0-9]+$/,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z0-9 ]+$/,
    },
    {
      name: 'body',
      label: 'Body',
      type: 'text',
      required: true,
      validation: /^[a-zA-Z0-9 ]+$/,
    },
  ]

  return (
    <div className='mainBackground py-2 px-4'>
      <Navbar types={['post', 'user']} />
      <Header props={viewType} />
      {viewType.type === 'post' ? (
        <PostList data={data} />
      ) : (
        <UserList data={data} />
      )}

      {ReactDOM.createPortal(
        <div className='position-absolute top-0 end-0'>
          <Toasts />
        </div>,
        document.getElementById('toastportal')
      )}
      {ReactDOM.createPortal(
        <div className='position-absolute top-50 transform-50 start-50 w-50  '>
          {viewType.type === 'post' && showFormModal && (
            <CreateNewDocumentForm type='Post' fields={newPostData} />
          )}
          {viewType.type === 'user' && showFormModal && (
            <CreateNewDocumentForm type='User' fields={newUserData} />
          )}
        </div>,
        document.getElementById('formModal')
      )}
      {ReactDOM.createPortal(
        <div className='position-absolute top-50 transform-50 start-50 w-50  '>
          {viewType.type === 'post' && showUpdateModalForm && (
            <UpdateDocumentForm
              type='Post'
              fields={newPostData}
              values={currentPostData}
            />
          )}
          {viewType.type === 'user' && showUpdateModalForm && (
            <UpdateDocumentForm
              type='User'
              fields={newUserData}
              values={currentUserData}
            />
          )}
        </div>,
        document.getElementById('formModal')
      )}
    </div>
  )
}

export default App
