// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB5WkNyz-lCIO8irhtuvsSJSabwVhwDDnE",
  authDomain: "expensetracker-d49a4.firebaseapp.com",
  projectId: "expensetracker-d49a4",
  storageBucket: "expensetracker-d49a4.firebasestorage.app",
  messagingSenderId: "592297030207",
  appId: "1:592297030207:web:7a9a8edbde148236f77e8a"
};
  
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Load current user's data
  auth.onAuthStateChanged((user) => {
    if (user) {
      document.getElementById("email-display").textContent = user.email;
    }
  });
  
  // Logout Function
  function logout() {
    auth.signOut().then(() => {
      alert("Logged out successfully");
      window.location.href = "login.html";
    }).catch((error) => {
      console.error("Error logging out:", error);
    });
  }
  
  // Navigate to Reports
  function goToReports() {
    window.location.href = "reports.html";
  }
  
  // Update Username
  function updateUsername() {
    const newUsername = document.getElementById("new-username").value;
  
    if (newUsername) {
      const user = auth.currentUser;
      db.collection("users").doc(user.uid).update({
        username: newUsername
      }).then(() => {
        alert("Username updated successfully!");
      }).catch((error) => {
        console.error("Error updating username:", error);
      });
    } else {
      alert("Please enter a new username.");
    }
  }
  
  // Change Password
  function updatePassword() {
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (newPassword && newPassword === confirmPassword) {
      const user = auth.currentUser;
      user.updatePassword(newPassword).then(() => {
        alert("Password changed successfully!");
      }).catch((error) => {
        console.error("Error updating password:", error);
      });
    } else {
      alert("Passwords do not match or are empty.");
    }
  }
  