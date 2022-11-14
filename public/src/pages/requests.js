import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  addDoc,
  collection,
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
    document.getElementById("profile_name").innerHTML = fullname;
    const userDBRef = doc(db, "users", user.uid);
    const userdata = await getDoc(userDBRef);
    var status = localStorage.getItem("status");

    $("#request_fullname").html(fullname);
    $("#request_status").html(status);
    $(".modal-body #request_status").addClass("text-success");

    $("#cert_fullname").html(fullname);
    $("#cert_status").html(status);
    $(".modal-body #cert_status").addClass("text-success");

    $("#clearance_fullname").html(fullname);
    $("#clearance_status").html(status);
    $(".modal-body #clearance_status").addClass("text-success");

    $("#permit_fullname").html(fullname);
    $("#permit_status").html(status);
    $(".modal-body #permit_status").addClass("text-success");

    $("#indigency_fullname").html(fullname);
    $("#indigency_status").html(status);
    $(".modal-body #indigency_status").addClass("text-success");

    document.getElementById("id_firstname").value = userdata.data().fname;
    document.getElementById("id_lastname").value = userdata.data().lname;
    document.getElementById("id_address").value = userdata.data().add;
    document.getElementById("id_precinctno").value = userdata.data().precinct;

    document.getElementById("cert_firstname").value = userdata.data().fname;
    document.getElementById("cert_lastname").value = userdata.data().lname;
    document.getElementById("cert_address").value = userdata.data().add;

    document.getElementById("clearance_firstname").value =
      userdata.data().fname;
    document.getElementById("clearance_lastname").value = userdata.data().lname;
    document.getElementById("clearance_address").value = userdata.data().add;
    document.getElementById("clearance_precinctno").value =
      userdata.data().precinct;

    document.getElementById("permit_firstname").value = userdata.data().fname;
    document.getElementById("permit_lastname").value = userdata.data().lname;
    document.getElementById("permit_address").value = userdata.data().add;

    document.getElementById("indigency_firstname").value =
      userdata.data().fname;
    document.getElementById("indigency_lastname").value = userdata.data().lname;
    document.getElementById("indigency_address").value = userdata.data().add;
  }
});

