// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1jLXoxauf54Qi844hFPnrZXuk8qUJBlc",
  authDomain: "moviegpt-bd9ff.firebaseapp.com",
  projectId: "moviegpt-bd9ff",
  storageBucket: "moviegpt-bd9ff.firebasestorage.app",
  messagingSenderId: "703553765058",
  appId: "1:703553765058:web:29e4daebcc86f431ff455b",
  measurementId: "G-00EKFPPKG6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
