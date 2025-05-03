
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const RequireAuth: React.FC = () => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the current location to
    // redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default RequireAuth;
