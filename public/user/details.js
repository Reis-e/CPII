// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
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


onAuthStateChanged(auth, async (user) => {
    if (user) {
        var userdata = await getDoc(doc(db, "users", user.uid));
        try {
            console.log(userdata);
            var fname = userdata.data().fname;
            var lname = userdata.data().lname;
            var phone = userdata.data().phone;
            var add = userdata.data().add;
            var email = userdata.data().email;

            console.log(fname);
            console.log(lname);
            console.log(phone);
            console.log(add);

            document.getElementById('fname').value = fname;
            document.getElementById('lname').value = lname;
            document.getElementById('add').value = add;
            document.getElementById('phone').value = phone;
            document.getElementById('email').value = email;
        } catch (error) {
            
        }
     }
  });

document.getElementById("btnsave").addEventListener('click', (e) => {
    alert("button save");
    // onAuthStateChanged(auth, async (user) => {
    //     try {
    //         var fname = document.getElementById('fname').value;
    //         var lname = document.getElementById('lname').value;
    //         var add = document.getElementById('add').value;
    //         var phone = document.getElementById('phone').value;
    //         var email = document.getElementById('email').value; //?

    //         const userDBRef = doc(db, "users", user.uid);
    //             setDoc(userDBRef, {
    //             fname: fname,
    //             lname: lname,
    //             add: add,
    //             phone: phone,
    //             email: email,
    //             }, { merge: true }) //pag wala to, madedelete ung ibang fields

    //             console.log("Success");
            
    //     } catch (error){

    //     }
    // });
});
