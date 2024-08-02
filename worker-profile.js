import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, query, orderByChild, equalTo, get, update, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
console.log("Firebase initialized");

const userData = JSON.parse(sessionStorage.getItem("userData1"));
console.log(`Querying for email: ${userData.email}`);

const usersRef = ref(db, 'workerinfo');
const q = query(usersRef, orderByChild('email'), equalTo(userData.email));
const snapshot = await get(q);
const userData1 = snapshot.val();
const userid = Object.keys(userData1)[0];
console.log("user id=" + userid);

const userRef = ref(db, 'workerinfo/' + userid);

// Rating logic
var rating = 0;
var stars = document.querySelectorAll(".stars1");
console.log(stars);

stars.forEach(star => {
    star.addEventListener("click", () => {
        rating = parseInt(star.getAttribute("data-value"));
        updateStarRating(rating);
        console.log("rating:" + rating);
        updateRating(rating);
    });
    star.addEventListener('mouseover', () => {
        const hoverRating = star.getAttribute('data-value');
        updateStarRating(hoverRating);
    });
    star.addEventListener('mouseout', () => {
        updateStarRating(rating);
    });
});

function updateStarRating(rating) {
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

async function updateRating(rating) {
    let cur_rating = 0;
    let cur_n = 0;
    const snapshot = await get(child(ref(db), 'workerinfo/' + userid));
    if (snapshot.exists()) {
        cur_rating = snapshot.val().rating;
        cur_n = snapshot.val().n;
    }

    cur_rating = parseFloat(cur_rating);
    cur_n = parseInt(cur_n);

    const new_rating = cur_rating + rating;
    const new_n = cur_n + 1;

    console.log("cur_rating: " + cur_rating);
    console.log("new_rating: " + new_rating);
    console.log("cur_n: " + cur_n);
    console.log("new_n: " + new_n);

    await update(userRef, {
        rating: new_rating,
        n: new_n,
    });

    console.log("Rating updated successfully");

    // Update the rating text
    const averageRating = Math.floor(new_rating / new_n);
    document.getElementById("rating-text").innerHTML = `<strong>Current Rating:</strong> ${averageRating}`;
}

// Assuming userData1 contains information about the user to be displayed
console.log(`User data loaded from sessionStorage: ${JSON.stringify(userData)}`);

document.getElementById("name").innerHTML = userData.fullname;
document.getElementById("job").innerHTML = userData.jobcategory;
document.getElementById("phone").innerHTML = `<strong>Phone:</strong> ${userData.phoneNumber}`;
document.getElementById("email").innerHTML = `<strong>Email:</strong> ${userData.email}`;
document.getElementById("exp").innerHTML = `${userData.exp} years of experience`;
document.getElementById("phone").innerHTML = `<a aria-label="Chat on WhatsApp" href="https://wa.me/${userData.phoneNumber}"> <img alt="Chat on WhatsApp" src="mini/icons8-whatsapp-48.png" /></a>`;

// Calculate and display the current average rating
const initialRating = userData.rating || 0;
const initialN = userData.n || 1;
const averageRating = Math.floor(initialRating / initialN);
console.log(averageRating);
document.getElementById("rating-text").innerHTML = `<strong>Current Rating:</strong> ${averageRating}`;
