import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    var userdata = await getDoc(doc(db, "users", user.uid));
    var fullname = localStorage.getItem("fullname");
    var role = userdata.data().role;
    var role_name = "";
    if (role === "admin") {
      role_name = "( Admin )";
    } else if (role === "staff") {
      role_name = "( Staff )";
    } else {
      role_name = role_name;
    }

    try {
      document.getElementById("profile_name").innerHTML = fullname;
      document.getElementById("profile_role").innerHTML = role_name;
      if (role === "user") {
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
    $("#js-preloader").addClass("loaded");
  } else {
    location.href = "../index.html";
  }
});

const usersList = await getDocs(collection(db, "users"));
var arrUsers = [];
usersList.forEach((user) => {
  var objUser = user.data();
  Object.assign(objUser, { uid: user.id });
  arrUsers.push(objUser);

  // const userDBRef = doc(db, "users", user.id);
  // setDoc(
  //   userDBRef,
  //   {
  //     role: "user",
  //   },
  //   { merge: true }
  // );
});
// console.log(arrUsers);
$("#dataTable").DataTable({
  data: arrUsers,
  autoWidth: false,
  columns: [
    { data: "fname" },
    { data: "lname" },
    { data: "email" },
    {
      data: "street",
      render: function (data, type) {
        if (typeof data !== "undefined" && data) {
          return data;
        } else {
          return " ";
        }
        return data;
      },
    },
    {
      data: "barangay",
      render: function (data, type) {
        if (typeof data !== "undefined" && data) {
          return data;
        } else {
          return " ";
        }
        return data;
      },
    },
    {
      data: "city",
      render: function (data, type) {
        if (typeof data !== "undefined" && data) {
          return data;
        } else {
          return " ";
        }
        return data;
      },
    },
    {
      data: "province",
      render: function (data, type) {
        if (typeof data !== "undefined" && data) {
          return data;
        } else {
          return " ";
        }
        return data;
      },
    },
    {
      data: "role",
      render: function (data, type) {
        if (data === "admin") {
          return `<label>Admin</label>`;
        } else if (data === "user") {
          return `<label>User</label>`;
        } else {
          return `<label>Staff</label>`;
        }
        return data;
      },
    },
    {
      data: "status",
      render: function (data, type) {
        if (data === "Active") {
          return `<label class='text-success'>Active</label>`;
        } else {
          return `<label class='text-danger'>Deactivated</label>`;
        }
        return data;
      },
    },
    {
      data: null,
      render: function (data, type, row) {
        var role = localStorage.getItem("role");
        if (role === "admin") {
          if (data.role === "admin") {
            return (
              `<button type="button" class='btn btn-primary btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="View Profile" onclick='userDetails(` +
              JSON.stringify(data) +
              `)'><i class='fas fa-eye'></i></button>`
            );
          } else {
            return (
              `<button type="button" class='btn btn-primary btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="View Profile" onclick='userDetails(` +
              JSON.stringify(data) +
              `)'><i class='fas fa-eye'></i></button><button type="button" class='btn btn-success btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="Edit Role" onclick='editRole(` +
              JSON.stringify(data) +
              `)'><i class='fas fa-user-edit'></i></button><button type="button" class='btn btn-danger btn-circle' data-toggle="tooltip" data-placement="top" title="Update Status" onclick='deactivateAccount(` +
              JSON.stringify(data) +
              `)'><i class='fas fa-unlock-alt'></i></button>`
            );
          }
        } else {
          return (
            `<button type="button" class='btn btn-primary btn-circle' data-toggle="tooltip" data-placement="top" title="View Profile" onclick='userDetails(` +
            JSON.stringify(data) +
            `)'><i class='fas fa-eye'></i></button>`
          );
        }
      },
    },
  ],
});

document.getElementById("updateRole").addEventListener("click", (e) => {
  try {
    var uid = document.getElementById("edit_uid").value;
    var role = document.getElementById("edit_role_value").value;

    const userDBRef = doc(db, "users", uid);
    setDoc(
      userDBRef,
      {
        role: role,
      },
      { merge: true }
    ).then((value) => {
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("updateStatus").addEventListener("click", (e) => {
  try {
    var uid = document.getElementById("deactivate_uid").value;
    var status = document.getElementById("deactivate_status_value").value;
    console.log(status);

    const userDBRef = doc(db, "users", uid);
    setDoc(
      userDBRef,
      {
        status: status,
      },
      { merge: true }
    ).then((value) => {
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
});
