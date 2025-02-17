import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Carregando...</p>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;