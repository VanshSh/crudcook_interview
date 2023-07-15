import { UseProjectContext } from './store/context'
import Navbar from './utils/Navbar'
import Header from './utils/Header'
const App = () => {
  const { viewType, setViewType } = UseProjectContext()

  return (
    <div className='mainBackground p-5'>
      <Navbar types={['post', 'user']} />
      <Header props={viewType} />
    </div>
  )
}

export default App
