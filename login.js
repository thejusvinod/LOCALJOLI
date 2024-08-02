import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {set,ref,child,getDatabase,get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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
const db=getDatabase();
const dbref=ref(db);



document.getElementById("mainform").addEventListener("submit", function (evt) {
    console.log("entered");
    evt.preventDefault();

    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    if(email=="admin@gmail.com" && pass=="admin123")
        {
            window.location.href="admin-inspect2.html"
        }

    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        console.log("User logged in successfully:", userCredential.user);
        console.log(userCredential.user.uid);

        // Retrieve user information from Firebase Realtime Database
        const userId = userCredential.user.uid;
        const userRef = ref(db, 'employerinfo/'+userId);

        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists) {
                    const userData = snapshot.val();
                    console.log("User data:", userData);

                    // Store user data in Local Storage
                    localStorage.setItem("currentUsere", JSON.stringify(userData));
                    localStorage.setItem("currentUserid", JSON.stringify(userId));


                    // Redirect to main.html or handle user data as needed
                    window.location.href = "profile_hire.html";
                    console.log(localStorage.getItem(currentUsere));
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
