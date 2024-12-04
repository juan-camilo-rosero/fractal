"use client";
import { auth } from "./firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

// Función para buscar si existe un usuario con el correo electrónico proporcionado
export const searchEmail = async (email) => {
  try {
    console.log("buscando el correo " + email);

    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    console.log(signInMethods);

    return signInMethods.length > 0; // Retorna true si existen métodos de inicio de sesión, de lo contrario, false
  } catch (e) {
    console.error("Error al buscar el correo electrónico: ", e);
    return false; // Retorna false en caso de error
  }
};

// Función para iniciar sesión con correo electrónico y contraseña
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    return userCredential.user;
  } catch (e) {
    throw new Error(e.message);
  }
};

// Función para crear una cuenta con correo electrónico y contraseña
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (e) {
    throw new Error(e.message);
  }
};

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