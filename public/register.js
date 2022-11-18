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
    
    location.href = "./src/pages/dashboard.html";
    
  }
});

// Registration Function
document.getElementById("signup").addEventListener("click", (e) => {
  // const username = document.getElementById("username").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const middlename = document.getElementById("middlename").value;
  const suffixname = document.getElementById("suffixname").value;
  const email = document.getElementById("email_register").value;
  const password = document.getElementById("password_register").value;
  const confirmpassword = document.getElementById("confirmpassword").value;
  const address = document.getElementById("address").value;
  const birthplace = document.getElementById("birthplace").value;
  const birthdate = document.getElementById("birthdate").value;
  const civilstatus = document.getElementById("civilstatus").value;
  const mobileno = document.getElementById("mobileno").value;
  const precinctno = document.getElementById("precinctno").value;

  // let valid = true;
  // $('[required]').each(function() {
  //   if ($(this).is(':invalid') || !$(this).val()) valid = false;
  // })
  // if (!valid) {
  //   // alert("error please fill all fields!");
  //   $("#firstname").addClass("is-invalid");
  //   $("#lastname").addClass("is-invalid");
  //   // $("#middlename").addClass("is-invalid");
  //   // $("#suffixname").addClass("is-invalid");
  //   $("#email_register").addClass("is-invalid");
  //   $("#password_register").addClass("is-invalid");
  //   $("#confirmpassword").addClass("is-invalid");
  //   $("#address").addClass("is-invalid");
  //   $("#birthplace").addClass("is-invalid");
  //   $("#birthdate").addClass("is-invalid");
  //   $("#civilstatus").addClass("is-invalid");
  //   $("#mobileno").addClass("is-invalid");
  //   $("#precinctno").addClass("is-invalid");
  // } else {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userDBRef = doc(db, "users", user.uid);
      const emailVerify = user.emailVerified;

      localStorage.setItem("role", "user");
      localStorage.setItem("verified", emailVerify);
      localStorage.setItem("status", "Active");
      localStorage.setItem(
        "fullname",
        firstname + " " + lastname + " " + suffixname
      );

      setDoc(
        userDBRef,
        {
          fname: firstname,
          lname: lastname,
          middlename: middlename,
          suffixname: suffixname,
          email: email,
          add: address,
          birthplace: birthplace,
          birthdate: Timestamp.fromDate(new Date(birthdate)),
          civilstatus: civilstatus,
          phone: mobileno,
          precinct: precinctno,
          role: "user",
          status: "Active",
        },
        { merge: true }
      ).then((value) => {
        var user = auth.currentUser;
        sendEmailVerification(user);
        location.href = "./src/pages/dashboard.html";
      });
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      let errorMessage = [];
      let messageHtml = "";

      console.log(errorCode);

      if (errorCode === "auth/email-already-in-use") {
        errorMessage.push("Email already in use!");
      }

      if (errorCode === "auth/network-request-failed") {
        errorMessage.push("Without network connection!");
      }

      if (errorCode === "auth/invalid-email") {
        errorMessage.push("Invalid E-mail!");
      }

      if (
        errorCode === "auth/invalid-password" ||
        errorCode === "auth/weak-password"
      ) {
        errorMessage.push("Weak Password");
      }

      errorMessage.forEach(function (message) {
        messageHtml += "<li>" + message + "</li>";
      });

      document.getElementById("errormsg").style.display = "block";
      document.getElementById("errormsg").innerHTML = messageHtml;
    });
  // };

});
