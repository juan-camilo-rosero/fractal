import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "fractal-ed.firebaseapp.com",
  projectId: "fractal-ed",
  storageBucket: "fractal-ed.firebasestorage.app",
  messagingSenderId: "152227118452",
  appId: "1:152227118452:web:feee6be645ef823e224021",
  measurementId: "G-H65NKW4EGZ"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)