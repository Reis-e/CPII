import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { db, auth } from "./firebaseConfig/firebaseConfig.js";

document.getElementById("signup").addEventListener("click", (e) => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  //confirmpass?
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const add = document.getElementById("add").value;
  const phone = document.getElementById("phone").value;
  const precinct = document.getElementById("precinct").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      location.href = "../../user/userdash.html";
      console.log("acc creation success");
      getDoc(doc(db, "users", user.uid)).then((docSnap) => {
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
      const errorMessage = error.message;
      // ..
      console.log(errorCode + errorMessage);
      alert("error");
    });
});
