import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {set,ref,getDatabase,push } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
        const firebaseConfig = {
            apiKey: "AIzaSyD13Q2KObzuB3IM9LvKgeAaQk6TaSiJzL0",
            authDomain: "localjoli.firebaseapp.com",
            databaseURL: "https://localjoli-default-rtdb.firebaseio.com",
            projectId: "localjoli",
            storageBucket: "localjoli.appspot.com",
            messagingSenderId: "445146514525",
            appId: "1:445146514525:web:fef1706c002414c840b9b4"
        };
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const userId = JSON.parse(localStorage.getItem("currentUserid"));
const job_=userId+getRandomInt(1, 10).toString();



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



  function emptyFields(e)
  {
    var inputs = document.querySelectorAll("input");
    var emptyFields = [];
    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        emptyFields.push(input.getAttribute("name"));
      }
    });
  
    if (emptyFields.length > 0) {
      e.preventDefault();
      alert("Please fill in the following fields: " + emptyFields.join(", "));
      return false;
    } 
    else return true;
  
  }

  const db=getDatabase();
  const employerinfoDB = ref(db, "employerinfo");






document.getElementById("register").addEventListener("submit", submitForm);
  
  
  function submitForm(e) {
    e.preventDefault();
    console.log("entered");
  
    var job= getElementVal("jobcategory");
    var sal=getElementVal("salary");
    var email=getElementVal("email");
    var phone=getElementVal("phoneNumber");
    var loc=getElementVal("location");
    var exp=getElementVal("exp")
    saveMessages(job,sal,email,phone,loc,exp);
    alert("sucessfully listed")
    //document.getElementById("register").reset();
  }
  //function to fetch the values from input fields
  const getElementVal = (id) => {
    return document.getElementById(id).value;
    saveMessages();
  };
  

  
  
  const saveMessages = (
    job,
    sal,
    email,
    phone,
    loc,
    exp
) => {

    var userRef = ref(db, 'joblisted/' + job_)
  
    set(userRef, {
       job:job,
       salary:sal,
       email:email,
       phone:phone,
       loc:loc,
       exp:exp,
      })
      .then(()=>{
        console.log("data saved sucessfully")
      })
      .catch(()=>{
        console.log("error");
      })
    document.getElementById("register").reset();

  };
  