import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { ref, child, getDatabase, get, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase configuration
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
console.log("Firebase initialized");

// Get current user ID from localStorage
const userid = JSON.parse(localStorage.getItem("currentUserid"));
const db = getDatabase();
const userRef = ref(db, 'workerinfo/' + userid);

const greenBtn = document.getElementById('green-btn');
const redBtn = document.getElementById('red-btn');
const p_text = document.getElementById("status");

// Function to check availability from the database
async function checkAvail() {
    const snapshot = await get(child(ref(db), 'workerinfo/' + userid));
    if (snapshot.exists()) {
        return snapshot.val().available;
    }
    return false; // Default to false if no data exists
}

// Function to update availability in the database
function updateAvail(newAvail) {
    return update(userRef, {
        available: newAvail,
       
    });
}

// Function to update UI based on availability
function updateUI(isAvailable) {
    if (isAvailable) {
        greenBtn.style.backgroundColor = 'green';
        redBtn.style.backgroundColor = 'red';
        p_text.textContent = "Current Status: Available";
    } else {
        greenBtn.style.backgroundColor = 'red';
        redBtn.style.backgroundColor = 'green';
        p_text.textContent = "Current Status: At work";
    }
}

// Function to toggle availability
async function toggleAvailability() {
    const currentAvail = await checkAvail();
    const newAvail = !currentAvail;
    await updateAvail(newAvail);
    updateUI(newAvail);
}

// Initial check and UI update on page load
checkAvail().then(updateUI);

// Event listeners for buttons
greenBtn.addEventListener("click", toggleAvailability);
redBtn.addEventListener("click", toggleAvailability);

// Display user information
const userData = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("name").innerHTML = userData.fullname;
document.getElementById("job").innerHTML = userData.jobcategory;
document.getElementById("phone").innerHTML = `<strong>Phone:</strong> ${userData.phoneNumber}`;
document.getElementById("rating-text").innerHTML = `<strong>Current Rating:</strong> ${userData.rating}`;
document.getElementById("email").innerHTML = `<strong>Email:</strong> ${userData.email}`;
document.getElementById("exp").innerHTML = `${userData.exp} years of experience`;




// Logout functionality
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserid");
    window.location.href = "login.html";
});
