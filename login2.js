import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { update, ref, getDatabase, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const auth = getAuth(app);
const db = getDatabase(app);

document.getElementById("mainform").addEventListener("submit", function (evt) {
    console.log("entered");
    evt.preventDefault();

    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;

    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            console.log("User logged in successfully:", userCredential.user);
            const userId = userCredential.user.uid;

            // Retrieve user information from Firebase Realtime Database
            const userRef = ref(db, 'workerinfo/' + userId);

            get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        console.log("User data:", userData);

                        // Update the last login timestamp in the day-month-year format
                        const now = new Date();
                        const day = String(now.getDate()).padStart(2, '0');
                        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                        const year = now.getFullYear();
                        const lastLoginTimestamp = `${day}-${month}-${year}`;

                        update(userRef, {
                            lastlogin: lastLoginTimestamp
                        }).then(() => {
                            console.log("Last login timestamp updated");

                            // Store user data in Local Storage
                            localStorage.setItem("currentUser", JSON.stringify(userData));
                            localStorage.setItem("currentUserid", JSON.stringify(userId));

                            // Redirect to profile.html or handle user data as needed
                            window.location.href = "profile.html";
                            console.log(localStorage.getItem("currentUser"));
                        }).catch((error) => {
                            console.error("Error updating last login timestamp:", error);
                        });

                    } else {
                        console.log("User data not found");
                    }
                })
                .catch((error) => {
                    console.error("Error retrieving user data:", error);
                });
        })
        .catch((error) => {
            alert("Invalid email id or password");
            console.error("Error:", error);
        });
});