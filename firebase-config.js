// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ضع القيم الحقيقية لمشروعك ووجّهتي هنا
const firebaseConfig = {
    apiKey: "AIzaSyCbH9SklcqEyqo-__bWUa4c7Y6fgTtFag8",
    authDomain: "wajhatye.firebaseapp.com",
    projectId: "wajhatye",
    storageBucket: "wajhatye.firebasestorage.app",
    messagingSenderId: "815488309065",
    appId: "1:815488309065:web:94bdd1b86613e8f19e6c98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, onAuthStateChanged, signOut, collection, addDoc, getDocs, query, where };