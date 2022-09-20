console.log('send help')
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import{
    collection,
    getFirestore, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBZggo2OL7cKkn9tgPSCjkl7ys2kxJz7RQ",
    authDomain: "eproseso-3f013.firebaseapp.com",
    projectId: "eproseso-3f013",
    storageBucket: "eproseso-3f013.appspot.com",
    messagingSenderId: "249415128217",
    appId: "1:249415128217:web:a17123c8c36298aa699408",
    measurementId: "G-Z83PXPVEXT"
  };

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

initializeApp(firebaseConfig)
const db = getFirestore() //db connection
const ref = collection(db, 'admin')//refer to collection
getDocs(ref) //retireve docs 
  .then((snapshot)=>{
    console.log(snapshot.docs)

  })
