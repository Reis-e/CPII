import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
  addDoc,
  getDocs,
  collection,
  arrayUnion,
  updateDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  signOut,
  sendEmailVerification,
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


    document.getElementById("send_message").addEventListener("click", (e) => {
      var senderUid = user.uid;
      var txt_message = document.getElementById("txt_message").value;
      var sentAt = Timestamp.fromDate(new Date());
      
      
      try {
        const chatRef = doc(db, "messages", user.uid);
        
        addDoc(chatRef, {
          message: arrayUnion({senderUid:senderUid, content: txt_message, sentAt:sentAt}),
          uid: user.uid

        });
        
      }
      catch(error) {
        console.error('Error writing new message to Firebase Database', error);
      }

    
    });

    var chatData = await getDoc(doc(db, "messages", user.uid));
    var chatContent = chatData.data().message
    const chatBody = document.querySelector(".chat-body");

    chatContent.forEach((message) => {
      console.log(message.senderUid === user.uid);
      if(message.senderUid === user.uid){
        let className = "user-message"
      
        const messageEle = document.createElement("div");
        const txtNode = document.createTextNode(message.content);
         messageEle.classList.add(className);
        messageEle.append(txtNode);
        chatBody.append(messageEle);
      }else{
        let className = "chatbot-message"
      
        const messageEle = document.createElement("div");
        const txtNode = document.createTextNode(message.content);
         messageEle.classList.add(className);
        messageEle.append(txtNode);
        chatBody.append(messageEle);
      }
      
      // let messageData = response.data();
      // delete responseData.status;

    });



    // const renderMessageEle = (txt, type) => {
    //   let className = "user-message";
    //   if (type !== "user") {
    //     className = "chatbot-message";
    //   }
    //   const messageEle = document.createElement("div");
    //   const txtNode = document.createTextNode(txt);
    //   messageEle.classList.add(className);
    //   messageEle.append(txtNode);
    //   chatBody.append(messageEle);
    // };










  } else {
    // location.href = "../index.html";
  }
});
