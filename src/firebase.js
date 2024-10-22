// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBG3Fm5qhyUD0IbJ8LGwnK1wzi35ILUcW8",
  authDomain: "aq-meals.firebaseapp.com",
  projectId: "aq-meals",
  storageBucket: "aq-meals.appspot.com",
  messagingSenderId: "330391687718",
  appId: "1:330391687718:web:281f5bf28c3329905f0ce7",
  measurementId: "G-Z38KVX5SME"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export const db = getFirestore(app);


export const storage = getStorage(app);
