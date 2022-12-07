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

  let valid = [];
  
  // firstname validation
  if (firstname == "") {
    $("#firstname").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#firstname").removeClass("is-invalid");
    valid.push(true);
  }

  // lastname validation
  if (lastname == "") {
    $("#lastname").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#lastname").removeClass("is-invalid");
    valid.push(true);
  }

  // email 
  var emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email.match(emailValidation)) {
    $("#email_register").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#email_register").removeClass("is-invalid");
    valid.push(true);
  }

  // Password validation
  var passwordValidation =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if(!password.match(passwordValidation)){
    $("#password_register").addClass("is-invalid");
    document.getElementById("errormsg").style.display = "block";
    document.getElementById("errormsg").innerHTML = "Password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";
    valid.push(false);
  }else{
    $("#password_register").removeClass("is-invalid");
    document.getElementById("errormsg").style.display = "none";
    valid.push(true);
  }

  // Confirm password validation
  if(confirmpassword == ""){
    $("#confirmpassword").addClass("is-invalid");
    valid.push(false);
  } else {
    if (confirmpassword !== password) {
      $("#confirmpassword").addClass("is-invalid");
      document.getElementById("errormsg").style.display = "block";
      document.getElementById("errormsg").innerHTML = "Confirm Password Does not match with Password";
      valid.push(false);
    } else {
      $("#confirmpassword").removeClass("is-invalid");
      valid.push(true);
    }
  }

  // Adress validation
  if (address == "") {
    $("#address").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#address").removeClass("is-invalid");
    valid.push(true); 
  }

  // Birthplace validation
  if (birthplace == "") {
    $("#birthplace").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#birthplace").removeClass("is-invalid");
    valid.push(true);
  }

  // Birthdate validation
  if (birthdate == "") {
    $("#birthdate").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#birthdate").removeClass("is-invalid");
    valid.push(true);
  }

  // Civilstatus validation
  if (civilstatus == "") {
    $("#civilstatus").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#civilstatus").removeClass("is-invalid");
    valid.push(true);
  }

  // Mobile number validation
  if (mobileno == "") {
    $("#mobileno").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#mobileno").removeClass("is-invalid");
    valid.push(true);
  }
  
  // Precicnt number validation
  if (precinctno == "") {
    $("#precinctno").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#precinctno").removeClass("is-invalid");
    valid.push(true);
  }
  if(!valid.includes(false)) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userDBRef = doc(db, "users", user.uid);
        const emailVerify = user.emailVerified;
  
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
          sendEmailVerification(user).then(() => {
            // Email verification sent!
            // ...
            console.log("email verification sent");
          });
  
          
  
          localStorage.setItem("role", "user");
          localStorage.setItem("verified", emailVerify);
          localStorage.setItem("status", "Active");
          localStorage.setItem(
          "fullname",
          firstname + " " + lastname + " " + suffixname
        );
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
    } 
});
