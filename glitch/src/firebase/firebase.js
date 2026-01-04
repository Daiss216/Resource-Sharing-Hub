import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRr3cHgIS7zpcVYRMczE_1sjT9aTVHcRM",
  authDomain: "resource-sharing-hub-a898d.firebaseapp.com",
  projectId: "resource-sharing-hub-a898d",
  storageBucket: "resource-sharing-hub-a898d.firebasestorage.app",
  messagingSenderId: "508536230060",
  appId: "1:508536230060:web:8f5f42ba8c7890279a4f09",
  measurementId: "G-JET523C5C4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export { app, auth };
