import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {doc, onSnapshot, serverTimestamp, setDoc} from 'firebase/firestore';
import {createContext, useContext, useEffect, useState} from 'react';

import {useFirebaseContext} from './FirebaseProvider';

export const AuthContext = createContext({});

const PROFILE_COLLECTION = 'users';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState();
  const [authLoading, setAuthLoading] = useState(true);
  const [authErrorMessages, setAuthErrorMessages] = useState();

  const {myAuth, myFS} = useFirebaseContext();

  useEffect(() => {
    if (myAuth) {
      const unsubscribe = onAuthStateChanged(myAuth, (user) => {
        setUser(user);
        setAuthLoading(false);
      });
      return unsubscribe;
    }
  }, [myAuth]);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    const docRef = doc(myFS, PROFILE_COLLECTION, user.uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      setProfile(docSnap.data());
    });

    return unsubscribe;
  }, [user, myFS]);

  // REGISTRO CORRIGIDO
  const registerFunction = async (email, password, nome, sobrenome, dataNascimento) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(myAuth, email, password);
      const user = userCredential.user;

      await setDoc(doc(myFS, 'users', user.uid), {
        uid: user.uid,
        email,
        nome,
        sobrenome,
        dataNascimento,
        dateCreated: serverTimestamp(),
      });

      return true;
    } catch (ex) {
      setAuthErrorMessages([ex.message]);
      return false;
    }
  };

  const loginFunction = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(myAuth, email, password);
      setUser(userCredential.user);
      return true;
    } catch (ex) {
      setAuthErrorMessages([ex.message]);
      return false;
    }
  };

  const logoutFunction = async () => {
    await signOut(myAuth);
    setUser(null);
  };

  if (authLoading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        authErrorMessages,
        login: loginFunction,
        logout: logoutFunction,
        register: registerFunction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};