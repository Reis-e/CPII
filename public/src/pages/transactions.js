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
    var role_name = "";
    if (role === "admin") {
      role_name = "( Admin )";
    } else if (role === "staff") {
      role_name = "( Staff )";
    } else {
      role_name = role_name;
    }

    var url = window.location.toString();

    document.getElementById("profile_name").innerHTML = fullname;
    document.getElementById("profile_role").innerHTML = role_name;

    const transactionDBRef = doc(db, "transactions", user.uid);
    // const transactionData = await getDoc(transactionDBRef);
    const transactions = await getDocs(collection(db, "transactions"));
    var activeQ = null;
    var submittedQ = null;
    var onprocessQ = null;
    var completedQ = null;
    var deniedQ = null;
    var activeQSnap = null;
    var submittedQSnap = null;
    var onprocessQSnap = null;
    var completedQSnap = null;
    var deniedQSnap = null;
    var activeQSnapArr = [];
    var submittedQSnapArr = [];
    var onprocessQSnapArr = [];
    var completedQSnapArr = [];
    var deniedQSnapArr = [];

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

      activeQ = query(
        collection(db, "transactions"),
        where("transactionStatus", "in", ["Submitted", "On Process", "Completed", "Denied"]),
        where("status", "==", "Active")
      );
      submittedQ = query(
        collection(db, "transactions"),
        where("transactionStatus", "==", "Submitted"),
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
      deniedQ = query(
        collection(db, "transactions"),
        where("transactionStatus", "==", "Denied"),
        where("status", "==", "Active")
      );

      activeQSnap = await getDocs(activeQ);
      submittedQSnap = await getDocs(submittedQ);
      onprocessQSnap = await getDocs(onprocessQ);
      completedQSnap = await getDocs(completedQ);
      deniedQSnap = await getDocs(deniedQ);
      activeQSnapArr = [];
      submittedQSnapArr = [];
      onprocessQSnapArr = [];
      completedQSnapArr = [];
      deniedQSnapArr = [];
      activeQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        activeQSnapArr.push(objTrans);
      });
      submittedQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        submittedQSnapArr.push(objTrans);
      });
      onprocessQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        onprocessQSnapArr.push(objTrans);
      });
      completedQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        completedQSnapArr.push(objTrans);
      });
      deniedQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { transactionId: doc.id });
        deniedQSnapArr.push(objTrans);
      });
      document.getElementById("active_requests").innerHTML =
        activeQSnapArr.length;
      document.getElementById("onprocess_requests").innerHTML =
        onprocessQSnapArr.length;
      document.getElementById("completed_requests").innerHTML =
        completedQSnapArr.length;

      var minDate, maxDate;
      $.fn.dataTable.ext.search.push(
        function( settings, data, dataIndex ) {
          var min = minDate.val();
          var max = maxDate.val();
          var date = new Date( data[6] );
          date.setHours(8,0,0,0)
      
          if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date && max === null ) ||
            ( min <= date && date <= max )
          ) {
            return true;
          }
          return false;
        }
      );

      minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
      });
      maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
      });

      let data = null;
      let order = [4, "asc"];
      if (url.includes("active")) {
        data = activeQSnapArr
      } else if (url.includes("submitted")) {
        data = submittedQSnapArr
      } else if (url.includes("onprocess")) {
        data = onprocessQSnapArr
      } else if (url.includes("completed")) {
        data = completedQSnapArr
        order = [6, "desc"]
      } else if (url.includes("denied")) {
        data = deniedQSnapArr
        order = [4, "desc"];
      }

      var table = $("#dataTable").DataTable({
        data: data,
        dom: 'Bflrtip',
        order: [order],
        lengthMenu: [
          [10, 25, 50, -1],
          ['10 rows', '25 rows', '50 rows', 'Show all']
        ],
        buttons: [
          // { 
          //   extend: "pageLength",
          //   className: "btn btn-primary no-arrow",
          // },
          {
            extend: "pdfHtml5",
            text: "Generate Report",
            className: "btn btn-secondary",
            exportOptions: {
              columns: [0, 1, 2, 3, 4, 5, 6]
            }
          }
        ],
        columns: [
          {
            data: "transactionId",
            render: function (data, type) {
              return data.substring(0, 10);
            },
          },
          { data: "transactionName" },
          {
            data: null,
            render: function (data, type) {
              if (data.transactionStatus === "On Process") {
                return `<button type="button" id="requestDetails" class='btn btn-link text-warning' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                JSON.stringify(data) +
                `)'>` + data.transactionStatus + `</button>`
              } else if (data.transactionStatus === "Completed") {
                return `<button type="button" id="requestDetails" class='btn btn-link text-success' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                JSON.stringify(data) +
                `)'>` + data.transactionStatus + `</button>`
              } else if (data.transactionStatus === "Denied") {
                return `<button type="button" id="requestDetails" class='btn btn-link text-danger' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                JSON.stringify(data) +
                `)'>` + data.transactionStatus + `</button>`
              } else {
                return `<button type="button" id="requestDetails" class='btn btn-link text-primary' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                JSON.stringify(data) +
                `)'>` + data.transactionStatus + `</button>`
                // return `<label class='text-primary'>` + data + `</label>`;
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
              return type === "sort" ? data : date;
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
                return type === "sort" ? data : date;
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

      // Refilter the table
      $('#min, #max').on('change', function () {
        table.draw();
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
              return data.substring(0, 10);
            },
          },
          { data: "transactionName" },
          {
            data: null,
            render: function (data, type) {
              if (data.transactionStatus === "On Process") {
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-warning' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</button>`
                );
              } else if (data.transactionStatus === "Completed") {
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-success' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</i></button>`
                );
              }  else if (data.transactionStatus === "Denied") {
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-danger' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</i></button>`
                );
              } else {
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-primary' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</i></button>`
                );
              }
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
        // columnDefs: [ { type: 'date', 'targets': [3] } ],
        order: [[3, 'asc']],
        columns: [
          {
            data: "transactionId",
            render: function (data, type) {
              return data.substring(0, 10);
            },
          },
          { data: "transactionName" },
          {
            data: null,
            render: function (data, type) {
              if (data.transactionStatus === "On Process") {
                // return `<label class='text-warning'>` + data + `</label>`;
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-warning' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</button>`
                );
              } else if (data.transactionStatus === "Completed") {
                // return `<label class='text-success'>` + data + `</label>`;
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-success' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</button>`
                );
              } else if (data.transactionStatus === "Denied") {
                // return `<label class='text-danger'>` + data + `</label>`;
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-danger' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</button>`
                );
              }  else if (data.transactionStatus === "Cancelled") {
                // return `<label class='text-danger'>` + data + `</label>`;
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link' data-toggle="tooltip" data-placement="top" title="View Request" style="color: #fd7e14" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</button>`
                );
              } else {
                // return `<label class='text-primary'>` + data + `</label>`;
                return (
                  `<button type="button" id="requestDetails" class='btn btn-link text-primary' data-toggle="tooltip" data-placement="top" title="View Request" onclick='requestDetails(` +
                  JSON.stringify(data) +
                  `)'>` + data.transactionStatus + `</button>`
                );
              }
              // return data;
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
              return type === "sort" ? data : date;
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
  $("#js-preloader").addClass("loaded");
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

window.cancelRequest = (transactionId) => {
  $("#warningModal").modal("show");
};

document.getElementById("proceedCancel").addEventListener("click", (e) => {
  let fullname = localStorage.getItem("fullname");
  let transactionId = localStorage.getItem("transactionId");
  try {
    const transactionDBRef = doc(db, "transactions", transactionId);
    setDoc(
      transactionDBRef,
      {
        transactionStatus: "Cancelled",
        updatedBy: fullname,
        updatedDate: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    ).then((value) => {
      $("#successImage").attr("src", "../assets/img/success.jpg");
      $("#successModalTitle").html("Request Cancelled!");
      $("#successModal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("proceedDeny").addEventListener("click", (e) => {
  let fullname = localStorage.getItem("fullname");
  let transactionId = localStorage.getItem("transactionId");
  let remarks = document.getElementById("transactionRemarks").value;

  let valid = true;
  $('[required]').each(function() {
    if ($(this).is(':invalid') || !$(this).val()) valid = false;
  })

  if (!valid) {
    $("#transactionRemarks").addClass("is-invalid");
  } else {


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

  $("#remarksModal").modal("hide");
}
});

document.getElementById("backDeny").addEventListener("click", (e) => {
  $("#requestDetailsModal").modal("show");
});
