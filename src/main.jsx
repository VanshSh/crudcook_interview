import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ProjectContextProvider } from './store/context.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProjectContextProvider>
    <App />
  </ProjectContextProvider>
)
