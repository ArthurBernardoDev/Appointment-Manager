import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Register from './features/Auth/Register'
import { AuthLayout } from './_layout/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <p>error</p>,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <p>not found</p>,
  },
])