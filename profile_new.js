import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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
const db = getDatabase();
const userId = JSON.parse(localStorage.getItem("currentUserid"));
const userRef = ref(db, 'workerinfo/' + userId);

function toggleAvailability() {
    onValue(userRef, (snapshot) => {
        const available = snapshot.val().available;
        set(userRef, { available: !available });
        updateButtonOpacity(!available);
    });
}

function updateButtonOpacity(available) {
    const atworkButton = document.getElementById('atworkButton');
    const availButton = document.getElementById('availButton');

    if (available) {
        availButton.classList.add('active');
        atworkButton.classList.remove('active');
    } else {
        availButton.classList.remove('active');
        atworkButton.classList.add('active');
    }
}

const greenBtn = document.getElementById('avail');
const redBtn = document.getElementById('Atwork');
const p_text = document.getElementById("status");

greenBtn.addEventListener("click", () => {
    toggleAvailability();
});

redBtn.addEventListener("click", () => {
    toggleAvailability();
});

function loadInitialAvailability() {
    onValue(userRef, (snapshot) => {
        const available = snapshot.val().available;
        updateButtonOpacity(available);
    });
}

const userData = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("name").innerHTML = userData.fullname;
document.getElementById("job").innerHTML = userData.jobcategory;
document.getElementById("phone").innerHTML = `<strong>Phone:</strong> ${userData.phoneNumber}`;
document.getElementById("rating-text").innerHTML = `<strong>Current Rating:</strong> ${userData.rating}`;
document.getElementById("email").innerHTML = `<strong>Email:</strong> ${userData.email}`;
document.getElementById("exp").innerHTML = `${userData.exp} years of experience`;

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserid");
    window.location.href = "login.html";
});

loadInitialAvailability();
