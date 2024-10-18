import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import according to your project structure

const AuthGuard = ({ children }) => {
  const { user } = useAuth(); // Assuming you have a context that provides user info

  return user ? children : <Navigate to="/signin" />;
};

export default AuthGuard;
