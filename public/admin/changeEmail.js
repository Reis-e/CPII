// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, updateEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { doc, setDoc, getDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
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
            var email = userdata.data().email;

            console.log(email);

            document.getElementById('currentEmail').value = email;
        } catch (error) {
            console.log(error);
            
        }
     }
  });

document.getElementById("btnsave").addEventListener('click', (e) => {
    onAuthStateChanged(auth, async (user) => {

        try {
            var newEmail = document.getElementById('NewEmail').value;
            
            console.log("Button Save");

            updateEmail(auth.currentUser, newEmail).then(() => {
                // Email updated!
                
                const userDBRef = doc(db, "users", user.uid);
                    setDoc(userDBRef, {
                    email: newEmail,
                    }, { merge: true } //pag wala to, madedelete ung ibang fields
                    ).then((value) => {
                    
                        alert("Email Changed");
                        console.log("Email Updated in Auth");
                        console.log("Success");
                        window.location.reload();
                    }) 

            }).catch((error) => {
                
                console.log(error);
                alert(error);
                alert("Please logout and login again to change email");

            });

                
            
        } catch (error){
            console.log(error);

        }
    });
});
