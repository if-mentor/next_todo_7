import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";

export const AppContext = createContext({
  user: { displayName: "" },
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
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError("");
    });
    return unsubscribe;
  }, []);

  const registerUser = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .then((res) => {
        router.push("/top");
      })
      .catch((err) => {
        alert(`Sign-up is failed. Error:${err.message}`);
      });
  };

  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        router.push("/top");
      })
      .catch((err) => {
        alert(`Login is failed. Error:${err.message}`);
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
