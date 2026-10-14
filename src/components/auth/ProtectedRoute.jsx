import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (user?.role !== "CUSTOMER") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
