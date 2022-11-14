import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  updateEmail,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    var userdata = await getDoc(doc(db, "users", user.uid));
    var fullname = localStorage.getItem("fullname");
    var username = userdata.data().username;
    var firstname = userdata.data().fname;
    var lastname = userdata.data().lname;
    var email = userdata.data().email;
    var address = userdata.data().add;
    var mobileno = userdata.data().phone;
    var precinctno = userdata.data().precinct;
    try {
      var emailVerify = user.emailVerified;
      var badge = "";
      if (!emailVerify) {
        badge = `&nbsp;&nbsp;&nbsp;<span class="badge bg-danger p-1" id="notVerified" style="color: white; cursor: pointer">Not Verified</span>`;
        document
          .getElementById("update_currentemail")
          .classList.add("is-invalid");
      } else {
        badge = `&nbsp;&nbsp;&nbsp;<span class="badge bg-success p-1" style="color: white">Verified</span>`;
        document
          .getElementById("update_currentemail")
          .classList.remove("is-invalid");
        localStorage.setItem("verified", emailVerify);
      }

      localStorage.setItem("email", email);

      document.getElementById("profile_name").innerHTML = fullname;
      document.getElementById("username").innerHTML = username;
      document.getElementById("firstname").innerHTML = firstname;
      document.getElementById("lastname").innerHTML = lastname;
      document.getElementById("email").innerHTML = email + badge;
      document.getElementById("address").innerHTML = address;
      document.getElementById("mobileno").innerHTML = mobileno;
      document.getElementById("precinctno").innerHTML = precinctno;

      document.getElementById("edit_username").value = username;
      document.getElementById("edit_firstname").value = firstname;
      document.getElementById("edit_lastname").value = lastname;
      document.getElementById("edit_address").value = address;
      document.getElementById("edit_mobileno").value = mobileno;
      document.getElementById("edit_precinctno").value = precinctno;

      document.getElementById("update_currentemail").value = email;
      document.getElementById("reset_email").innerHTML = email;

      document.getElementById("notVerified").addEventListener("click", (e) => {
        var user = auth.currentUser;
        sendEmailVerification(user).then(() => {
          document.getElementById("warningmsg").style.display = "block";
          document.getElementById("warning_msg_title").innerHTML =
            "Email validation sent!";
          document.getElementById("warning_msg_desc").innerHTML =
            "Please check your email.";
        });
      });

      //   var emailVerify = user.emailVerified;
      //   alert(emailVerify);

      //   if (!emailVerify) {
      //     document.getElementById("errormsg").style.display = "block";
      //     document.getElementById("emailValidation").innerHTML =
      //       "Please verify your emailadress";
      //   }
    } catch (error) {
      console.log(error);
    }
  } else {
    location.href = "../../../public/index.html";
  }
});

document.getElementById("edit_profile").addEventListener("click", (e) => {
  try {
    var username = document.getElementById("edit_username").value;
    var firstname = document.getElementById("edit_firstname").value;
    var lastname = document.getElementById("edit_lastname").value;
    var address = document.getElementById("edit_address").value;
    var mobileno = document.getElementById("edit_mobileno").value;
    var precinctno = document.getElementById("edit_precinctno").value;

    const user = auth.currentUser;
    const userDBRef = doc(db, "users", user.uid);
    setDoc(
      userDBRef,
      {
        username: username,
        fname: firstname,
        lname: lastname,
        add: address,
        phone: mobileno,
        precinct: precinctno,
      },
      { merge: true }
    ).then((value) => {
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("update_email").addEventListener("click", (e) => {
  try {
    var newEmail = document.getElementById("update_newemail").value;

    const user = auth.currentUser;
    updateEmail(user, newEmail)
      .then(() => {
        const userDBRef = doc(db, "users", user.uid);
        setDoc(
          userDBRef,
          {
            email: newEmail,
          },
          { merge: true }
        ).then((value) => {
          $("#success_modal").modal("show");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("sendLink").addEventListener("click", (e) => {
  var user = auth.currentUser;
  sendEmailVerification(user).then(() => {
    document.getElementById("warningmsg").style.display = "block";
    document.getElementById("warning_msg_title").innerHTML =
      "Email validation sent!";
    document.getElementById("warning_msg_desc").innerHTML =
      "Please check your email.";
  });
});

document.getElementById("sendResetPassword").addEventListener("click", (e) => {
  var email = localStorage.getItem("email");
  sendPasswordResetEmail(auth, email)
    .then(() => {
      document.getElementById("warningmsg").style.display = "block";
      document.getElementById("warning_msg_title").innerHTML =
        "Password reset link sent!";
      document.getElementById("warning_msg_desc").innerHTML =
        "Please check your email.";
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      // ..
    });
});

// document.getElementById("notVerified").addEventListener("click", (e) => {
//   alert("verify");

//   // var user = auth.currentUser;
//   // sendEmailVerification(user).then(() => {
//   //   document.getElementById("warningmsg").style.display = "block";
//   //   document.getElementById("warning_msg_title").innerHTML =
//   //     "Email validation sent!";
//   //   document.getElementById("warning_msg_desc").innerHTML =
//   //     "Please check your email.";
//   // });
// });
