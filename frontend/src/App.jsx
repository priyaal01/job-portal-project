import './App.css'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Browse from './components/Browse';
import Home from './components/Home';
import JobDetails from './components/JobDetails';
import Jobs from './components/Jobs';
import Notfound from './components/Notfound';
import Profile from './components/profile/Profile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },

  {
    path: '/login',
    element: <Login />
  },

  {
    path: '/signup',
    element: <Signup />
  },

  {
    path: '*',
    element: <Notfound />
  },

  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/details/:id',
    element:<JobDetails/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },

  {
    path:'/profile',
    element:<Profile/>
  }

]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
