// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { set, ref, getDatabase, push, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyD13Q2KObzuB3IM9LvKgeAaQk6TaSiJzL0",
    authDomain: "localjoli.firebaseapp.com",
    databaseURL: "https://localjoli-default-rtdb.firebaseio.com",
    projectId: "localjoli",
    storageBucket: "localjoli.appspot.com",
    messagingSenderId: "445146514525",
    appId: "1:445146514525:web:fef1706c002414c840b9b4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase authentication instance
const auth = getAuth(app);

// Function to check if passwords match
function passConfirm(pass, confirmpass) {
    var text = document.getElementById("messege1");
    if (pass != confirmpass && pass != "" && confirmpass != "") {
        text.textContent = "Passwords do not match";
        text.style.color = "red";
        return false;
    } else if (pass == confirmpass && pass != "" && confirmpass != "") {
        return true;
    }
}

// Function to check for empty fields in the form
function emptyFields(e) {
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
    } else {
        return true;
    }
}

// Get reference to the Firebase Realtime Database
const db = getDatabase();
const employerinfoDB = ref(db, "workerinfo");

// Add event listener to the form submission
document.getElementById("register").addEventListener("submit", submitForm);

// Function to handle form submission
function submitForm(e) {
    e.preventDefault();

    // Fetch input values
    var fullname = getElementVal("fullName");
    var username = getElementVal("username");
    var phone = getElementVal("phoneNumber");
    var email = getElementVal("email");
    var gender = getElementVal("gender");
    var jobcategory = getElementVal("Job-category");
    var exp = getElementVal("experience");
    var dob = getElementVal("dob");
    var password = getElementVal("password");
    var confirmpass = getElementVal("confirmPassword");
    var city=getElementVal("city");
    var rating = 0;

    // Check for empty fields and matching passwords
    var flag = emptyFields(e);
    if (flag)
        var flag2 = passConfirm(password, confirmpass);

    // If validation passes, create user
    if (flag && flag2) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                console.log("User created successfully");
                saveMessages(fullname, username, phone, email, gender, jobcategory, exp, dob, password, rating,city, credentials.user.uid);
                window.location.href = 'login2.html'; // Redirect to login page
            })
            .catch((error) => {
                alert("Email already exists. Use a different email");
                console.log("Error", error);
            });
    }
}

// Function to format date to "day-month-year"
const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

// Function to fetch values from input fields
const getElementVal = (id) => {
    return document.getElementById(id).value;
};

// Get the formatted last login timestamp
const lastLoginTimestamp = formatDate(new Date());

// Function to save user data to Firebase Realtime Database
const saveMessages = (
    fullname,
    username,
    phone,
    email,
    gender,
    jobcategory,
    exp,
    dob,
    password,
    rating,
    city,
    newUserId) => {

    var userRef = ref(db, 'workerinfo/' + newUserId);

    set(userRef, {
        fullname: fullname,
        username: username,
        phoneNumber: phone,
        email: email,
        gender: gender,
        jobcategory: jobcategory,
        exp: exp,
        rating: rating,
        n: 0,
        dob: dob,
        password: password,
        available: true,
        userid: newUserId,
        lastlogin: lastLoginTimestamp,
        location:city,

    })
        .then(() => {
            console.log("Data saved successfully");
        })
        .catch(() => {
            console.log("Error");
        });

    document.getElementById("register").reset(); // Reset form fields
    const text = document.getElementById("messege1");
    text.textContent = ""; // Clear message
};
