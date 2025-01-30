// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASFywyrb94s72-jYZzosLPfPK-7ewQKeE",
  authDomain: "royal-rumble-55fa8.firebaseapp.com",
  projectId: "royal-rumble-55fa8",
  storageBucket: "royal-rumble-55fa8.firebasestorage.app",
  messagingSenderId: "976445583774",
  appId: "1:976445583774:web:902338e4ee5edc77f9a68f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };