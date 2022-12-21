import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config.js';



export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {


        const [user, setUser] =useState(null);
        const [loading, setLoading]= useState(false)

          const createUser = (email, password) =>{
            setLoading(true)
            return createUserWithEmailAndPassword(auth, email, password);
          }

          const updateUser= (userInfo) =>{
            return updateProfile(auth.currentUser, userInfo)
          }
           const logOut =() =>{
            setLoading(true)
            return signOut(auth);
           }
          useEffect(()=>{
           const unsubscribe= onAuthStateChanged(auth, currentUser =>{
                console.log('user ready')
                setUser(currentUser);
                setLoading(false)
            })
            return () => unsubscribe();
          },[])

  const signIn= (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

   const authInfo={
    createUser,
    signIn,
    logOut,
    updateUser,
    user,
    loading
    

   }
   
    
    

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;