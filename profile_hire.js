import { initializeApp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
//import { auth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

import { getStorage,ref as sref,uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

        const firebaseConfig = {
            apiKey: "AIzaSyD13Q2KObzuB3IM9LvKgeAaQk6TaSiJzL0",
            authDomain: "localjoli.firebaseapp.com",
            databaseURL: "https://localjoli-default-rtdb.firebaseio.com",
            projectId: "localjoli",
            storageBucket: "localjoli.appspot.com",
            messagingSenderId: "445146514525",
            appId: "1:445146514525:web:fef1706c002414c840b9b4"
        };
initializeApp(firebaseConfig);
console.log("entered")
var proceed = document.getElementById('proceed');


const userData = JSON.parse(localStorage.getItem("currentUsere"));
const userid = JSON.parse(localStorage.getItem("currentUserid"));

console.log(userid);
console.log(userData);
if(userData==null)
  {
    localStorage.removeItem("currentUsere");
  localStorage.removeItem("currentUserid");
  window.location.href="login2.html";

  }
document.getElementById("name").innerHTML=userData.fullname;
document.getElementById("phone").innerHTML=`<strong>Phone:</strong> ${userData.phoneNumber}`;
document.getElementById("email").innerHTML=`<strong>Phone:</strong> ${userData.email}`;


document.getElementById("profile-image").addEventListener("click", function() {
   document.getElementById("first").click();
});

proceed.addEventListener("click",()=>{
  window.location.href='list.html';
})

document.getElementById("logout").addEventListener("click",()=>{
  localStorage.removeItem("currentUsere");
  localStorage.removeItem("currentUserid");
  window.location.href="login2.html";

})
