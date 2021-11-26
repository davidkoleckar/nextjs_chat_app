import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAf6zi_OAnEWN5KOLXOBoHPdyTottI_6SM",
    authDomain: "chat-app-1f28e.firebaseapp.com",
    projectId: "chat-app-1f28e",
    storageBucket: "chat-app-1f28e.appspot.com",
    messagingSenderId: "117020781193",
    appId: "1:117020781193:web:8cd3c2d2cd486d0562f458"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth =  getAuth();

const provider = new GoogleAuthProvider();

export {db, auth, provider};