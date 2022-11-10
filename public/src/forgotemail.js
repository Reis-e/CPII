import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebaseConfig/firebaseConfig.js";

document.getElementById("resetPassword").addEventListener("click", (e) => {
  var email = document.getElementById("email").value;
  console.log(email);
  if(email != "") {
    
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert("Email has been sent to your email.")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

    document.getElementById("errormsg").style.display = "block";
    document.getElementById("errortxt").innerHTML = "User Not Found";
    // ..
  });
    
  } else {
    alert("Please enter your email.")
  }
  


});


