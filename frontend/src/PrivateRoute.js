import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
