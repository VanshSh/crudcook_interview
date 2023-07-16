import { UseProjectContext } from './store/context'
import Navbar from './utils/Navbar'
import Header from './utils/Header'
import PostList from './posts/PostList'
import UserList from './users/UserList'
import ReactDOM from 'react-dom'

import Toasts from './utils/Toasts'
const App = () => {
  const { viewType, setViewType, data } = UseProjectContext()

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
    </div>
  )
}

export default App
