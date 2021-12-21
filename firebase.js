// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAoBKcsdSSXPt4SoSHC0eks7GdsfQ9Ps2E",
  authDomain: "signal-clone-49319.firebaseapp.com",
  projectId: "signal-clone-49319",
  storageBucket: "signal-clone-49319.appspot.com",
  messagingSenderId: "105097846323",
  appId: "1:105097846323:web:4b38852b2e9c79718d0d46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };
