import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { db, auth } from "./firebaseConfig/firebaseConfig.js";

document.getElementById("resetPassword").addEventListener("click", (e) => {
  var email = document.getElementById("email").value;
  // var userdata = getDoc(doc(db, "users", user.uid));

  console.log(email);
  // const auth = getAuth();
  // sendPasswordResetEmail(auth, email)
  //   .then(() => {
  //     // Password reset email sent!
  //     // ..
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });


});


