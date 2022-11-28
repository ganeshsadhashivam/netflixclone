// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-fMYjjdtbR8Ge4GGwQWfbY5FnadCQ1e8",
  authDomain: "netflixclone-290e5.firebaseapp.com",
  projectId: "netflixclone-290e5",
  storageBucket: "netflixclone-290e5.appspot.com",
  messagingSenderId: "893034419095",
  appId: "1:893034419095:web:d0089ec8d2212c756a2ad2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

type AuthContextType = ReturnType<typeof useProvideAuth>;

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext) ?? ({} as AuthContextType);

function useProvideAuth() {
  // const user => null
  // 1.firsebase still fetching the info async operation
  //2.when the user is logged out

  //user is logged in => User
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user ? setUser(user) : setUser(null);
      setLoading(false);
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      return user;
    });

  const signOutUser = () => signOut(auth);
  // const signOutUser = () => signOut(auth).then(() => setUser(null));
  return {
    signUp,
    user,
    signIn,
    signOut: signOutUser,
    loading,
  };
}
