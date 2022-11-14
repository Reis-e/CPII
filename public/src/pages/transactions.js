import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    var fullname = localStorage.getItem("fullname");
    var role = localStorage.getItem("role");
    document.getElementById("profile_name").innerHTML = fullname;
    const transactionDBRef = doc(db, "transactions", user.uid);
    // const transactionData = await getDoc(transactionDBRef);
    const transactions = await getDocs(collection(db, "transactions"));
    var submittedQ = null;
    var onprocessQ = null;
    var completedQ = null;
    var submittedQSnap = null;
    var onprocessQSnap = null;
    var completedQSnap = null;
    var submittedQSnapArr = [];
    var onprocessQSnapArr = [];
    var completedQSnapArr = [];

    // Data Table

    if (role === "admin" || role === "staff") {
      document.getElementById("table").innerHTML = `
      <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead id="table_head">
            <tr>
                <th>Transaction ID</th>
                <th>Transaction Name</th>
                <th>Status</th>
                <th>Requested By</th>
                <th>Requested Date</th>
                <th>Processed By</th>
                <th>Processed Date</th>
                <th>View</th>
            </tr>
        </thead>
      </table>`;

      submittedQ = query(
        collection(db, "transactions"),
        where("status", "==", "Active")
      );
      onprocessQ = query(
        collection(db, "transactions"),
        where("transactionStatus", "==", "On Process"),
        where("status", "==", "Active")
      );
      completedQ = query(
        collection(db, "transactions"),
        where("transactionStatus", "==", "Completed"),
        where("status", "==", "Active")
      );

      submittedQSnap = await getDocs(submittedQ);
      onprocessQSnap = await getDocs(onprocessQ);
      completedQSnap = await getDocs(completedQ);
      submittedQSnapArr = [];
      onprocessQSnapArr = [];
      completedQSnapArr = [];
      submittedQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        submittedQSnapArr.push(objTrans);
      });
      onprocessQSnap.forEach((doc) => {
        onprocessQSnapArr.push(doc.data());
      });
      completedQSnap.forEach((doc) => {
        completedQSnapArr.push(doc.data());
      });
      document.getElementById("submitted_requests").innerHTML =
        submittedQSnapArr.length;
      document.getElementById("onprocess_requests").innerHTML =
        onprocessQSnapArr.length;
      document.getElementById("completed_requests").innerHTML =
        completedQSnapArr.length;
      $("#dataTable").DataTable({
        data: submittedQSnapArr,
        columns: [
          {
            data: "transactionId",
            render: function (data, type) {
              return data.substring(1, 10);
            },
          },
          { data: "transactionName" },
          {
            data: "transactionStatus",
            render: function (data, type) {
              if (data === "On Process") {
                return `<label class='text-warning'>` + data + `</label>`;
              } else if (data === "Completed") {
                return `<label class='text-success'>` + data + `</label>`;
              } else if (data === "Denied") {
                return `<label class='text-danger'>` + data + `</label>`;
              } else {
                return `<label class='text-primary'>` + data + `</label>`;
              }
              return data;
            },
          },
          { data: "createdBy" },
          {
            data: "createdDate",
            render: function (data, type) {
              let date = data.toDate();
              let mm = date.toLocaleString("default", { month: "long" });
              let dd = date.getDate();
              let yyyy = date.getFullYear();
              date = mm + " " + dd + ", " + yyyy;
              return date;
            },
          },
          {
            data: "updatedBy",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                return data;
              } else {
                return "Pending";
              }
              return data;
            },
          },
          {
            data: "updatedDate",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                let date = data.toDate();
                let mm = date.toLocaleString("default", { month: "long" });
                let dd = date.getDate();
                let yyyy = date.getFullYear();
                date = mm + " " + dd + ", " + yyyy;
                return date;
              } else {
                return "Pending";
              }
              return data;
            },
          },
          {
            data: null,
            render: function (data, type, row) {
              return (
                `<button type="button" id="requestDetails" class='btn btn-primary btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                JSON.stringify(data) +
                `)'><i class='fas fa-arrow-right'></i></button>`
              );
            },
          },
        ],
      });

      document.getElementById("archiveCard").innerHTML = `
      <div class="card shadow mb-4">
          <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-gray-500">Archives</h6>
          </div>
          <div class="card-body">
              <div class="table-responsive" id="archivesTable">
              </div>
          </div>
      </div>
      `;

      document.getElementById("archivesTable").innerHTML = `
      <table class="table table-bordered" id="dataTableArchives" width="100%" cellspacing="0">
        <thead id="table_head">
            <tr>
                <th>Transaction ID</th>
                <th>Transaction Name</th>
                <th>Status</th>
                <th>Requested By</th>
                <th>Requested Date</th>
                <th>Archived By</th>
                <th>Archived Date</th>
                <th>View</th>
            </tr>
        </thead>
      </table>`;

      const archivesQ = query(
        collection(db, "transactions"),
        where("status", "==", "Archived")
      );
      const archivesQSnap = await getDocs(archivesQ);
      const archivesQSnapArr = [];
      archivesQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        archivesQSnapArr.push(objTrans);
      });
      $("#dataTableArchives").DataTable({
        data: archivesQSnapArr,
        columns: [
          {
            data: "transactionId",
            render: function (data, type) {
              return data.substring(1, 10);
            },
          },
          { data: "transactionName" },
          {
            data: "transactionStatus",
            render: function (data, type) {
              if (data === "On Process") {
                return `<label class='text-warning'>` + data + `</label>`;
              } else if (data === "Completed") {
                return `<label class='text-success'>` + data + `</label>`;
              } else {
                return data;
              }
              return data;
            },
          },
          { data: "createdBy" },
          {
            data: "createdDate",
            render: function (data, type) {
              let date = data.toDate();
              let mm = date.toLocaleString("default", { month: "long" });
              let dd = date.getDate();
              let yyyy = date.getFullYear();
              date = mm + " " + dd + ", " + yyyy;
              return date;
            },
          },
          {
            data: "updatedBy",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                return data;
              } else {
                return "Pending";
              }
              return data;
            },
          },
          {
            data: "updatedDate",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                let date = data.toDate();
                let mm = date.toLocaleString("default", { month: "long" });
                let dd = date.getDate();
                let yyyy = date.getFullYear();
                date = mm + " " + dd + ", " + yyyy;
                return date;
              } else {
                return "Pending";
              }
              return data;
            },
          },
          {
            data: null,
            render: function (data, type, row) {
              return (
                `<button type="button" id="requestDetails" class='btn btn-primary btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                JSON.stringify(data) +
                `)'><i class='fas fa-arrow-right'></i></button>`
              );
            },
          },
        ],
      });
    } else {
      document.getElementById("table").innerHTML = `
      <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
        <thead id="table_head">
            <tr>
                <th>Transaction ID</th>
                <th>Transaction Name</th>
                <th>Status</th>
                <th>Requested Date</th>
                <th>Processed By</th>
                <th>Processed Date</th>
                <th>View</th>
            </tr>
        </thead>
      </table>`;

      submittedQ = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        where("status", "==", "Active")
      );
      onprocessQ = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        where("transactionStatus", "==", "On Process"),
        where("status", "==", "Active")
      );

      completedQ = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        where("transactionStatus", "==", "Completed"),
        where("status", "==", "Active")
      );

      submittedQSnap = await getDocs(submittedQ);
      onprocessQSnap = await getDocs(onprocessQ);
      completedQSnap = await getDocs(completedQ);
      submittedQSnapArr = [];
      onprocessQSnapArr = [];
      completedQSnapArr = [];
      submittedQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        submittedQSnapArr.push(objTrans);
      });
      onprocessQSnap.forEach((doc) => {
        onprocessQSnapArr.push(doc.data());
      });
      completedQSnap.forEach((doc) => {
        completedQSnapArr.push(doc.data());
      });
      document.getElementById("submitted_requests").innerHTML =
        submittedQSnapArr.length;
      document.getElementById("onprocess_requests").innerHTML =
        onprocessQSnapArr.length;
      document.getElementById("completed_requests").innerHTML =
        completedQSnapArr.length;
      $("#dataTable").DataTable({
        data: submittedQSnapArr,
        columns: [
          {
            data: "transactionId",
            render: function (data, type) {
              return data.substring(1, 10);
            },
          },
          { data: "transactionName" },
          {
            data: "transactionStatus",
            render: function (data, type) {
              if (data === "On Process") {
                return `<label class='text-warning'>` + data + `</label>`;
              } else if (data === "Completed") {
                return `<label class='text-success'>` + data + `</label>`;
              } else if (data === "Denied") {
                return `<label class='text-danger'>` + data + `</label>`;
              } else {
                return `<label class='text-primary'>` + data + `</label>`;
              }
              return data;
            },
          },
          {
            data: "createdDate",
            render: function (data, type) {
              let date = data.toDate();
              let mm = date.toLocaleString("default", { month: "long" });
              let dd = date.getDate();
              let yyyy = date.getFullYear();
              date = mm + " " + dd + ", " + yyyy;
              return date;
            },
          },
          {
            data: "updatedBy",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                return data;
              } else {
                return "Pending";
              }
              return data;
            },
          },
          {
            data: "updatedDate",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                let date = data.toDate();
                let mm = date.toLocaleString("default", { month: "long" });
                let dd = date.getDate();
                let yyyy = date.getFullYear();
                date = mm + " " + dd + ", " + yyyy;
                return date;
              } else {
                return "Pending";
              }
              return data;
            },
          },
          {
            data: null,
            render: function (data, type, row) {
              return (
                `<button type="button" id="requestDetails" class='btn btn-primary btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                JSON.stringify(data) +
                `)'><i class='fas fa-eye'></i></button>`
              );
            },
          },
        ],
      });
    }
  }
});

