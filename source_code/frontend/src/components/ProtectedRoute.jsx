// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useContext(AuthContext);

//   // Redirect to signin if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/unauthorized" />;
//   }

//   // If allowedRoles is provided and user's role isn't included, redirect to an unauthorized page
//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  // If auth state is still loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to unauthorized if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If allowedRoles is provided and user's role isn't included, redirect to unauthorized page
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;

