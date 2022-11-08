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
  //confirmpass?
  const confirmPass = document.getElementById("confirmPass").value;

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const add = document.getElementById("add").value;
  const phone = document.getElementById("phone").value;
  const precinct = document.getElementById("precinct").value;

  if(password !== confirmPass){

    document.getElementById("errormsg").style.display = "block";
    document.getElementById("errortxt").innerHTML = "Password and Confirm Password Do not Match.";

  }else{
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Signed in");
        // Signed in
        const user = userCredential.user;
        // ...
        location.href = "../user/userdash.html";
        console.log("acc creation success");
        
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          alert(docSnap.data());
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
            );
  
            console.log("success");
          }
        });
      })
  
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = "";
        let fullErrorMsg = "";
        
        console.log(errorCode + errorMessage);
        // alert("error");
        // document.getElementById("errormsg").style.display = "block";
        // document.getElementById("errortxt").innerHTML = errorMessage;
        
        if (errorCode === 'auth/email-already-in-use') {
          errorMessage ='email already in use!';
        } else if (errorCode === 'auth/network-request-failed') {
          errorMessage ='without network connection!';
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage ='invalid E-mail!';
        } else if (errorCode === 'auth/invalid-password' || errorCode === 'auth/weak-password') {
          errorMessage ='Weak Password';
        }
        document.getElementById("errormsg").style.display = "block";
        document.getElementById("errortxt").innerHTML = errorMessage;
      });
    
  }


});

