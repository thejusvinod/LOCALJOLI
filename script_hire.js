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




function passConfirm(pass,confirmpass)
  {
    var text=document.getElementById("messege1");
    if(pass!=confirmpass && pass!="" && confirmpass!="")
    {
      text.textContent="passwords donot match";
      text.style.color="red";
      return false;
    }else if(pass==confirmpass && pass!="" && confirmpass!="")
    {
      return true;
    }
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
  
    var fullname = getElementVal("fullName");
    var username = getElementVal("username");
    var phone = getElementVal("phoneNumber");
    var email = getElementVal("email");
    var gender = getElementVal("gender");
    var dob = getElementVal("dob");
    var password = getElementVal("password");
    var confirmpass=getElementVal("confirmPassword");
  
    
    var flag=emptyFields(e);
    if(flag)
    var flag2=passConfirm(password,confirmpass);
    if(flag && flag2){

     //registering user with email and password
      createUserWithEmailAndPassword(auth,email,password)
      .then((credentials)=>{
        console.log("User created sucessfully");
        saveMessages(fullname,username,phone,email,gender,dob,password,credentials.user.uid);
        window.location.href="login.html";
  })
      .catch((error)=>{
      alert("email already registerd");
      console.log("Error",error);
  })

  
}
    
    //document.getElementById("register").reset();
  }
  //function to fetch the values from input fields
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };
  

  
  
  const saveMessages = (
    fullname,
    username,
    phone,
    email,
    gender,
    dob,
    password,newUserId) => {

    var userRef = ref(db, 'employerinfo/' + newUserId)
  
    set(userRef, {
        fullname: fullname,
        username: username,
        phoneNumber: phone,
        email: email,
        gender: gender,
        dob: dob,
        password: password,
      })
      .then(()=>{
        console.log("data saved sucessfully")
      })
      .catch(()=>{
        console.log("error");
      })
    document.getElementById("register").reset();
    const text=document.getElementById("messege1");
    text.textContent="";
  };
  