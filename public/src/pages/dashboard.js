import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  getDocs,
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

    let announcement = []

    for (let i = 0; i < arrAnnouncements.length; i++) {
      let posted_date = arrAnnouncements[i].postedDate
      let updated_date = arrAnnouncements[i].updatedDate
      let when_timestamp = arrAnnouncements[i].when
      
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
        display_updated_by = arrAnnouncements[i].updatedBy
      }

      announcement += `<div class="col-lg-9 mb-4" id="profileDetails">
          <div class="card shadow mb-2 border-left-primary">

              <div class="card-header py-3">
                  <div class="d-sm-flex justify-content-between">
                      <h5 class="m-0 font-weight-bold text-primary">` + arrAnnouncements[i].title + `</h5>
                    <div class="row">
                      <div class="col">
                        <span class="text-gray-500 text-xs">Posted By:&nbsp;` + arrAnnouncements[i].postedBy + `</span><br>
                        <span class="text-gray-500 text-xs">Posted Date:&nbsp;` + display_posted_date + `</span><br>
                        <span class="text-gray-500 text-xs">Updated By:&nbsp;` + display_updated_by + `</span><br>
                        <span class="text-gray-500 text-xs">Updated Date:&nbsp;` + display_updated_date + `</span>
                      </div>
                    </div>
                  </div>
              </div>
              
              <!-- Card Body -->
              <div class="card-body px-5">
                  <div class="row mb-2">
                      <div class="col-md-3">
                          Who:
                      </div>
                      <div class="col-md-9" id="email">` + arrAnnouncements[i].who + `</div>
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
                      <div class="col-md-9" id="birthplace">` + arrAnnouncements[i].where + `</div>
                  </div>
                  <div class="row mb-2">
                      <div class="col-md-3">
                          Message:
                      </div>
                      <div class="col-md-9" id="birthplace">` + arrAnnouncements[i].message + `</div>
                  </div>
              </div>
          </div>
      </div>`
    }

    document.getElementById("announcementsList").innerHTML = announcement

  } else {
    location.href = "../index.html";
  }
  $("#js-preloader").addClass("loaded");
});