document.getElementById("proceedSubmit").addEventListener("click", (e) => {
  // Brgy ID
  var id_firstname = document.getElementById("id_firstname").value;
  var id_middlename = document.getElementById("id_middlename").value;
  var id_lastname = document.getElementById("id_lastname").value;
  var id_suffix = document.getElementById("id_suffix_value").value;
  var id_address = document.getElementById("id_address").value;
  var id_birthdate = document.getElementById("id_birthdate").value;
  var id_birthplace = document.getElementById("id_birthplace").value;
  var id_civilstatus = document.getElementById("id_civilstatus_value").value;
  var id_precinctno = document.getElementById("id_precinctno").value;
  var id_emergencyname = document.getElementById("id_emergency_name").value;
  var id_emergencyrel = document.getElementById("id_emergency_rel").value;
  var id_emergencyphone = document.getElementById("id_emergency_contact").value;
  var id_remarks = document.getElementById("id_remarks").value;

  // Brgy Certificate
  var cert_firstname = document.getElementById("cert_firstname").value;
  var cert_middlename = document.getElementById("cert_middlename").value;
  var cert_lastname = document.getElementById("cert_lastname").value;
  var cert_suffix = document.getElementById("cert_suffix_value").value;
  var cert_address = document.getElementById("cert_address").value;
  var cert_purpose = document.getElementById("cert_purpose").value;
  var cert_remarks = document.getElementById("cert_remarks").value;

  // Brgy Clearance
  var clearance_firstname = document.getElementById(
    "clearance_firstname"
  ).value;
  var clearance_middlename = document.getElementById(
    "clearance_middlename"
  ).value;
  var clearance_lastname = document.getElementById("clearance_lastname").value;
  var clearance_suffix_value = document.getElementById(
    "clearance_suffix_value"
  ).value;
  var clearance_address = document.getElementById("clearance_address").value;
  var clearance_birthdate = document.getElementById(
    "clearance_birthdate"
  ).value;
  var clearance_birthplace = document.getElementById(
    "clearance_birthplace"
  ).value;
  var clearance_civilstatus_value = document.getElementById(
    "clearance_civilstatus_value"
  ).value;
  var clearance_precinctno = document.getElementById(
    "clearance_precinctno"
  ).value;
  var clearance_purpose = document.getElementById("clearance_purpose").value;
  var clearance_remarks = document.getElementById("clearance_remarks").value;

  // Brgy Business Permit
  var permit_firstname = document.getElementById("permit_firstname").value;
  var permit_middlename = document.getElementById("permit_middlename").value;
  var permit_lastname = document.getElementById("permit_lastname").value;
  var permit_suffix_value = document.getElementById(
    "permit_suffix_value"
  ).value;
  var permit_address = document.getElementById("permit_address").value;
  var permit_business_name = document.getElementById(
    "permit_business_name"
  ).value;
  var permit_business_owner = document.getElementById(
    "permit_business_owner"
  ).value;
  var permit_business_phone = document.getElementById(
    "permit_business_phone"
  ).value;
  var permit_business_nature = document.getElementById(
    "permit_business_nature"
  ).value;
  var permit_business_address = document.getElementById(
    "permit_business_address"
  ).value;
  var permit_remarks = document.getElementById("permit_remarks").value;

  // Brgy Certificate of Indigency
  var indigency_firstname = document.getElementById(
    "indigency_firstname"
  ).value;
  var indigency_middlename = document.getElementById(
    "indigency_middlename"
  ).value;
  var indigency_lastname = document.getElementById("indigency_lastname").value;
  var indigency_suffix_value = document.getElementById(
    "indigency_suffix_value"
  ).value;
  var indigency_address = document.getElementById("indigency_address").value;
  var indigency_purpose = document.getElementById("indigency_purpose").value;
  var indigency_remarks = document.getElementById("indigency_remarks").value;

  let request = localStorage.getItem("request");
  const user = auth.currentUser;

  if (request === "id") {
    addDoc(collection(db, "transactions"), {
      userId: user.uid,
      firstName: id_firstname,
      middleName: id_middlename,
      lastName: id_lastname,
      suffixName: id_suffix,
      address: id_address,
      birthDate: Timestamp.fromDate(new Date(id_birthdate)),
      birthPlace: id_birthplace,
      civilStatus: id_civilstatus,
      precinct: id_precinctno,
      emergencyName: id_emergencyname,
      emergencyRelation: id_emergencyrel,
      emergencyPhone: id_emergencyphone,
      remarks: id_remarks,
      transactionName: "BarangayID",
      transactionStatus: "Submitted",
      createdBy: id_firstname + " " + id_lastname + " " + id_suffix,
      createdDate: Timestamp.fromDate(new Date()),
      status: "Active",
    }).then((value) => {
      $("#transactionId").html(value.id);
      $("#invoice_modal").modal("hide");
      $("#success_modal").modal("show");
    });
  }

  if (request === "certificate") {
    addDoc(collection(db, "transactions"), {
      userId: user.uid,
      firstName: cert_firstname,
      middleName: cert_middlename,
      lastName: cert_lastname,
      suffixName: cert_suffix,
      address: cert_address,
      purpose: cert_purpose,
      remarks: cert_remarks,
      transactionName: "Barangay Certificate",
      transactionStatus: "Submitted",
      createdBy: cert_firstname + " " + cert_lastname + " " + cert_suffix,
      createdDate: Timestamp.fromDate(new Date()),
      status: "Active",
    }).then((value) => {
      $("#transactionId").html(value.id);
      $("#invoice_modal").modal("hide");
      $("#success_modal").modal("show");
    });
  }

  if (request === "indigency") {
    addDoc(collection(db, "transactions"), {
      userId: user.uid,
      firstName: indigency_firstname,
      middleName: indigency_middlename,
      lastName: indigency_lastname,
      suffixName: indigency_suffix_value,
      address: indigency_address,
      purpose: indigency_purpose,
      remarks: indigency_remarks,
      transactionName: "Barangay Certificate of Indigency",
      transactionStatus: "Submitted",
      createdBy: cert_firstname + " " + cert_lastname + " " + cert_suffix,
      createdDate: Timestamp.fromDate(new Date()),
      status: "Active",
    }).then((value) => {
      $("#transactionId").html(value.id);
      $("#invoice_modal").modal("hide");
      $("#success_modal").modal("show");
    });
  }

  if (request === "clearance") {
    addDoc(collection(db, "transactions"), {
      userId: user.uid,
      firstName: clearance_firstname,
      middleName: clearance_middlename,
      lastName: clearance_lastname,
      suffixName: clearance_suffix_value,
      address: clearance_address,
      birthDate: Timestamp.fromDate(new Date(clearance_birthdate)),
      birthPlace: clearance_birthplace,
      civilStatus: clearance_civilstatus_value,
      precinct: clearance_precinctno,
      purpose: clearance_purpose,
      remarks: clearance_remarks,
      transactionName: "Barangay Clearance",
      transactionStatus: "Submitted",
      createdBy: id_firstname + " " + id_lastname + " " + id_suffix,
      createdDate: Timestamp.fromDate(new Date()),
      status: "Active",
    }).then((value) => {
      $("#transactionId").html(value.id);
      $("#invoice_modal").modal("hide");
      $("#success_modal").modal("show");
    });
  }

  if (request === "permit") {
    addDoc(collection(db, "transactions"), {
      userId: user.uid,
      firstName: permit_firstname,
      middleName: permit_middlename,
      lastName: permit_lastname,
      suffixName: permit_suffix_value,
      address: permit_address,
      businessName: permit_business_name,
      businessOwner: permit_business_owner,
      businessPhone: permit_business_phone,
      businessNature: permit_business_nature,
      businessAddress: permit_business_address,
      remarks: permit_remarks,
      transactionName: "Barangay Permit",
      transactionStatus: "Submitted",
      createdBy: id_firstname + " " + id_lastname + " " + id_suffix,
      createdDate: Timestamp.fromDate(new Date()),
      status: "Active",
    }).then((value) => {
      $("#transactionId").html(value.id);
      $("#invoice_modal").modal("hide");
      $("#success_modal").modal("show");
    });
  }
});

document.getElementById("submitId").addEventListener("click", (e) => {
  $("#requestId").modal("hide");
  $("#invoice_modal").modal("show");
});

document.getElementById("submitCert").addEventListener("click", (e) => {
  $("#requestCertificate").modal("hide");
  $("#invoice_modal").modal("show");
});

document.getElementById("submitClearance").addEventListener("click", (e) => {
  $("#requestClearance").modal("hide");
  $("#invoice_modal").modal("show");
});

document.getElementById("submitPermit").addEventListener("click", (e) => {
  $("#requestPermit").modal("hide");
  $("#invoice_modal").modal("show");
});

document.getElementById("submitIndigency").addEventListener("click", (e) => {
  $("#requestIndigency").modal("hide");
  $("#invoice_modal").modal("show");
});
