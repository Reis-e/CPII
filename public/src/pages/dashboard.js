import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  getDocs,
  orderBy,
  collection,
  query,
  where,
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

      localStorage.setItem("verified", emailVerify)
    } catch (error) {
      console.log(error);
    }

    // Announcements
    var announcementsQ = query(
      collection(db, "announcements"),
      where("status", "==", "Active")
    );
    const announcements = await getDocs(announcementsQ);
    var arrAnnouncements = [];
    announcements.forEach((announcement) => {
      var objAnnouncement = announcement.data();
      Object.assign(objAnnouncement, { "announcementId": announcement.id });
      arrAnnouncements.push(objAnnouncement);
    });

    const now = Date.now()
    const filteredArrAnnouncements = arrAnnouncements.filter(a => new Date(a.when.seconds * 1000 + a.when.nanoseconds/1000000) > now)
    
    let announcement = []
    
    filteredArrAnnouncements.sort((a,b) => new Date(a.when.seconds * 1000 + a.when.nanoseconds/1000000) - new Date(b.when.seconds * 1000 + b.when.nanoseconds/1000000));

    for (let i = 0; i < filteredArrAnnouncements.length; i++) {
      let posted_date = filteredArrAnnouncements[i].postedDate
      let updated_date = filteredArrAnnouncements[i].updatedDate
      let when_timestamp = filteredArrAnnouncements[i].when
      
      let display_posted_date = new Date(posted_date.seconds * 1000 + posted_date.nanoseconds/1000000)
      let mm = display_posted_date.toLocaleString("default", { month: "long" });
      let dd = display_posted_date.getDate();
      let yyyy = display_posted_date.getFullYear();
      display_posted_date = mm + " " + dd + ", " + yyyy;

      let display_timestamp = new Date(when_timestamp.seconds * 1000 + when_timestamp.nanoseconds/1000000)
      let _mm = display_timestamp.toLocaleString("default", { month: "long" });
      let _dd = display_timestamp.getDate();
      let _yyyy = display_timestamp.getFullYear();
      let _time = display_timestamp.toLocaleTimeString()
      display_timestamp = _mm + " " + _dd + ", " + _yyyy;

      let display_updated_date = "N/A"
      let display_updated_by = "N/A"
      if (updated_date) {
        display_updated_date = new Date(updated_date.seconds * 1000 + updated_date.nanoseconds/1000000)
        let updated_date_mm = display_updated_date.toLocaleString("default", { month: "long" });
        let updated_date_dd = display_updated_date.getDate();
        let updated_date_yyyy = display_updated_date.getFullYear();
        display_updated_date = updated_date_mm + " " + updated_date_dd + ", " + updated_date_yyyy;
        display_updated_by = filteredArrAnnouncements[i].updatedBy
      }

      announcement += `<div class="col-lg-9 mb-4" id="profileDetails">
          <div class="card shadow mb-2 border-bottom-primary">

            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h5 class="m-0 font-weight-bold text-primary">` + filteredArrAnnouncements[i].title + `</h5>
                  <div class="dropdown no-arrow">
                      <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink" style="">
                          <div class="dropdown-header">Posted By:&nbsp;` + filteredArrAnnouncements[i].postedBy + `</div>
                          <div class="dropdown-header">Posted Date:&nbsp;` + display_posted_date + `</div>
                          <div class="dropdown-divider"></div>
                          <div class="dropdown-header">Updated By:&nbsp;` + display_updated_by + `</div>
                          <div class="dropdown-header">Updated Date:&nbsp;` + display_updated_date + `</div>
                      </div>
                  </div>
            </div>
              
              <!-- Card Body -->
              <div class="card-body px-5">
                  <div class="row mb-2">
                      <div class="col-md-3">
                          Who:
                      </div>
                      <div class="col-md-9" id="email">` + filteredArrAnnouncements[i].who + `</div>
                  </div>
                  <div class="row mb-2">
                      <div class="col-md-3">
                          When:
                      </div>
                      <div class="col-md-9" id="address">` + display_timestamp + " (" + _time + ")" + `</div>
                  </div>
                  <div class="row mb-2">
                      <div class="col-md-3">
                          Where:
                      </div>
                      <div class="col-md-9" id="birthplace">` + filteredArrAnnouncements[i].where + `</div>
                  </div>
                  <div class="row mb-2">
                      <div class="col-md-3">
                          Message:
                      </div>
                      <div class="col-md-9" id="birthplace">` + filteredArrAnnouncements[i].message + `</div>
                  </div>
              </div>
          </div>
      </div>`
    }

    document.getElementById("announcementsList").innerHTML = announcement

  } else {
    location.href = "../../index.html";
  }
  $("#js-preloader").addClass("loaded");
});
