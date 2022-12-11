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
  console.log(user)
  if (user) {
    location.href = "./src/pages/dashboard.html";
  } 
});

// Login Function
document.getElementById("login").addEventListener("click", async (e) => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // const userDBref = getDoc(doc(db, "users",   "MscYZ4l8k6M5NivaCndqLrKgkwb2"));
  const userDBRef = doc(db, "users", "superadmin@dispostable.com");
  const userDoc = await getDoc(userDBRef);
  console.log(userDoc.data());

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const emailVerify = user.emailVerified;
      localStorage.setItem("verified", emailVerify);

      var docSnap = getDoc(doc(db, "users", user.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          var role = docSnap.data().role;
          localStorage.setItem("role", docSnap.data().role);
          localStorage.setItem("status", docSnap.data().status);
          localStorage.setItem(
            "fullname",
            docSnap.data().fname + " " + docSnap.data().lname
          );
          // if (user.active) {
          location.href = "./src/pages/dashboard.html";
          // } else {
          //   document.getElementById("errormsg").style.display = "block";
          //   document.getElementById("errortxt").innerHTML =
          //     "Your account has been deactivated. Please contact admin.";
          // }
        }
      });
      // .then(function (user) {
      //   if (user.active) {
      //     location.href = "./src/pages/dashboard.html";
      //   } else {
      //     document.getElementById("errormsg").style.display = "block";
      //     document.getElementById("errortxt").innerHTML =
      //       "Your account has been deactivated. Please contact admin.";
      //   }
      // });
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

// Registration Function
document.getElementById("signup").addEventListener("click", (e) => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email_register").value;
  const password = document.getElementById("password_register").value;
  const confirmpassword = document.getElementById("confirmpassword").value;

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const address = document.getElementById("address").value;
  
  // Bagong dagdag ni raf
  const middlename = document.getElementById("middlename").value;
  const suffixname = document.getElementById("suffixname").value;
  const birthdate = document.getElementById("birthdate").value;
  const birthplace = document.getElementById("birthplace").value;
  const civilstatus = document.getElementById("civilstatus").value;
  //gang dito

  const mobileno = document.getElementById("mobileno").value;
  const precinctno = document.getElementById("precinctno").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userDBRef = doc(db, "users", user.uid);
      const emailVerify = user.emailVerified;

      localStorage.setItem("role", "user");
      localStorage.setItem("verified", emailVerify);

      setDoc(
        userDBRef,
        {
          username: username,
          email: email,
          fname: firstname,
          middlename: middlename,
          lname: lastname,
          suffixname: suffixname,
          add: address,
          birthdate: Timestamp.fromDate(new Date(birthdate)),
          birthplace: birthplace,
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
      // let errorMessage = new Array();
      let messageHtml = "";

      console.log(errorCode);
      console.log(errorMessage);
      // alert("error");
      // document.getElementById("errormsg").style.display = "block";
      // document.getElementById("errortxt").innerHTML = errorMessage;

      if (errorCode === "auth/email-already-in-use") {
        errorMessage.push("Email already in use!");
      }

      if (errorCode === "auth/network-request-failed") {
        errorMessage.push("without network connection!");
      }

      if (errorCode === "auth/invalid-email") {
        errorMessage.push("invalid E-mail!");
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

      document.getElementById("errormsg_register_last").style.display = "block";
      document.getElementById("errortxt_register_last").innerHTML = messageHtml;
    });
});

document.getElementById("reset_password").addEventListener("click", (e) => {
  var email = document.getElementById("email_forgot").value;
  if (email != "") {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // alert("Email has been sent to your email.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        document.getElementById("errormsg_forgot").style.display = "block";
        document.getElementById("errortxt_forgot").innerHTML = "User Not Found";
      });
  } else {
    var messageHtml = "Please enter valid email.";
    document.getElementById("errormsg_forgot").style.display = "block";
    document.getElementById("errortxt_forgot").innerHTML = messageHtml;
  }
});
