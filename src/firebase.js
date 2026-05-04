// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAWzVFw-WUpC_pNtnu97r4mS23MZd9sAks",
  authDomain: "dreamtrack-20fce.firebaseapp.com",
  projectId: "dreamtrack-20fce",
  storageBucket: "dreamtrack-20fce.firebasestorage.app",
  messagingSenderId: "644838259630",
  appId: "1:644838259630:web:200dca04aa28ade7f2663f",
  measurementId: "G-VK7G8SZVRF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
