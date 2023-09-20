// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgM5veU0YFhcLRDA6bKZLhxlKwW-E-t38",
  authDomain: "myalbum-81d20.firebaseapp.com",
  projectId: "myalbum-81d20",
  storageBucket: "myalbum-81d20.appspot.com",
  messagingSenderId: "630344803459",
  appId: "1:630344803459:web:9834564679dc8fe83167b6",
  measurementId: "G-EW2SW665MN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
