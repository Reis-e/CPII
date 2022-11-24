import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  where,
  collection,
  Timestamp
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDBRef = doc(db, "users", user.uid);
      const userdata = await getDoc(userDBRef);
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
      document.getElementById("profile_name").innerHTML = fullname;
      document.getElementById("profile_role").innerHTML = role_name;

      document.getElementById("post").addEventListener("click", (e) => {
        $("#js-preloader").removeClass("loaded");
        let title = $("#title").val().replaceAll("'", "&apos;")
        let who = $("#who").val().replaceAll("'", "&apos;")
        let when = $("#when").val()
        let where = $("#where").val().replaceAll("'", "&apos;")
        let message = $("#message").val().replaceAll("'", "&apos;")
        $("#js-preloader").addClass("loaded");

        addDoc(collection(db, "announcements"), {
          title: title,
          who: who,
          when: Timestamp.fromDate(new Date(when)),
          where: where,
          message: message,
          postedBy: userdata.data().fname + " " + userdata.data().lname + " " + userdata.data().suffixname,
          postedDate: Timestamp.fromDate(new Date()),
          status: "Active",
        }).then((value) => {
          console.log(value)
          $("#success_modal").modal("show");
        });
      })
      $("#js-preloader").addClass("loaded");
    }

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
    
    $("#dataTable").DataTable({
      data: arrAnnouncements,
      autoWidth: false,
      columns: [
        { data: "announcementId",
          render: function (data, type) {
            return data.substring(0, 5);
          }, 
        },
        { data: "title" },
        { data: "postedBy" },
        { data: "postedDate",
          render: function (data, type) {
            let date = data.toDate();
            let mm = date.toLocaleString("default", { month: "long" });
            let dd = date.getDate();
            let yyyy = date.getFullYear();
            date = mm + " " + dd + ", " + yyyy;
            return date
          }
        },
        { data: "updatedBy",
          render: function (data, type) {
            if (typeof data !== "undefined" && data) {
              return data;
            } else {
              return "N/A";
            }
          }
        },
        { data: "updatedDate",
          render: function (data, type) {
            if (typeof data !== "undefined" && data) {
              let date = data.toDate();
              let mm = date.toLocaleString("default", { month: "long" });
              let dd = date.getDate();
              let yyyy = date.getFullYear();
              date = mm + " " + dd + ", " + yyyy;
              return date;
            } else {
              return "N/A";
            }
          } 
        },
        { data: null,
          render: function (data, type, row) {
            return (
              `<button type="button" class='btn btn-primary btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="View Announcement" onclick='viewAnnouncement(` +
              JSON.stringify(data) +
              `)'><i class="fas fa-arrow-right"></i></button>`
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
              <th>ID</th>
              <th>Title</th>
              <th>Posted By</th>
              <th>Posted Date</th>
              <th>Archived By</th>
              <th>Archived Date</th>
              <th>Action</th>
            </tr>
        </thead>
      </table>`;

      const archivesQ = query(
        collection(db, "announcements"),
        where("status", "==", "Archived")
      );
      const archivesQSnap = await getDocs(archivesQ);
      const archivesQSnapArr = [];
      archivesQSnap.forEach((doc) => {
        var objTrans = doc.data();
        Object.assign(objTrans, { announcementId: doc.id });
        archivesQSnapArr.push(objTrans);
      });

      $("#dataTableArchives").DataTable({
        data: archivesQSnapArr,
        autoWidth: false,
        columns: [
          { data: "announcementId",
            render: function (data, type) {
              return data.substring(0, 5);
            }, 
          },
          { data: "title" },
          { data: "postedBy" },
          { data: "postedDate",
            render: function (data, type) {
              let date = data.toDate();
              let mm = date.toLocaleString("default", { month: "long" });
              let dd = date.getDate();
              let yyyy = date.getFullYear();
              date = mm + " " + dd + ", " + yyyy;
              return date
            }
          },
          { data: "updatedBy",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                return data;
              } else {
                return "N/A";
              }
            }
          },
          { data: "updatedDate",
            render: function (data, type) {
              if (typeof data !== "undefined" && data) {
                let date = data.toDate();
                let mm = date.toLocaleString("default", { month: "long" });
                let dd = date.getDate();
                let yyyy = date.getFullYear();
                date = mm + " " + dd + ", " + yyyy;
                return date;
              } else {
                return "N/A";
              }
            } 
          },
          { data: null,
            render: function (data, type, row) {
              return (
                `<button type="button" class='btn btn-primary btn-circle mr-1' data-toggle="tooltip" data-placement="top" title="View Announcement" onclick='viewAnnouncement(` +
                JSON.stringify(data) +
                `)'><i class="fas fa-arrow-right"></i></button>`
              );
            },
          },
        ],
      });

});

document.getElementById("edit").addEventListener("click", (e) => {
  $("#js-preloader").removeClass("loaded");
  try {
    let title = $("#view_title").val().replaceAll("'", "&apos;")
    let who = $("#view_who").val().replaceAll("'", "&apos;")
    let when = $("#view_when").val()
    let where = $("#view_where").val().replaceAll("'", "&apos;")
    let message = $("#view_message").val().replaceAll("'", "&apos;")
    let transactionId = $("#view_uid").val()
    const announcementDBRef = doc(db, "announcements", transactionId);

    setDoc(
      announcementDBRef, 
      {
        title: title,
        who: who,
        when: Timestamp.fromDate(new Date(when)),
        where: where,
        message: message,
        updatedBy: localStorage.getItem("fullname"),
        updatedDate: Timestamp.fromDate(new Date()),
        status: "Active",
      },
      {
        merge: true
      }).then((value) => {
      $("#js-preloader").addClass("loaded");
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error)
  }

})

document.getElementById("archive").addEventListener("click", (e) => {
  $("#js-preloader").removeClass("loaded");
  try {
    let transactionId = $("#view_uid").val()
    const announcementDBRef = doc(db, "announcements", transactionId);

    setDoc(
      announcementDBRef, 
      {
        status: "Archived",
      },
      {
        merge: true
      }).then((value) => {
      $("#js-preloader").addClass("loaded");
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error)
  }

})

document.getElementById("unarchive").addEventListener("click", (e) => {
  $("#js-preloader").removeClass("loaded");
  try {
    let transactionId = $("#view_uid").val()
    const announcementDBRef = doc(db, "announcements", transactionId);

    setDoc(
      announcementDBRef, 
      {
        status: "Active",
      },
      {
        merge: true
      }).then((value) => {
      $("#js-preloader").addClass("loaded");
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error)
  }

})



