// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebase.config";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const providerGoogle = new GoogleAuthProvider();
auth.languageCode = "it";
providerGoogle.addScope("https://www.googleapis.com/auth/contacts.readonly");
