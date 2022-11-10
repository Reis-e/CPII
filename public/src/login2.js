import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { db, auth } from "./firebaseConfig/firebaseConfig.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {

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
            let errorMessage = new Array();
            let messageHtml = "";
    
            if (errorCode === "auth/invalid-password") {
              errorMessage.push("Invalid Password");
            }
    
            errorMessage.forEach(function (message) {
              messageHtml += "<li>" + message + "</li>";
            });
    
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("emailValidation").innerHTML = "Verify your email address";
        });
    });

  } else {

    var userdata = await getDoc(doc(db, "users", user.uid));
    
    try {
      var role = userdata.data().role;
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
    } catch (error) {
      console.log(error);   
    }
  }

});


