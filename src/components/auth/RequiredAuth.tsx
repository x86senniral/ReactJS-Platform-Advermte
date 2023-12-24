import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'firebase/auth'; // Import the User type

type RequireAuthProps = {
  children: React.ReactNode;
  authUser: User | null;
};

const RequireAuth = ({ children, authUser }: RequireAuthProps) => {
  if (!authUser) {
    // User not signed in, redirect to sign-in page
    return <Navigate to="/signin" />;
  }

  // User is signed in, render the children components
  return <>{children}</>;
};

export default RequireAuth;
