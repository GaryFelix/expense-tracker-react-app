// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_UUzXzeLO4rsvRXleTxz7u0ke686N0NE",
  authDomain: "expense-tracker-6a0f5.firebaseapp.com",
  projectId: "expense-tracker-6a0f5",
  storageBucket: "expense-tracker-6a0f5.appspot.com",
  messagingSenderId: "505180169908",
  appId: "1:505180169908:web:d3561d5a06f5f19c5b59e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); 