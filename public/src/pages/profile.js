import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  setDoc,
  Timestamp
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
    var role = localStorage.getItem("role");
    var role_name = "";
    if (role === "admin") {
      role_name = "( Admin )";
    } else if (role === "staff") {
      role_name = "( Staff )";
    } else {
      role_name = role_name;
    }
    var firstname = userdata.data().fname ? userdata.data().fname : "N/A";
    var middlename = userdata.data().middlename ? userdata.data().middlename : "";
    var lastname = userdata.data().lname ? userdata.data().lname : "N/A";
    var suffix = userdata.data().suffixname ? userdata.data().suffixname : "";
    var email = userdata.data().email ? userdata.data().email : "N/A";
    var address = userdata.data().add ? userdata.data().add : "N/A";
    var birthplace = userdata.data().birthplace ? userdata.data().birthplace : "N/A";

    let date = userdata.data().birthdate.toDate();
    let mm = date.toLocaleString("default", { month: "long" });
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let view_date = mm + " " + dd + ", " + yyyy;
    var birthdate = userdata.data().birthdate ? view_date : "N/A";
    var edit_birthdate = date.toISOString().substring(0,10);
    var civilstatus = userdata.data().civilstatus ? userdata.data().civilstatus : "N/A";
    var mobileno = userdata.data().phone ? userdata.data().phone : "N/A";
    var precinctno = userdata.data().precinct ? userdata.data().precinct : "N/A";
    try {
      var emailVerify = user.emailVerified;
      
      var badge = "";
      if (!emailVerify) {
        badge = `&nbsp;&nbsp;&nbsp;<span class="badge bg-danger p-1" style="color: white; cursor: pointer" onclick="sendVerifyLink()">Not Verified</span>`;
        document
          .getElementById("update_currentemail")
          .classList.add("is-invalid");

          if (!emailVerify) {
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("error_msg_title").innerHTML =
              "Email not verified!";
            document.getElementById("error_msg_desc").innerHTML =
              "&nbsp;&nbsp;Please verify your email address.";
          }
      } else {
        badge = `&nbsp;&nbsp;&nbsp;<span class="badge bg-success p-1" style="color: white">Verified</span>`;
        document
          .getElementById("update_currentemail")
          .classList.remove("is-invalid");
        localStorage.setItem("verified", emailVerify);
      }

      localStorage.setItem("email", email);
      localStorage.setItem("verified", emailVerify)

      document.getElementById("profile_name").innerHTML = fullname;
      document.getElementById("profile_role").innerHTML = role_name;
      document.getElementById("fullname").innerHTML = firstname + " " + middlename + " " + lastname + " " + suffix;
      // document.getElementById("middlename").innerHTML = middlename;
      // document.getElementById("lastname").innerHTML = lastname;
      // document.getElementById("suffix").innerHTML = suffix;
      document.getElementById("email").innerHTML = email + badge;
      document.getElementById("address").innerHTML = address;
      document.getElementById("birthplace").innerHTML = birthplace;
      document.getElementById("birthdate").innerHTML = birthdate;
      document.getElementById("civilstatus").innerHTML = civilstatus;
      document.getElementById("mobileno").innerHTML = mobileno;
      document.getElementById("precinctno").innerHTML = precinctno;

      // document.getElementById("edit_username").value = username;
      document.getElementById("edit_firstname").value = firstname;
      document.getElementById("edit_middlename").value = middlename;
      document.getElementById("edit_lastname").value = lastname;
      document.getElementById("edit_suffix").value = suffix;
      document.getElementById("edit_address").value = address;
      document.getElementById("edit_birthplace").value = birthplace;
      document.getElementById("edit_birthdate").value = edit_birthdate;
      document.getElementById("edit_civilstatus").value = civilstatus;
      document.getElementById("edit_mobileno").value = mobileno;
      document.getElementById("edit_precinctno").value = precinctno;

      document.getElementById("update_currentemail").value = email;
      document.getElementById("reset_email").innerHTML = email;

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
    // location.href = "./profile.html";
    $("#js-preloader").addClass("loaded");
  } else {
    location.href = "../../../public/index.html";
  }
});

document.getElementById("edit_profile").addEventListener("click", (e) => {
  $("#js-preloader").removeClass("loaded");
  try {
    var firstname = document.getElementById("edit_firstname").value;
    var middlename = document.getElementById("edit_middlename").value;
    var lastname = document.getElementById("edit_lastname").value;
    var suffix = document.getElementById("edit_suffix").value;
    var address = document.getElementById("edit_address").value;
    var birthplace = document.getElementById("edit_birthplace").value;
    var birthdate = document.getElementById("edit_birthdate").value;
    var civilstatus = document.getElementById("edit_civilstatus").value;
    var mobileno = document.getElementById("edit_mobileno").value;
    var precinctno = document.getElementById("edit_precinctno").value;

    localStorage.setItem(
      "fullname",
      firstname + " " + lastname + " " + suffix
    );

    const user = auth.currentUser;
    const userDBRef = doc(db, "users", user.uid);
    setDoc(
      userDBRef,
      {
        fname: firstname,
        middlename: middlename,
        lname: lastname,
        suffixname: suffix,
        add: address,
        birthplace: birthplace,
        birthdate: Timestamp.fromDate(new Date(birthdate)),
        civilstatus: civilstatus,
        phone: mobileno,
        precinct: precinctno,
      },
      { merge: true }
    ).then((value) => {
      $("#js-preloader").addClass("loaded");
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("update_email").addEventListener("click", (e) => {
  $("#js-preloader").removeClass("loaded");
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
          $("#js-preloader").addClass("loaded");
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

window.sendVerifyLink = () => {
  $("#js-preloader").removeClass("loaded");
  var user = auth.currentUser;
  sendEmailVerification(user).then(() => {
    document.getElementById("warningmsg").style.display = "block";
    document.getElementById("warning_msg_title").innerHTML =
      "Email validation sent!";
    document.getElementById("warning_msg_desc").innerHTML =
      "Please check your email.";
    $("#js-preloader").addClass("loaded");
  });
}
