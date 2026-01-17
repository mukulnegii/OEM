import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgII4sk3Qfuuz2FLmBhxdfRnfQXyhgBvM",
  authDomain: "automind-e0eb1.firebaseapp.com",
  projectId: "automind-e0eb1",
  storageBucket: "automind-e0eb1.firebasestorage.app",
  messagingSenderId: "890508034460",
  appId: "1:890508034460:web:d27e46008eee7453b50859",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