window.acceptRequest = (transactionId) => {
  let fullname = localStorage.getItem("fullname");
  try {
    const transactionDBRef = doc(db, "transactions", transactionId);
    setDoc(
      transactionDBRef,
      {
        transactionStatus: "On Process",
        updatedBy: fullname,
        updatedDate: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    ).then((value) => {
      $("#successImage").attr("src", "../assets/img/accepted.jpg");
      $("#successModalTitle").html("Request Accepted!");
      $("#successModal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
};

window.completeRequest = (transactionId) => {
  let fullname = localStorage.getItem("fullname");
  try {
    const transactionDBRef = doc(db, "transactions", transactionId);
    setDoc(
      transactionDBRef,
      {
        transactionStatus: "Completed",
        updatedBy: fullname,
        updatedDate: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    ).then((value) => {
      $("#successImage").attr("src", "../assets/img/completed.jpg");
      $("#successModalTitle").html("Request Completed!");
      $("#successModal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
};

window.archiveRequest = (transactionId) => {
  let fullname = localStorage.getItem("fullname");
  try {
    const transactionDBRef = doc(db, "transactions", transactionId);
    setDoc(
      transactionDBRef,
      {
        status: "Archived",
        updatedBy: fullname,
        updatedDate: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    ).then((value) => {
      $("#successImage").attr("src", "../assets/img/archive.jpg");
      $("#successModalTitle").html("Archived Request!");
      $("#successModal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
};

window.unarchiveRequest = (transactionId) => {
  let fullname = localStorage.getItem("fullname");
  try {
    const transactionDBRef = doc(db, "transactions", transactionId);
    setDoc(
      transactionDBRef,
      {
        status: "Active",
        updatedBy: fullname,
        updatedDate: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    ).then((value) => {
      $("#successImage").attr("src", "../assets/img/archive.jpg");
      $("#successModalTitle").html("Unarchived Request!");
      $("#successModal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
};

window.denyRequest = (transactionId) => {
  $("#remarksModal").modal("show");
};

document.getElementById("proceedDeny").addEventListener("click", (e) => {
  let fullname = localStorage.getItem("fullname");
  let transactionId = localStorage.getItem("transactionId");
  let remarks = document.getElementById("transactionRemarks").value;
  try {
    const transactionDBRef = doc(db, "transactions", transactionId);
    setDoc(
      transactionDBRef,
      {
        transactionStatus: "Denied",
        transactionRemarks: remarks,
        updatedBy: fullname,
        updatedDate: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    ).then((value) => {
      $("#successImage").attr("src", "../assets/img/deny.jpg");
      $("#successModalTitle").html("Request Denied!");
      $("#successModal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("backDeny").addEventListener("click", (e) => {
  $("#requestDetailsModal").modal("show");
});
