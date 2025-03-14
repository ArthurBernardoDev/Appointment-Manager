import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthLayout } from "./_layout/auth";
import ProtectedRoute from "./features/auth/protected-route";
import Dashboard from "./features/dashboard";
import Login from "./features/auth/pages/sign-in-page/sign-in.page";
import ForgotPasswordPage from "./features/auth/pages/forgot-password-page";
import ResetPasswordPage from "./features/auth/pages/reset-password-page";
import DentistProfilePage from "./features/auth/pages/dentist-profile-form";
import Register from "./features/auth/pages/sign-out-page/sign-out-page";

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
        path: "/sign-out",
        element: <Register />,
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
      { path: "/dentist-complete", element: <DentistProfilePage /> },
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
