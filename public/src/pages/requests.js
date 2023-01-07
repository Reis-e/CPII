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
    document.getElementById("id_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
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

    //review ID
    document.getElementById("revid_firstname").value = userdata.data().fname;
    document.getElementById("revid_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("revid_lastname").value = userdata.data().lname;
    document.getElementById("revid_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("revid_address").value = userdata.data().add;
    document.getElementById("revid_birthdate").value = view_date;
    document.getElementById("revid_birthplace").value = userdata.data().birthplace;
    document.getElementById("revid_civilstatus").value = userdata.data().civilstatus;
    document.getElementById("revid_precinctno").value = userdata.data().precinct;

    document.getElementById("cert_firstname").value = userdata.data().fname;
    document.getElementById("cert_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("cert_lastname").value = userdata.data().lname;
    document.getElementById("cert_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("cert_address").value = userdata.data().add;

    document.getElementById("revcert_firstname").value = userdata.data().fname;
    document.getElementById("revcert_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("revcert_lastname").value = userdata.data().lname;
    document.getElementById("revcert_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("revcert_address").value = userdata.data().add;

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

      document.getElementById("revclearance_firstname").value =
      userdata.data().fname;
    document.getElementById("revclearance_middlename").value =
      userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("revclearance_lastname").value = userdata.data().lname;
    document.getElementById("revclearance_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("revclearance_address").value = userdata.data().add;
    document.getElementById("revclearance_birthdate").value = view_date;
    document.getElementById("revclearance_birthplace").value = userdata.data().birthplace;
    document.getElementById("revclearance_civilstatus").value = userdata.data().civilstatus;
    document.getElementById("revclearance_precinctno").value =
      userdata.data().precinct;

    document.getElementById("permit_firstname").value = userdata.data().fname;
    document.getElementById("permit_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("permit_lastname").value = userdata.data().lname;
    document.getElementById("permit_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("permit_address").value = userdata.data().add;

    document.getElementById("revpermit_firstname").value = userdata.data().fname;
    document.getElementById("revpermit_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("revpermit_lastname").value = userdata.data().lname;
    document.getElementById("revpermit_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("revpermit_address").value = userdata.data().add;

    document.getElementById("indigency_firstname").value =
      userdata.data().fname;
    document.getElementById("indigency_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("indigency_lastname").value = userdata.data().lname;
    document.getElementById("indigency_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("indigency_address").value = userdata.data().add;

    document.getElementById("revindigency_firstname").value =
      userdata.data().fname;
    document.getElementById("revindigency_middlename").value = userdata.data().middlename ? userdata.data().middlename : "N/A";
    document.getElementById("revindigency_lastname").value = userdata.data().lname;
    document.getElementById("revindigency_suffix").value = userdata.data().suffixname ? userdata.data().suffixname : "N/A";
    document.getElementById("revindigency_address").value = userdata.data().add;

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
          email: userdata.data().email,
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

          let subject = 'Barangay ID Request Submitted';
          let body = 'You have successfully requested Barangay ID. Kindly wait for the barangay officials to review your request thank you!';

          Email.send({
              SecureToken : "ec78f15c-bb6d-45ed-abf5-fef96cb620f4",
              To : userdata.data().email,
              From : "eproseso.barangaybatis@gmail.com",
              Subject : subject,
              Body : body
          }).then(
            message => console.log(message)
          );

          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "certificate") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          email: userdata.data().email,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          birthDate: userdata.data().birthdate,
          birthPlace: userdata.data().birthplace,
          civilStatus: userdata.data().civilstatus,
          precinct: userdata.data().precinct,
          purpose: cert_purpose,
          remarks: cert_remarks,
          transactionName: "Barangay Certificate",
          transactionStatus: "Submitted",
          createdBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          createdDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {

          let subject = 'Barangay Certificate Request Submitted';
          let body = 'You have successfully requested Barangay Certificate. Kindly wait for the barangay officials to review your request thank you!';

          Email.send({
              SecureToken : "ec78f15c-bb6d-45ed-abf5-fef96cb620f4",
              To : userdata.data().email,
              From : "eproseso.barangaybatis@gmail.com",
              Subject : subject,
              Body : body
          }).then(
            message => console.log(message)
          );

          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "indigency") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          email: userdata.data().email,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          birthDate: userdata.data().birthdate,
          birthPlace: userdata.data().birthplace,
          civilStatus: userdata.data().civilstatus,
          precinct: userdata.data().precinct,
          purpose: indigency_purpose,
          remarks: indigency_remarks,
          transactionName: "Barangay Certificate of Indigency",
          transactionStatus: "Submitted",
          createdBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          createdDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {
          let subject = 'Certificate of Indigency Request Submitted';
          let body = 'You have successfully requested Certificate of  Indigency. Kindly wait for the barangay officials to review your request thank you!';

          Email.send({
              SecureToken : "ec78f15c-bb6d-45ed-abf5-fef96cb620f4",
              To : userdata.data().email,
              From : "eproseso.barangaybatis@gmail.com",
              Subject : subject,
              Body : body
          }).then(
            message => console.log(message)
          );

          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "clearance") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          email: userdata.data().email,
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
          let subject = 'Barangay Clearance Request Submitted';
          let body = 'You have successfully requested Barangay Clearance. Kindly wait for the barangay officials to review your request thank you!';

          Email.send({
              SecureToken : "ec78f15c-bb6d-45ed-abf5-fef96cb620f4",
              To : userdata.data().email,
              From : "eproseso.barangaybatis@gmail.com",
              Subject : subject,
              Body : body
          }).then(
            message => console.log(message)
          );
          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    
      if (request === "permit") {
        addDoc(collection(db, "transactions"), {
          userId: user.uid,
          email: userdata.data().email,
          firstName: userdata.data().fname,
          middleName: userdata.data().middlename,
          lastName: userdata.data().lname,
          suffixName: userdata.data().suffixname,
          address: userdata.data().add,
          birthDate: userdata.data().birthdate,
          birthPlace: userdata.data().birthplace,
          civilStatus: userdata.data().civilstatus,
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
          let subject = 'Barangay Business Permit Request Submitted';
          let body = 'You have successfully requested Barangay Business Permit. Kindly wait for the barangay officials to review your request thank you!';

          Email.send({
              SecureToken : "ec78f15c-bb6d-45ed-abf5-fef96cb620f4",
              To : userdata.data().email,
              From : "eproseso.barangaybatis@gmail.com",
              Subject : subject,
              Body : body
          }).then(
            message => console.log(message)
          );
          $("#transactionId").html((value.id).substring(0, 10));
          $("#invoice_modal").modal("hide");
          $("#success_modal").modal("show");
        });
      }
    });
  }
  $("#js-preloader").addClass("loaded");
});


//barangay ID
document.getElementById("revId").addEventListener("click", (e) => {
  var id_emergencyname = document.getElementById("id_emergency_name").value;
  var id_emergencyrel = document.getElementById("id_emergency_rel").value;
  var id_emergencyphone = document.getElementById("id_emergency_contact").value;
  var valid = [];

  //emergency name validation
  if (id_emergencyname == "") {
    $("#id_emergency_name").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#id_emergency_name").removeClass("is-invalid");
    valid.push(true);
  }

  //emergency relationship validation
  if (id_emergencyrel == "") {
    $("#id_emergency_rel").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#id_emergency_rel").removeClass("is-invalid");
    valid.push(true);
  }

  //emergency contact validation
  if (id_emergencyphone == "") {
    $("#id_emergency_contact").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#id_emergency_contact").removeClass("is-invalid");
    valid.push(true);
  }

  if(!valid.includes(false)) {
    $("#requestId").modal("hide");
    document.getElementById("revid_emergency_name").value = document.getElementById("id_emergency_name").value;
    document.getElementById("revid_emergency_rel").value = document.getElementById("id_emergency_rel").value;
    document.getElementById("revid_emergency_contact").value = document.getElementById("id_emergency_contact").value;
    document.getElementById("revid_remarks").value = document.getElementById("id_remarks").value;
    $("#reviewId").modal("show");
  }
});

document.getElementById("backId").addEventListener("click", (e) => {
  $("#reviewId").modal("hide");
  $("#requestId").modal("show");
});

document.getElementById("submitId").addEventListener("click", (e) => {
  $("#reviewId").modal("hide");
  $("#invoice_modal").modal("show");
});

//barangay certificate
document.getElementById("reviewCert").addEventListener("click", (e) => {
  var cert_purpose = document.getElementById("cert_purpose").value;

  //certificate purpose validation
  if (cert_purpose == "") {
    $("#cert_purpose").addClass("is-invalid");
  } else {
    $("#cert_purpose").removeClass("is-invalid");
    $("#requestCertificate").modal("hide");
    document.getElementById("revcert_purpose").value = document.getElementById("cert_purpose").value;
    document.getElementById("revcert_remarks").value = document.getElementById("cert_remarks").value;
    $("#reviewCertificate").modal("show");
  }
});


document.getElementById("submitCert").addEventListener("click", (e) => {
  $("#reviewCertificate").modal("hide");
  $("#invoice_modal").modal("show");
});

document.getElementById("backCert").addEventListener("click", (e) => {
  $("#reviewCertificate").modal("hide");
  $("#requestCertificate").modal("show");
});

//barangay clearance
document.getElementById("revClearance").addEventListener("click", (e) => {
  var clearance_purpose = document.getElementById("clearance_purpose").value;

  //clearance purpose validation
  if (clearance_purpose == "") {
    $("#clearance_purpose").addClass("is-invalid");
  } else {
    $("#clearance_purpose").removeClass("is-invalid");
    $("#requestClearance").modal("hide");
    document.getElementById("revclearance_purpose").value = document.getElementById("clearance_purpose").value;
    document.getElementById("revclearance_remarks").value = document.getElementById("clearance_remarks").value;
    $("#reviewClearance").modal("show");
  }
});

document.getElementById("backClearance").addEventListener("click", (e) => {
  $("#reviewClearance").modal("hide");
  $("#requestClearance").modal("show");
});

document.getElementById("submitClearance").addEventListener("click", (e) => {
  $("#reviewClearance").modal("hide");
  $("#invoice_modal").modal("show");
});

document.getElementById("revPermit").addEventListener("click", (e) => {
  var permit_business_name = document.getElementById("permit_business_name").value;
  var permit_business_owner = document.getElementById("permit_business_owner").value;
  var permit_business_phone = document.getElementById("permit_business_phone").value;
  var permit_business_nature = document.getElementById("permit_business_nature").value;
  var permit_business_address = document.getElementById("permit_business_address").value;
  var valid = [];

  //business name validation
  if (permit_business_name == "") {
    $("#permit_business_name").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#permit_business_name").removeClass("is-invalid");
    valid.push(true);
  }

  //business owner validation
  if (permit_business_owner == "") {
    $("#permit_business_owner").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#permit_business_owner").removeClass("is-invalid");
    valid.push(true);
  }

  //business phone validation
  if (permit_business_phone == "") {
    $("#permit_business_phone").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#permit_business_phone").removeClass("is-invalid");
    valid.push(true);
  }

  //business nature validation
  if (permit_business_nature == "") {
    $("#permit_business_nature").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#permit_business_nature").removeClass("is-invalid");
    valid.push(true);
  }

  //business address validation
  if (permit_business_address == "") {
    $("#permit_business_address").addClass("is-invalid");
    valid.push(false);
  } else {
    $("#permit_business_address").removeClass("is-invalid");
    valid.push(true);
  }

  if(!valid.includes(false)) {
    $("#requestPermit").modal("hide");
    document.getElementById("revpermit_business_name").value = document.getElementById("permit_business_name").value;
    document.getElementById("revpermit_business_owner").value = document.getElementById("permit_business_owner").value;
    document.getElementById("revpermit_business_phone").value = document.getElementById("permit_business_phone").value;
    document.getElementById("revpermit_business_nature").value = document.getElementById("permit_business_nature").value;
    document.getElementById("revpermit_business_address").value = document.getElementById("permit_business_address").value;
    document.getElementById("revpermit_remarks").value = document.getElementById("permit_remarks").value;
    $("#reviewPermit").modal("show");
  }
});

document.getElementById("backPermit").addEventListener("click", (e) => {
  $("#reviewPermit").modal("hide");
  $("#requestPermit").modal("show");
});

document.getElementById("submitPermit").addEventListener("click", (e) => {
  $("#reviewPermit").modal("hide");
  $("#invoice_modal").modal("show");
});


document.getElementById("revIndigency").addEventListener("click", (e) => {
  var indigency_purpose = document.getElementById("indigency_purpose").value;

  //indigency purpose validation
  if (indigency_purpose == "") {
    $("#indigency_purpose").addClass("is-invalid");
  } else {
    $("#indigency_purpose").removeClass("is-invalid");
    $("#requestIndigency").modal("hide");
    document.getElementById("revindigency_purpose").value = document.getElementById("indigency_purpose").value;
    document.getElementById("revindigency_remarks").value = document.getElementById("indigency_remarks").value;
    $("#reviewIndigency").modal("show");
  }
});

document.getElementById("backIndigency").addEventListener("click", (e) => {
  $("#reviewIndigency").modal("hide");
  $("#requestIndigency").modal("show");
});

document.getElementById("submitIndigency").addEventListener("click", (e) => {
  $("#reviewIndigency").modal("hide");
  $("#invoice_modal").modal("show");
});
