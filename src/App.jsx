import { UseProjectContext } from './store/context'
import Navbar from './utils/Navbar'
import Header from './utils/Header'
import PostList from './posts/PostList'
import UserList from './users/UserList'
import ReactDOM from 'react-dom'
import Toasts from './utils/Toasts'
import CreateNewDocumentForm from './utils/CreateNewDocumentForm'

const App = () => {
  const { viewType, data, showFormModal } = UseProjectContext()

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
      type: 'number',
      required: true,
      validation: /^[0-9]+$/,
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
      type: 'number',
      required: true,
      validation: /^[0-9]+$/,
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
            <CreateNewDocumentForm type='Post' />
          )}
          {viewType.type === 'user' && showFormModal && (
            <CreateNewDocumentForm type='User' fields={newUserData} />
          )}
        </div>,
        document.getElementById('formModal')
      )}
    </div>
  )
}

export default App
