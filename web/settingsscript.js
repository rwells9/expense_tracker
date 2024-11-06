// Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
  