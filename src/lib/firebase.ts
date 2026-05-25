import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqquGqYXV_sgnpahLUYZZfX8dvEKq2nWI",
  authDomain: "xtech-main.firebaseapp.com",
  projectId: "xtech-main",
  storageBucket: "xtech-main.firebasestorage.app",
  messagingSenderId: "1079962360734",
  appId: "1:1079962360734:web:fce8d46de6a779910d948f",
  measurementId: "G-GCJLYHS7PB",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics only works in the browser
export const analytics = typeof window !== "undefined"
  ? isSupported().then((yes) => (yes ? getAnalytics(app) : null))
  : null;
