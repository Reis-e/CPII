import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, updateEmail, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { doc, setDoc, getDoc, getFirestore, connectFirestoreEmulator,updateDoc, increment } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
//remove emulator for live

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZggo2OL7cKkn9tgPSCjkl7ys2kxJz7RQ",
  authDomain: "eproseso-3f013.firebaseapp.com",
  projectId: "eproseso-3f013",
  storageBucket: "eproseso-3f013.appspot.com",
  messagingSenderId: "249415128217",
  appId: "1:249415128217:web:a17123c8c36298aa699408",
  measurementId: "G-Z83PXPVEXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();
//connectAuthEmulator(auth, "http://localhost:9099"); //remove for live testing
const db = getFirestore();
//connectFirestoreEmulator(db, 'localhost', 8080); //remove for live testing


addDoc(collection(db, "responses"), {
    userId: user.uid,
    firstName: firstname,
    middleName: middlename,
    lastName: lastname,
    suffixName: suffix,
    address: address,
    birthDate: Timestamp.fromDate(new Date(birthdate)),
    birthPlace: birthplace,
    civilStatus: civilstatus,
    precinct: precinctno,
    emergencyName: emergencyname,
    emergencyRelation: emergencyrel,
    emergencyPhone: emergencyphone,
    remarks: remarks,
    transactionName: "BarangayID",
    transactionStatus: "Submitted",
    createdBy: firstname + " " + lastname + " " + suffix,
    createdDate: Timestamp.fromDate(new Date()),
    status: "Active",
  }).then((value) => {
    console.log(value);
  });


const responseObj = {
    hello: "Hi ?",
    hey: "Hey! What's Up",
    today: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
    request: "what request?",
    id: "are you requesting for a barangay id?",
    certificate: "what certificate",
  };




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
  return responseObj[userInput] == undefined
    ? "Your message will be sent to admin and will respond to you shortly thank you for understanding... "
    : responseObj[userInput];
};

const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};


  
