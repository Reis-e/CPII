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

    document.getElementById("id_firstname").value = userdata.data().fname;
    document.getElementById("id_middlename").value = userdata.data().middlename;
    document.getElementById("id_lastname").value = userdata.data().lname;
    document.getElementById("id_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("id_address").value = userdata.data().add;

    let date = userdata.data().birthdate.toDate();
    let mm = date.toLocaleString("default", { month: "long" });
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let view_date = mm + " " + dd + ", " + yyyy;
    document.getElementById("id_birthdate").value = view_date;
    document.getElementById("id_birthplace").value = userdata.data().birthplace;
    document.getElementById("id_civilstatus").value = userdata.data().civilstatus;
    document.getElementById("id_precinctno").value = userdata.data().precinct;

    document.getElementById("cert_firstname").value = userdata.data().fname;
    document.getElementById("cert_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("cert_lastname").value = userdata.data().lname;
    document.getElementById("cert_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("cert_address").value = userdata.data().add;

    document.getElementById("clearance_firstname").value =
      userdata.data().fname;
    document.getElementById("clearance_middlename").value =
      userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("clearance_lastname").value = userdata.data().lname;
    document.getElementById("clearance_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("clearance_address").value = userdata.data().add;
    document.getElementById("clearance_birthdate").value = view_date;
    document.getElementById("clearance_birthplace").value = userdata.data().birthplace;
    document.getElementById("clearance_civilstatus").value = userdata.data().civilstatus;
    document.getElementById("clearance_precinctno").value =
      userdata.data().precinct;

    document.getElementById("permit_firstname").value = userdata.data().fname;
    document.getElementById("permit_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("permit_lastname").value = userdata.data().lname;
    document.getElementById("permit_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("permit_address").value = userdata.data().add;

    document.getElementById("indigency_firstname").value =
      userdata.data().fname;
    document.getElementById("indigency_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("indigency_lastname").value = userdata.data().lname;
    document.getElementById("indigency_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("indigency_address").value = userdata.data().add;

    // Proceed Request Function
    document.getElementById("proceedSubmit").addEventListener("click", (e) => {
      // Brgy ID
      var id_emergencyname = document.getElementById("id_emergency_name").value;
      var id_emergencyrel = document.getElementById("id_emergency_rel").value;
      var id_emergencyphone = document.getElementById("id_emergency_contact").value;
      var id_remarks = document.getElementById("id_remarks").value;
    
      // Brgy Certificate
      var cert_purpose = document.getElementById("cert_purpose").value;
      var cert_remarks = document.getElementById("cert_remarks").value;
    
      // Brgy Clearance
      var clearance_purpose = document.getElementById("clearance_purpose").value;
      var clearance_remarks = document.getElementById("clearance_remarks").value;
    
      // Brgy Business Permit
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
      var indigency_purpose = document.getElementById("indigency_purpose").value;
      var indigency_remarks = document.getElementById("indigency_remarks").value;
    
      let request = localStorage.getItem("request");
      const user = auth.currentUser;
    
      if (request === "id") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          birthDate: userdata.data().birthdate,
          birthPlace: userdata.data().birthplace,
          civilStatus: userdata.data().civilstatus,
          precinct: userdata.data().precinct,
          emergencyName: id_emergencyname,
          emergencyRelation: id_emergencyrel,
          emergencyPhone: id_emergencyphone,
          remarks: id_remarks,
          transactionName: "Barangay ID",
          transactionStatus: "Submitted",
          createdBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          createdDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {
          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "certificate") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          precinct: userdata.data().precinct,
          purpose: cert_purpose,
          remarks: cert_remarks,
          transactionName: "Barangay Certificate",
          transactionStatus: "Submitted",
          createdBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          createdDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {
          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "indigency") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          precinct: userdata.data().precinct,
          purpose: indigency_purpose,
          remarks: indigency_remarks,
          transactionName: "Barangay Certificate of Indigency",
          transactionStatus: "Submitted",
          createdBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          createdDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {
          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "clearance") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          birthDate: userdata.data().birthdate,
          birthPlace: userdata.data().birthplace,
          civilStatus: userdata.data().civilstatus,
          precinct: userdata.data().precinct,
          purpose: clearance_purpose,
          remarks: clearance_remarks,
          transactionName: "Barangay Clearance",
          transactionStatus: "Submitted",
          createdBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          createdDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {
          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "permit") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          precinct: userdata.data().precinct,
          businessName: permit_business_name,
          businessOwner: permit_business_owner,
          businessPhone: permit_business_phone,
          businessNature: permit_business_nature,
          businessAddress: permit_business_address,
          remarks: permit_remarks,
          transactionName: "Barangay Business Permit",
          transactionStatus: "Submitted",
          createdBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          createdDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {
          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    });
  }
  $("#js-preloader").addClass("loaded");
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
