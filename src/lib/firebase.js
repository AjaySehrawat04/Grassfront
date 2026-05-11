// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYlV6TZd3SzLz5SS5cOJlI8YbMpcFTquM",
  authDomain: "grassfront01.firebaseapp.com",
  projectId: "grassfront01",
  storageBucket: "grassfront01.firebasestorage.app",
  messagingSenderId: "834202838318",
  appId: "1:834202838318:web:9dc6e3ad173825893f46bf",
  measurementId: "G-328HSE73WS",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
