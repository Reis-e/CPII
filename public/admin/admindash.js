import { db, auth } from "../src/firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";


onAuthStateChanged(auth, async (user) => {
  if (user) {
      var userdata = await getDoc(doc(db, "users", user.uid));
      var role = userdata.data().role;
      if(role == "admin"){
        
        try {
            document.getElementById("usernameDash").innerHTML = userdata.data().username;
            var emailVerify = user.emailVerified;
            
            if(!emailVerify){          
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("emailValidation").innerHTML = "Please verify your emailadress";
            }
            
            
    
        } catch (error) {
            console.log(error);   
        }

      } else {

        window.history.back();
        
      }
      
   
    }   
});

