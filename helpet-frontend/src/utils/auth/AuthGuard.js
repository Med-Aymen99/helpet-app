import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Redirect } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;
