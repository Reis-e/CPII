// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, createStaffWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createStaffWithEmailAndPassword, connectAuthEmulator } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { doc, setDoc, getDoc, getFirestore, connectFirestoreEmulator,updateDoc, increment } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
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

document.getElementById("save").addEventListener('click', (e) => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const fname = document.getElementById("fname").value
    const lname = document.getElementById("lname").value  
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const add = document.getElementById("add").value
  
    createStaffWithEmailAndPassword(auth, email, password)
    .then((staffCredential) => {
      // Signed in 
      const staff = staffCredential.staff;
      // ...
      console.log("acc creation success")
      getDoc(doc(db, "staffs", staff.uid)).then(docSnap => {
        if (!docSnap.exists()) {
          const staffDBRef = doc(db, "staffs", staff.uid);
            setDoc(staffDBRef, {
              username: username,
              fname: fname,
              lname: lname,
              email: email,
              phone: phone,
              add: add,
            }, { merge: true }) 

            console.log("success");
        }

      });
    })
  
  
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode + errorMessage);
    });
}); 

  
  
