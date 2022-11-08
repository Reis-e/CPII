// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
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


//BARANGAY ID

/*const form = document.querySelector("form");
const fullName = document.querySelector("fullName");
const add = document.querySelector("add");
const bday = document.querySelector("bday");
const birthPlace = document.querySelector("birthPlace");
const civilStatus = document.querySelector("civilStatus");
const precinct = document.querySelector("precinct");
const batisNum = document.querySelector("batisNum");
const emergencyName = document.querySelector("emergencyName");
const relation = document.querySelector("relation");
const emergencyPhone = document.querySelector("emergencyPhone");*/

document.getElementById("idSubmit").addEventListener('click', (e) => {
    onAuthStateChanged(auth, async (transac) => {
        try {
            console.log("okay");
            //var form = document.getElementById('form').value;
            var fullName = document.getElementById('fullName').value;
            var add = document.getElementById('add').value;
            var bday = document.getElementById('bday').value;
            var birthPlace = document.getElementById('birthPlace').value;
            var civilStatus = document.getElementById('civilStatus').value;
            var precinct = document.getElementById('precinct').value;
            var batisNum = document.getElementById('batisNum').value;
            var emergencyName = document.getElementById('emergencyName').value;
            var relation = document.getElementById('relation').value;
            var emergencyPhone = document.getElementById('emergencyPhone').value;

            const transacDB = doc(db, "transactions");
                /*setDoc*/(transacDB, {
                //form: form,
                fullName: fullName,
                add: add,
                bday: bday,
                birthPlace: birthPlace,
                civilStatus: civilStatus,
                precinct: precinct,
                batisNum: batisNum,
                emergencyName: emergencyName,
                relation: relation,
                emergencyPhone: emergencyPhone,
                }, { merge: true }) 
                console.log(transacDB);
            
        } catch (error){
            console.log("something isn't right");
        }
    });
});

/*submit.addEventListener("click", (e) => {
    e.preventDefault();
    db.collection('transactions')
    .doc()
    .set({
        fullName: fullName.value,
        add: add.value,
        bday: bday.value,
        birthPlace: birthPlace.value,
        civilStatus: civilStatus.value,
        precinct: precinct.value,
        batisNum: batisNum.value,
        emergencyName: emergencyName.value,
        relation: relation.value,
        emergencyPhone: emergencyPhone.value,

    })
    
    .then(() => {
        form.reset();
        console.log("submitted");
        

    });
}); 
*/    
  
  
