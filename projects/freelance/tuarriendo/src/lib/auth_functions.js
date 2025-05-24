"use client";
import { auth } from "./firebase.config";
import {
  GoogleAuthProvider,
  OAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

export const continueWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
   
    return user;
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

export const continueWithOutlook = async () => {
  const provider = new OAuthProvider('microsoft.com');
  // Configurar los ámbitos (scopes) para Microsoft
  provider.setCustomParameters({
    prompt: 'consent',
    tenant: 'common'
  });
 
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = OAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
   
    return user;
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

export const continueWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    
    return user;
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserEmail = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      
      if (user) {
        resolve(user.email);
      } else {
        resolve(null);
      }
    }, (error) => {
      reject(error);
    });
  });
};