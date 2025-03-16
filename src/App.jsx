import { createBrowserRouter, useRouteError } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/paste'
import ViewPaste from './components/ViewPaste'
import { RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(
  [{
    path: '/',
    element: 
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <Home />
    </div>
  },
  {
    path: '/pastes',
    element:
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <Paste />
    </div>
  },
  {
    path: '/pastes/:id',
    element: 
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <ViewPaste />
    </div>
  }]
)

function App() {
  
  return (
    <div className='bg-[#050e1a] h-screen p-2'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App