import { db } from "./src/firebaseConfig/firebaseConfig.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const auth = getAuth();

// if (localStorage.getItem("role")) {
//   location.href = "../../public/src/pages/dashboard.html";
//   // window.history.back();
// }
onAuthStateChanged(auth, async (user) => {
  if (user) {
    var docSnap = await getDoc(doc(db, "users", user.uid));
    var emailVerify = user.emailVerified;
    localStorage.setItem("fullname", docSnap.data().fname + " " + docSnap.data().lname + " " + docSnap.data().suffixname );
    localStorage.setItem("role", docSnap.data().role);
    localStorage.setItem("verified", emailVerify);
    localStorage.setItem("status", docSnap.data().status);
    
    location.href = "../../public/src/pages/dashboard.html";
  }
  // Login Function
  document.getElementById("login").addEventListener("click", (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: " + errorMessage);
        document.getElementById("errormsg").style.display = "block";
        document.getElementById("errortxt").innerHTML =
          "Invalid Username or Password";
      });
  });
});


document.getElementById("reset_password").addEventListener("click", (e) => {
  var email = document.getElementById("email_forgot").value;
  if (email != "") {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        $("#msg_forgot").addClass("alert-warning")
        $("#msg_forgot").removeClass("alert-danger")
        document.getElementById("msg_forgot").style.display = "block";
        document.getElementById("text_forgot").innerHTML = "Reset password link has been sent to your email.";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        $("#msg_forgot").addClass("alert-danger")
        $("#msg_forgot").removeClass("alert-warning")
        document.getElementById("msg_forgot").style.display = "block";
        document.getElementById("text_forgot").innerHTML = "User Not Found";
      });
  } else {
    var messageHtml = "Please enter valid email.";
    $("#msg_forgot").addClass("alert-danger")
    $("#msg_forgot").removeClass("alert-warning")
    document.getElementById("msg_forgot").style.display = "block";
    document.getElementById("text_forgot").innerHTML = messageHtml;
  }
});
