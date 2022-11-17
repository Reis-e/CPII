import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { db } from "../firebaseConfig/firebaseConfig.js";

const auth = getAuth();

document.getElementById("logout").addEventListener("click", (e) => {
  // var table = $("#example").DataTable();
  // table.clear().draw();
  signOut(auth)
    .then(() => {
      location.href = "../../index.html";
      localStorage.clear();
    })
    .catch((error) => {
      // An error happened.
    });

  console.log("logout");
});

document.getElementById("deactivate_logout").addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      location.href = "../../index.html";
      localStorage.clear();
    })
    .catch((error) => {
      // An error happened.
    });

  console.log("logout");
});

export const isNumber = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
};

$(document).ready(function () {
  var status = localStorage.getItem("status");
  if (status === "Deactivated") {
    $("#deactivated_modal").modal("show");
  }

  // $("#dataTable").DataTable();
});
