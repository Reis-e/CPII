import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { db, auth } from "./firebaseConfig/firebaseConfig.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

document.getElementById("signup").addEventListener("click", (e) => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmpassword").value;

  const fname = document.getElementById("firstname").value;
  const lname = document.getElementById("lastname").value;
  const add = document.getElementById("address").value;
  const phone = document.getElementById("mobileno").value;
  const precinct = document.getElementById("precinctno").value;

  if (password !== confirmpassword) {
    document.getElementById("errormsg").style.display = "block";
    document.getElementById("errortxt").innerHTML =
      "Password and Confirm Password Do not Match.";
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signed in");
        // Signed in
        const user = userCredential.user;
        // ...
        
        console.log("acc creation success");

        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          //alert(docSnap.data());
          if (!docSnap.exists()) {
            const userDBRef = doc(db, "users", user.uid);
            setDoc(
              userDBRef,
              {
                username: username,
                email: email,
                fname: fname,
                lname: lname,
                add: add,
                phone: phone,
                precinct: precinct,
              },
              { merge: true }
            ).then((value) => {
              console.log("success");
              location.href = "../user/userdash.html";
              // expected output: "Success!"
            });
            
          }
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = new Array();
        let messageHtml = "";

        console.log(errorCode + errorMessage);
        // alert("error");
        // document.getElementById("errormsg").style.display = "block";
        // document.getElementById("errortxt").innerHTML = errorMessage;

        if (errorCode === "auth/email-already-in-use") {
          errorMessage.push("email already in use!");
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

        document.getElementById("errormsg").style.display = "block";
        document.getElementById("errortxt").innerHTML = messageHtml;
      });
  }
});
