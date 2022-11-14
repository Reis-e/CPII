import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
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

    var emailVerify = user.emailVerified;
    var role = userdata.data().role;
    var status = userdata.data().status;
    try {
      document.getElementById("profile_name").innerHTML = fullname;
      document.getElementById("profile_role").innerHTML = role_name;
      localStorage.setItem("role", role);

      if (!emailVerify) {
        document.getElementById("errormsg").style.display = "block";
        document.getElementById("error_msg_title").innerHTML =
          "Email not verified!";
        document.getElementById("error_msg_desc").innerHTML =
          "&nbsp;&nbsp;Please verify your email address.";
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    location.href = "../index.html";
  }
});
