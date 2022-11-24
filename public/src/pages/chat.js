import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  arrayUnion,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
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
        // window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
    $("#js-preloader").addClass("loaded");

    localStorage.removeItem("sender")

    var inbox = "";
    if (role === "admin"||role === "staff") {
      

      if (localStorage.getItem("sender") === null || localStorage.getItem("sender") === ""){
        $("#chat-thread").css("display", "none")
      }

      const messagesList = await getDocs(collection(db, "messages"));
      var contactList = "";
      messagesList.forEach((message) => {
        contactList += `<button class="list-group-item list-group-item-action border-0" onclick="displayChat('`+message.id+`', '`+message.data().fullname+`')">
            <div class="d-flex align-items-start">
                <img src="https://ui-avatars.com/api/?background=random&name=`+ message.data().fullname +`" class="rounded-circle mr-1" alt="`+ message.data().fullname +`" width="40" height="40">
                <div class="flex-grow-1 ml-3">
                    ` + message.data().fullname + `
                </div>
            </div>
        </button>`
      });

      document.getElementById("contacts-list").innerHTML = contactList

      $("#chatbot-response-table").css("display", "block")

      // document.getElementById("addResponse_button").innerHTML = '<button class="btn btn-primary shadow-sm" id="addResponse">Add Response</button>'

      // document.getElementById("chatbot-responseCard").innerHTML = `
      // <div class="card shadow mb-4">
      //     <div class="card-header py-3">
      //         <h6 class="m-0 font-weight-bold text-gray-500">Chatbot Response</h6>
      //     </div>
      //     <div class="card-body">
      //         <div class="table-responsive" id="chatbotResponseTable">
      //         </div>
      //     </div>
      // </div>
      // `;

      // document.getElementById("chatbotResponseTable").innerHTML = `
      // <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
      //   <thead id="table_head">
      //       <tr>
      //           <th>Chat Key</th>
      //           <th>Chatbot Response</th>
      //           <th>Status</th>
      //           <th>Action</th>
      //       </tr>
      //   </thead>
      // </table>`;

      

    } else {
      
      inbox = user.uid;

      getDoc(doc(db, "messages", inbox)).then(chatData => {
        if(chatData.exists()){
          var chatContent = chatData.data().message;
          var user = auth.currentUser;
          chatContent.forEach((message) => {
            const chatBody = document.querySelector(".chatsupport-body");
            var className = ""
            if(message.senderUid === user.uid){
              className = "user-message"
            }else{
              className = "chatbot-message"
            }
              const messageEle = document.createElement("div");
              const txtNode = document.createTextNode(message.content);
              messageEle.classList.add(className);
              messageEle.append(txtNode);
              chatBody.append(messageEle); 
          });  
        }
      });
    }

  } else {
    location.href = "../../index.html";
  }
});

var clicked = 0;
window.displayChat = (senderId, fullname) => {
  //view messages
  if (localStorage.getItem("sender") !== senderId){
    clicked = 0
    $(".chatsupport-body").html("")
    $("#chat-thread").css("display", "block")
    $("#chat-header").html(`<div class="position-relative">
        <img src="https://ui-avatars.com/api/?background=random&name=`+ fullname +`" class="rounded-circle mr-1" alt="`+fullname+`" width="40" height="40">
    </div>
    <div class="flex-grow-1 pl-3">
        <strong>`+fullname+`</strong>
    </div>`)
  }

  if(clicked < 1){
    localStorage.setItem("sender", senderId)
    getDoc(doc(db, "messages", senderId)).then(chatData => {
      if(chatData.exists()){
        var chatContent = chatData.data().message;
        var user = auth.currentUser;
        chatContent.forEach((message) => {
          const chatBody = document.querySelector(".chatsupport-body");
          var className = ""
          if(message.senderUid === user.uid){
            className = "user-message"
          }else{
            className = "chatbot-message"
          }
            const messageEle = document.createElement("div");
            const txtNode = document.createTextNode(message.content);
            messageEle.classList.add(className);
            messageEle.append(txtNode);
            chatBody.append(messageEle); 
        });  
      }
    });
  }
  clicked++;

  setTimeout(() => {
    const chatBody = document.querySelector(".chatsupport-body");
    if (chatBody.scrollHeight > 0) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, 200);
}

window.sendMessage = (txtInput) => {
  var user = auth.currentUser;
  var inbox = null
  if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "staff") {
    inbox = localStorage.getItem("sender") 
  }else{
    inbox = user.uid
  }
  var senderUid = user.uid;
  var inboxFullname = localStorage.getItem("fullname");
  var sentAt = Timestamp.fromDate(new Date());
  
  getDoc(doc(db, "messages", inbox)).then(docSnap => {
    const chatRef = doc(db, "messages", inbox);
    try {
      if(!docSnap.exists()){
        setDoc(chatRef, {
        message: arrayUnion({senderUid:senderUid, content: txtInput, sentAt:sentAt}),
        uid: inbox,
        fullname: inboxFullname,
        status: "Active"
        });

      }else{
        updateDoc(chatRef, {
        message: arrayUnion({senderUid:senderUid, content: txtInput, sentAt:sentAt})
        }); 
      }

    }catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  });
}

