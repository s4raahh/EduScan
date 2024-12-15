// firebase.js
import { initializeApp, setLogLevel } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Correct import
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Enable Firebase logging for debugging purposes (optional)
setLogLevel("debug");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4nkGnKkQvrEynu2shesPlBArWClqMVIU",
  authDomain: "eduscan-52c59.firebaseapp.com",
  projectId: "eduscan-52c59",
  storageBucket: "eduscan-52c59.appspot.com",
  messagingSenderId: "256606630851",
  appId: "1:256606630851:android:3bbfe1e3e7100bea4dc376",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize and export Firebase services
export { auth }; // Export the initialized auth with persistence
export const db = getFirestore(app); // Firestore Database
export const database = getDatabase(app); // Realtime Database
export const storage = getStorage(app); // Firebase Storage
