// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase'; // Import your Firebase configuration

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import your Firebase auth instance

const AuthContext = createContext(); // Create the AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user information

  // Function to log out the user            
  const logout = async () => {
    return auth.signOut(); // Sign out from Firebase
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update user state based on authentication status
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
