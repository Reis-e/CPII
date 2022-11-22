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

      const usersList = await getDocs(collection(db, "users"));
      var arrUsers = [];
      usersList.forEach((user) => {
        var fullname = user.data().fname + " " + user.data().lname + " " + user.data().suffixname;
        var objUser = {fullname: fullname.trim(), uid: user.id}
        arrUsers.push(objUser);
        
      });

      //search user inbox
      console.log(arrUsers);

      var receiver = "";
      var receiverName =  prompt("Please enter receiver", "receiver's name'");
      
      let receiverinit = arrUsers.find(user => user.fullname === receiverName);
      receiver = receiverinit.uid
      inbox = receiver;

      //archive messages
      document.getElementById("archive_message").addEventListener("click", (e) => {
        
      });

      

    }else{
      inbox = user.uid;
    }

    //view messages
    getDoc(doc(db, "messages", inbox)).then(chatData => {
      if(chatData.exists()){
        var chatContent = chatData.data().message;
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
