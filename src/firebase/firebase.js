// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1jLXoxauf54Qi844hFPnrZXuk8qUJBlc",
  authDomain: "moviegpt-bd9ff.firebaseapp.com",
  projectId: "moviegpt-bd9ff",
  storageBucket: "moviegpt-bd9ff.appspot.com",
  messagingSenderId: "703553765058",
  appId: "1:703553765058:web:29e4daebcc86f431ff455b",
  measurementId: "G-00EKFPPKG6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
