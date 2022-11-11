// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { doc, getDoc, getFirestore, } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
//remove emulator for live

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZggo2OL7cKkn9tgPSCjkl7ys2kxJz7RQ",
  authDomain: "eproseso-3f013.firebaseapp.com",
  projectId: "eproseso-3f013",
  storageBucket: "eproseso-3f013.appspot.com",
  messagingSenderId: "249415128217",
  appId: "1:249415128217:web:a17123c8c36298aa699408",
  measurementId: "G-Z83PXPVEXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();
//connectAuthEmulator(auth, "http://localhost:9099"); //remove for live testing
const db = getFirestore();
//connectFirestoreEmulator(db, 'localhost', 8080); //remove for live testing



onAuthStateChanged(auth, async (user) => {

    if (user) {
        var userdata = await getDoc(doc(db, "users", user.uid));
        try {
            console.log(userdata.data().email);
            var email = userdata.data().email;
            localStorage.setItem("email" , email);

            document.getElementById('email').innerHTML = email;
            
        } catch (error) {
            console.log(error);
            
        }
        }
});

document.getElementById("btnSend").addEventListener('click', (e) => {
    var email = localStorage.getItem("email");
    sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Password reset has been sent to your email.")
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode)
    // ..
  });
    
});
