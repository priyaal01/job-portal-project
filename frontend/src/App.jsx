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
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import AdminJobSetup from './components/admin/AdminJobSetup';
import Applicants from './components/admin/Applicants';

const appRouter = createBrowserRouter([
  // client side 
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
  },

  // admin side

   {
    path:'/admin/company',
    element:<Companies/>
  },
  {
    path:'/admin/companies/create',
    element:<CompanyCreate/>
  },
  {
    path:'/admin/company/:id',
    element:<CompanySetup/>
  },
  {
    path:'/admin/jobs',
    element:<AdminJobs/>
  },
  {
    path:'/admin/job/create',
    element:<AdminJobSetup/>
  },
   {
    path:'/admin/job/:id/applicant',
    element:<Applicants/>
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
