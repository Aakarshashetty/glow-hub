import React from "react";
import { useAuth } from "../../contexts/auth-context";
import { Navigate, useLocation } from "react-router";

const RequiresAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequiresAuth;
