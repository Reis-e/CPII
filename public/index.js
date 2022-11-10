import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth ,db } from "./src/firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
 
 onAuthStateChanged(auth, async (user) => {
  
  if (user) {
    var userdata = await getDoc(doc(db, "users", user.uid));
    
    try {
      var role = userdata.data().role;
      switch (role) {
        case "admin":
          //location.href = "./admin/dashboard.html";
          break;

        case "staff":
          location.href = "./dashboard.html";
          break;

        default:
          location.href = "./user/userdash.html";
          break;
      }
      
      
    } catch (error) {
      console.log(error);   
    }
  }


});


