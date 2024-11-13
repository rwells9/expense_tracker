// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB5WkNyz-lCIO8irhtuvsSJSabwVhwDDnE",
    authDomain: "expensetracker-d49a4.firebaseapp.com",
    projectId: "expensetracker-d49a4",
    storageBucket: "expensetracker-d49a4.firebasestorage.app",
    messagingSenderId: "592297030207",
    appId: "1:592297030207:web:7a9a8edbde148236f77e8a"
  };

const app = initializeApp(firebaseConfig);

export default app;
