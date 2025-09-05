import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "firebase/auth";

// Firebase and Authentication setup
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    // Attempt to sign in with the custom token if available
    const signInWithToken = async () => {
      if (initialAuthToken) {
        try {
          await signInWithCustomToken(auth, initialAuthToken);
        } catch (error) {
          console.error("Custom token sign-in failed:", error);
          // Fallback to anonymous sign-in if custom token fails
          await signInAnonymously(auth);
        }
      } else {
        await signInAnonymously(auth);
      }
    };

    signInWithToken();
    
    // Cleanup the listener
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    // This function is a placeholder. Real login logic would be here.
    // For this example, we assume anonymous sign-in is handled by the effect.
    console.log(`Login function called with email: ${email}`);
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};