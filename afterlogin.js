import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIMWero_vAVT9tuSWsf3ZfMXVMCkn7oo8",
  authDomain: "cvfy-20a78.firebaseapp.com",
  projectId: "cvfy-20a78",
  storageBucket: "cvfy-20a78.firebasestorage.app",
  messagingSenderId: "383629739362",
  appId: "1:383629739362:web:95b2d0e72af76b1e34983b",
  measurementId: "G-5FZ2GD74DM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


const firstsec = document.querySelectorAll('.firstsec');
const secondsec = document.querySelectorAll('.secondsec');
const boxDrop = document.querySelectorAll('.boxdrop');
const logoutbutton = document.getElementById('logout');
const google_login = document.getElementById('google');
const google_signup = document.getElementById('google2')


const fun1 = (prop) =>{
  firstsec.forEach(element => {
  element.style.display = prop; 
});
}
const fun2 = (prop) =>{
  secondsec.forEach(element => {
    element.style.display = prop;
  });
}



function updateUserProfile(user) {
  if (user) {
    const displayName = user.displayName || "User";
    document.getElementById('loggedUserName').innerText = displayName;
    
    fun1("none");
    fun2("flex");
  } else {
    fun1("flex");
    fun2("none");
  }
}


onAuthStateChanged(auth, async (user) => {
  if (user) {
      try {
          const docRef = doc(db, "users", user.uid);
          let docSnap = await getDoc(docRef);

          // If it's the first time the user is logging in (either via sign-up or Google sign-in)
          if (!docSnap.exists()) {
              console.log("First-time sign-in. Creating Firestore document...");

              // Create user data object for new user
              const newUserData = {
                  name: user.displayName || "New User", // Google sign-in might not have displayName
                  email: user.email,
                  createdAt: new Date(),
              };

              // Create user document in Firestore
              await setDoc(docRef, newUserData);
              docSnap = { exists: true, data: () => newUserData }; // Simulate document for UI update
          }

          if (docSnap.exists()) {
              const userData = docSnap.data();
              document.getElementById('loggedUserName').innerText = userData.name;
              fun1("none");
              fun2("flex");
          }
      } catch (error) {
          console.error("Error handling user data:", error);
          fun1("flex");
          fun2("none");
      }
  } else {
      console.log("No user signed in.");
      fun1("flex");
      fun2("none");
  }
});



  document.addEventListener("DOMContentLoaded", () => {

    if(logoutbutton){
        logoutbutton.addEventListener('click', (event) => {
          event.preventDefault()
          localStorage.removeItem('loggedInUserId'); 

          signOut(auth)
            .then(() => {
          
              if (firstsec && secondsec) {
               fun1("flex");
                fun2("none");
              } else {
                console.error('Element with class "secondsec" not found.');
              }

      
            })
            .catch((error) => {
              console.error('Error signing out:', error);

            });
        });
    }else{
        console.error("Logout button not found")
    }
  });

  const account = document.querySelector(".material-symbols-outlined");
  account.addEventListener('click', () => {
   boxDrop.forEach(element => {
    if (element) {

      if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'flex'; 
        element.style.justifyContent = 'center'
        element.style.alignItems = 'center'
      } else {
        element.style.display = 'none';
      }
    } else {
      console.error('Dropdown element not found.');
    }
   })
  });



