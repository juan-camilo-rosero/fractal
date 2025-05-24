import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "tuarriendo-co.firebaseapp.com",
  projectId: "tuarriendo-co",
  storageBucket: "tuarriendo-co.appspot.com",
  messagingSenderId: "871279088517",
  appId: "1:871279088517:web:21be36b836d62e9cfe6aec",
  measurementId: "G-FKMJZXW5NL",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)