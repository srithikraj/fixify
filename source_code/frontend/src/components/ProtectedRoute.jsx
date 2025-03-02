import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ensure correct path
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
