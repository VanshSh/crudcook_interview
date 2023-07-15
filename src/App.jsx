import { UseProjectContext } from './store/context'
import Navbar from './utils/Navbar'
const App = () => {
  const { viewType, setViewType } = UseProjectContext()

  return (
    <div className='mainBackground p-5'>
      <Navbar types={['post', 'user']} />
    </div>
  )
}

export default App
