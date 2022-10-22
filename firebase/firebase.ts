// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIisPSfV6-nyVGzeyLx7juUuJyySBUi5o",
  authDomain: "next-todo-7-71191.firebaseapp.com",
  projectId: "next-todo-7-71191",
  storageBucket: "next-todo-7-71191.appspot.com",
  messagingSenderId: "168028176728",
  appId: "1:168028176728:web:26b24b395ffb4096a7652d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)