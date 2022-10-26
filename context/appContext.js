import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useRouter } from 'next/router';

import { auth } from '../firebase/firebase';

// type GlobalState = {
//   user: any;
//   isLoading: boolean;
//   error: any;
// };

export const AppContext = createContext({
  user: { displayName: '' },
  error: null,
  signInUser: () => {},
  registerUser: () => {},
  logoutUser: () => {},
  forgotPassword: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError('');
      // setLoading(false);
    });
    return unsubscribe;
  }, []);

  const registerUser = (email, password, name) => {
    // setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .then((res) => {
        // setLoading(false);
        router.push('/top');
      })
      .catch((err) => {
        alert(`Sign-up is failed. Error:${err.message}`);
        // setLoading(false);
      });
  };

  const signInUser = (email, password) => {
    // setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // setLoading(false);
        router.push('/top');
      })
      .catch((err) => {
        alert(`Login is failed. Error:${err.message}`);
        // setLoading(false);
      });
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    // loading,
    error,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
