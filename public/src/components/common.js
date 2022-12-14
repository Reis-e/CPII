import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  getDocs,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const auth = getAuth();
let responseObj = null;

onAuthStateChanged(auth, async (user) => {
  if(user){
    let newResponseObj = {};
    const responsesQ = query(collection(db, "chatResponses"), where("status", "==", "Active"));
    const responses = await getDocs(responsesQ);
    responses.forEach((response) => {
      let responseData = response.data();
      delete responseData.status;
      responseObj = Object.assign(newResponseObj, responseData);
    });
  }
});


document.getElementById("logout").addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      location.href = "../../index.html";
      localStorage.clear();
    })
    .catch((error) => {
      // An error happened.
    });

  console.log("logout");
});

document.getElementById("deactivate_logout").addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      location.href = "../../index.html";
      localStorage.clear();
    })
    .catch((error) => {
      // An error happened.
    });

  console.log("logout");
});

export const isNumber = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
};

$(document).ready(function () {
  var status = localStorage.getItem("status");
  if (status === "Deactivated") {
    $("#deactivated_modal").modal("show");
  }
});



//Chatbot
const chatBody = document.querySelector(".chat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");

send.addEventListener("click", () => renderUserMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    renderUserMessage();
  }
});

const renderUserMessage = () => {
  const userInput = txtInput.value;
  renderMessageEle(userInput, "user");
  txtInput.value = "";
  setTimeout(() => {
    renderChatbotResponse(userInput);
    setScrollPosition();
  }, 600);
};

const renderChatbotResponse = (userInput) => {
  const res = getChatbotResponse(userInput);
  renderMessageEle(res);
};

const renderMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);
};

const getChatbotResponse = (userInput) => {
  var lowerCaseTxtInput = userInput.toLowerCase()
  if (responseObj[lowerCaseTxtInput] == undefined) {
    let arrKeys = Object.keys(responseObj);
    let response = "";
    for (const key of arrKeys) {
      if (lowerCaseTxtInput.includes(key) || key.includes(lowerCaseTxtInput)) {
        response = responseObj[key];
        break;
      } else {
        response = "Sorry, I didn't understand that. Please redirect your message to our Chat Support.";
      }
    }
    return response;
  } else {
    return responseObj[lowerCaseTxtInput];
  }
};



const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};
