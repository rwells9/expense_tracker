// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5WkNyz-lCIO8irhtuvsSJSabwVhwDDnE",
  authDomain: "expensetracker-d49a4.firebaseapp.com",
  projectId: "expensetracker-d49a4",
  storageBucket: "expensetracker-d49a4.appspot.com", 
  messagingSenderId: "592297030207",
  appId: "1:592297030207:web:7a9a8edbde148236f77e8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
