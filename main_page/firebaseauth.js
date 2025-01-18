// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import {getAuth, GoogleAuthProvider,  createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000)
}

const signUp = document.getElementById("signUp");
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('remail').value;
    const password = document.getElementById('rpassword').value;
    const name = document.getElementById('rname').value;
    const passwordStrength = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    
    if (!passwordStrength.test(password.trim())) {
        showMessage('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.', 'signUpMessage');
        return;
    }

    const auth = getAuth();
    const db = getFirestore();
    
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        const user = userCredential.user;
        const userData = {
            email: email,
            name: name,
        }
        showMessage("Success!!", 'signUpMessage')
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData).then(()=>{
            window.location.href = 'index.html'
        })
        .catch((error)=>{
            console.error("error writing document", error)
        })

    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists!', 'signUpMessage')
        }
        else if(errorCode == 'auth/invalid-email'){
            showMessage('Invalid Email Address!', 'signUpMessage')
        }
        else if(errorCode == 'auth/weak-password'){
            showMessage('Weak Password! Must be at least 6 characters', 'signUpMessage')
        }
        else{
            showMessage('Unable to create user', 'signUpMessage')
        }
    })
})


const signIn = document.getElementById('signIn')
signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('Login Successful', 'signInMessage')
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid)
        window.location.href = 'index.html';
    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode == 'auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage')
        }
        else{
            showMessage('Account does not exist', 'signInMessage')
        }
    })
})

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const google_login = document.getElementById('google');
const google_signup = document.getElementById('google2')


if (google_login) {
    google_login.addEventListener('click', () => {
        console.log('Google login clicked');
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log('User logged in:', user);
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            })
            .catch((error) => {
                console.error('Error during sign-in:', error);
            });
    });
} else {
    console.error('Google login button not found');
}


if(google_signup){
    google_signup.addEventListener('click', ()=>{
        console.log('Google Sign up clicked')
        signInWithPopup(auth, provider)
            .then((result)=>{
                const user = result.user;
                console.log('User logged in:', user);
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 500);
            })
            .catch((error)=>{
                console.log("Error during sign up", error)
            })
        
    })
}
else{
    console.log("Google signup not foun")
}