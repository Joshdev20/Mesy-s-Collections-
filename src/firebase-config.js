// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi3v3ibZKHi5ld6LpZptMshzSEWeWqi14",
  authDomain: "mesy-s-collections.firebaseapp.com",
  projectId: "mesy-s-collections",
  storageBucket: "mesy-s-collections.appspot.com",
  messagingSenderId: "93688896251",
  appId: "1:93688896251:web:b64f31f767c3b8815cee5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
