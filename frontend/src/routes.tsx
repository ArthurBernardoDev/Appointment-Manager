import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthLayout } from "./_layout/auth";
import ProtectedRoute from "./features/auth/protected-route";
import Dashboard from "./features/dashboard";
import Register from "./features/auth/pages/sign-out";
import Login from "./features/auth/pages/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <p>error</p>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <p>not found</p>,
  },
]);