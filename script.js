// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAo8JQGpnXp2o4LPGqO_mkNHJTm-ABs59E",
    authDomain: "professional-math-solver.firebaseapp.com",
    projectId: "professional-math-solver",
    storageBucket: "professional-math-solver.appspot.com",
    messagingSenderId: "581138256194",
    appId: "1:581138256194:web:af456ffe60ae0784ad38db",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const USERS_DB = "usersDatabase";

// Toggle Between Sign-In and Sign-Up
const signinContainer = document.getElementById("signin-container");
const signupContainer = document.getElementById("signup-container");

document.getElementById("signup-link").addEventListener("click", () => {
    signinContainer.style.display = "none";
    signupContainer.style.display = "block";
});

document.getElementById("signin-link").addEventListener("click", () => {
    signinContainer.style.display = "block";
    signupContainer.style.display = "none";
});

// Sign-Up Functionality
document.getElementById("signup-button").addEventListener("click", () => {
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const message = document.getElementById("message");

    if (!username || !email || !password) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    // Check localStorage for username
    const users = JSON.parse(localStorage.getItem(USERS_DB)) || {};
    if (users[username]) {
        message.textContent = "Username already exists.";
        message.style.color = "red";
        return;
    }

    // Firebase sign-up
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            // Save username in localStorage
            users[username] = email;
            localStorage.setItem(USERS_DB, JSON.stringify(users));
            message.textContent = "Account created successfully!";
            message.style.color = "green";
            signinContainer.style.display = "block";
            signupContainer.style.display = "none";
        })
        .catch((error) => {
            message.textContent = error.message;
            message.style.color = "red";
        });
});

// Sign-In Functionality
document.getElementById("signin-button").addEventListener("click", () => {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;
    const message = document.getElementById("message");

    if (!username || !password) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    // Check localStorage for username and get email
    const users = JSON.parse(localStorage.getItem(USERS_DB)) || {};
    const email = users[username];

    if (!email) {
        message.textContent = "Invalid username.";
        message.style.color = "red";
        return;
    }

    // Firebase sign-in
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            message.textContent = Welcome back, ${username}!;
            message.style.color = "green";
            window.location.href = "student.html"; // Redirect after login
        })
        .catch((error) => {
            message.textContent = error.message;
            message.style.color = "red";
        });
});

// Google Sign-In
document.getElementById("google-signin-button").addEventListener("click", () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(googleProvider)
        .then(() => {
            alert("Google Sign-in successful!");
            window.location.href =
