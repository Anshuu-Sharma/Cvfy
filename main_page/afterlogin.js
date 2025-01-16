import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"


const firebaseConfig = {
    apiKey: "AIzaSyAIMWero_vAVT9tuSWsf3ZfMXVMCkn7oo8",
    authDomain: "cvfy-20a78.firebaseapp.com",
    projectId: "cvfy-20a78",
    storageBucket: "cvfy-20a78.firebasestorage.app",
    messagingSenderId: "383629739362",
    appId: "1:383629739362:web:95b2d0e72af76b1e34983b",
    measurementId: "G-5FZ2GD74DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore()

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId")
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data()
                    document.getElementById('loggedUserName').innerText = userData.name;
                    // document.getElementById('loggedUserEmail').innerText = userData.email
                }

                else {
                    console.log("No document found matching id")
                }
            })
            .catch((error) => {
                console.log("Error getting document")
            })
    }

    else {
        console.log("User Id not found in local storage")
    }
})

  
  
  document.addEventListener("DOMContentLoaded", () => {
    const logoutbutton = document.getElementById('logout');
    if(logoutbutton){
        logoutbutton.addEventListener('click', (event) => {
            event.preventDefault()
          localStorage.removeItem('loggedInUserId'); 
      
          signOut(auth)
            .then(() => {
              const secondsec = document.querySelector('.secondsec'); 
              if (secondsec) {
                secondsec.style.display = 'none';
              } else {
                console.error('Element with class "secondsec" not found.');
              }
    
              window.location.href = 'index.html';
            })
            .catch((error) => {
              console.error('Error signing out:', error);
            });
        });
    }else{
        console.error("Logout button not found")
    }
  });
  
  