import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDleI7rtS26EEw8xQbMeIVpXfBuDomG9ok",
  authDomain: "fishmarket-529f9.firebaseapp.com",
  projectId: "fishmarket-529f9",
  storageBucket: "fishmarket-529f9.appspot.com",
  messagingSenderId: "285362446519",
  appId: "1:285362446519:web:03b418e328947bdf07ed32",
  measurementId: "G-F2C6SCPQ15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const firestore = getFirestore(app);

export { firestore, collection, getDocs, addDoc };
