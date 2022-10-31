import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const AppContext = createContext({
  user: { displayName: '' },
  logoutUser: () => {},
  forgotPassword: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    logoutUser,
    forgotPassword,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
