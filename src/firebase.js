// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBG3Fm5qhyUD0IbJ8LGwnK1wzi35ILUcW8",
  authDomain: "aq-meals.firebaseapp.com",
  projectId: "aq-meals",
  storageBucket: "aq-meals.appspot.com",
  messagingSenderId: "330391687718",
  appId: "1:330391687718:web:281f5bf28c3329905f0ce7",
  measurementId: "G-Z38KVX5SME"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Firestore (Database) and export it
export const db = getFirestore(app);

// Initialize Firebase Storage (for images/files) and export it
export const storage = getStorage(app);
