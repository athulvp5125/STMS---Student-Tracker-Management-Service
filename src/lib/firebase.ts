
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaKBXbifoTr9qmxixw50CP_hZrtPwucnY",
  authDomain: "sudent-management.firebaseapp.com",
  projectId: "sudent-management",
  storageBucket: "sudent-management.firebasestorage.app",
  messagingSenderId: "547733868848",
  appId: "1:547733868848:web:6ac42007dcb82abca1f8f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
