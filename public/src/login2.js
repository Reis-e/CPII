import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { db, auth } from "./firebaseConfig/firebaseConfig.js";

document.getElementById("login").addEventListener("click", (e) => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      var role = "";

      getDoc(doc(db, "users", user.uid))
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log(docSnap.data());
            role = docSnap.data().role;
          }
        })
        .then(function () {
          switch (role) {
            case "admin":
              location.href = "../admin/dashboard.html";
              break;

            case "staff":
              location.href = "../staff/dashboard.html";
              break;

            default:
              location.href = "../user/userdash.html";
              break;
          }
        });

      // ...
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
