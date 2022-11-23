import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  arrayUnion,
  setDoc,
  updateDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  signOut,
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
    

    var inbox = "";
    if(role === "admin"||role === "staff"){
      $("#chat-admin").css("display", "block")
      $("#chat-user").css("display", "none")
      const messagesList = await getDocs(collection(db, "messages"));
      var contactList = "";
      messagesList.forEach((message) => {
        contactList += `<button class="list-group-item list-group-item-action border-0" onclick="displayChat('`+message.id+`')">
            <div class="d-flex align-items-start">
                <img src="https://ui-avatars.com/api/?background=random&name=`+ message.data().fullname +`" class="rounded-circle mr-1" alt="`+ message.data().fullname +`" width="40" height="40">
                <div class="flex-grow-1 ml-3">
                    ` + message.data().fullname + `
                </div>
            </div>
        </button>`
      });

      document.getElementById("contacts-list").innerHTML = contactList

      //search user inbox
      // console.log(arrMessages);

      // var receiver = "";
      // var receiverName =  prompt("Please enter receiver", "receiver's name'");
      
      // let receiverinit = arrUsers.find(user => user.fullname === receiverName);
      // receiver = receiverinit.uid
      // inbox = receiver;

      //archive messages
      // document.getElementById("archive_message").addEventListener("click", (e) => {
        
      // });

      

    }else{
      inbox = user.uid;
      // $("#contact-container").css("display", "none")
      $("#chat-admin").css("display", "none")
      $("#chat-user").css("display", "block")
    }

    
    


    //send message
    document.getElementById("send_message").addEventListener("click", (e) => {
      var senderUid = user.uid;
      var txt_message = document.getElementById("txt_message").value;
      var sentAt = Timestamp.fromDate(new Date());
      
      getDoc(doc(db, "messages", inbox)).then(docSnap => {
        const chatRef = doc(db, "messages", inbox);
        try {
          if(!docSnap.exists()){
            setDoc(chatRef, {
            message: arrayUnion({senderUid:senderUid, content: txt_message, sentAt:sentAt}),
            uid: receiver,
            status: "Active"
            });
  
          }else{
            updateDoc(chatRef, {
            message: arrayUnion({senderUid:senderUid, content: txt_message, sentAt:sentAt})
            }); 
          }

        }catch(error) {
          console.error('Error writing new message to Firebase Database', error);
        }
      });

    });

  } else {
    location.href = "../../index.html";
  }
});

var clicked = 0;
window.displayChat = (senderId) => {
  //view messages
  if (localStorage.getItem("sender") !== senderId){
    clicked = 0
    $(".chatsupport-body").html("")
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
}