const responsesQ = await getDocs(collection(db, "chatResponses"));
      
const responsesArr = [];
responsesQ.forEach((response) => {
  var objBotresponse = response.data();
  Object.assign(objBotresponse, { responseId: response.id });
  responsesArr.push(objBotresponse);
});

$("#dataTable").DataTable({
  data: responsesArr,
  autoWidth: false,
  columns: [
    { data: null,
      render: function (data, type) {
        let newObj = Object.fromEntries(Object.entries(data).filter(([key]) => key !== "status"));
        let keys = Object.keys(newObj)
        return keys[0];
      }, 
    },
    { data: null,
      render: function (data, type) {
        let newObj = Object.fromEntries(Object.entries(data).filter(([key]) => key !== "status"));
        let keys = Object.keys(newObj)
        let key = keys[0]
        return newObj[key];
      }, 
    },
    { data: "status",
      render: function (data, type) {
        if (data === "Active") {
          return `<label class='text-success'>` + data + `</label>`;
        } else {
          return `<label class='text-danger'>` + data + `</label>`;
        }
      }, 
    },
    { data: null,
      render: function (data, type, row) {
        return (
          `<button type="button" class='btn btn-primary btn-circle' data-toggle="tooltip" data-placement="top" title="Edit Response" onclick='editResponse(` +
          JSON.stringify(data) +
          `)'><i class='fas fa-edit'></i></button>`
        );
      }
    },
  ],
});

window.saveResponse = () => {
  $("#addResponseModal").modal("hide")
  try {
    let responseKey = $("#add_response_key").val()
    let responseMessage = $("#add_response_message").val()

    addDoc(collection(db, "chatResponses"), {
      [responseKey]: responseMessage.toLowerCase(),
      status: "Active",
    }).then((value) => {
      console.log(value)
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
}

window.updateResponse = () => {
  $("#editResponseModal").modal("hide")
  try {
    let responseId = $("#edit_uid").val()
    let responseKey = $("#response_key").val()
    let responseMessage = $("#response_message").val()

    deleteDoc(doc(db, "chatResponses", responseId))

    const chatResponseDBRef = doc(db, "chatResponses", responseId);
    setDoc(
      chatResponseDBRef,
      {
        [responseKey]: responseMessage.toLowerCase(),
        status: "Active",
      },
      { merge: true }
    ).then((value) => {
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
}

window.archiveResponse = () => {
  try {
    let responseId = $("#edit_uid").val()

    const chatResponseDBRef = doc(db, "chatResponses", responseId);
    setDoc(
      chatResponseDBRef,
      {
        status: "Archived",
      },
      { merge: true }
    ).then((value) => {
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
}

window.unarchiveResponse = () => {
  try {
    let responseId = $("#edit_uid").val()

    const chatResponseDBRef = doc(db, "chatResponses", responseId);
    setDoc(
      chatResponseDBRef,
      {
        status: "Active",
      },
      { merge: true }
    ).then((value) => {
      $("#success_modal").modal("show");
    });
  } catch (error) {
    console.log(error);
  }
}
