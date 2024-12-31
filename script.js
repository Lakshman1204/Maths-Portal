// Firebase Configuration
const firebaseConfig = {
       apiKey: "AIzaSyAo8JQGpnXp2o4LPGqO_mkNHJTm-ABs59E",
       authDomain: "professional-math-solver.firebaseapp.com",
       projectId: "professional-math-solver",
       storageBucket: "professional-math-solver.appspot.com",
       messagingSenderId: "581138256194",
       appId: "1:581138256194:web:af456ffe60ae0784ad38db"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Account created successfully!");
            signinContainer.style.display = "block";
            signupContainer.style.display = "none";
        })
        .catch((error) => alert(error.message));
});

// Sign-In Functionality
document.getElementById("signin-button").addEventListener("click", () => {
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "student.html"; // Redirect based on user type
        })
        .catch((error) => alert(error.message));
});

// Google Sign-In
document.getElementById("google-signin-button").addEventListener("click", () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(googleProvider)
        .then(() => {
            alert("Google Sign-in successful!");
            window.location.href = "student.html";
        })
        .catch((error) => alert(error.message));
});

// Math Problem Solver
async function solveMathProblem(userType) {
    const inputId = userType === "student" ? "student-math-input" : "teacher-math-input";
    const outputId = userType === "student" ? "student-solution" : "teacher-solution";

    const problem = document.getElementById(inputId).value;

    if (!problem) {
        alert("Please enter a math problem!");
        return;
    }

    const apiUrl = `https://api.mathjs.org/v4/?expr=${encodeURIComponent(problem)}`;

    try {
        const response = await fetch(apiUrl);
        const solution = await response.text();

        document.getElementById(outputId).innerHTML = `<h4>Solution:</h4><p>${solution}</p>`;

        saveQuery(`${problem} = ${solution}`, `${userType}Queries`);
    } catch (error) {
        alert("Error solving the math problem. Please try again.");
        console.error(error);
    }
}

// Graph Functionality
let studentGraph, teacherGraph;

function initializeGraphs() {
    studentGraph = Desmos.GraphingCalculator(document.getElementById("student-graph"));
    teacherGraph = Desmos.GraphingCalculator(document.getElementById("teacher-graph"));
}

function plotGraph(userType) {
    const inputId = userType === "student" ? "student-equation-input" : "teacher-equation-input";
    const graph = userType === "student" ? studentGraph : teacherGraph;

    const equation = document.getElementById(inputId).value;

    if (equation) {
        graph.setExpression({ id: `${userType}Graph`, latex: equation });
        saveEquation(equation, userType);
    } else {
        alert("Please enter a valid equation.");
    }
}

function addAnnotation(userType) {
    const annotationId = userType === "student" ? "student-annotation-input" : "teacher-annotation-input";
    const annotationText = document.getElementById(annotationId).value;
    const graph = userType === "student" ? studentGraph : teacherGraph;

    if (annotationText) {
        graph.setExpression({ id: `annotation${Date.now()}`, latex: `\\text{${annotationText}}` });
    } else {
        alert("Please enter annotation text!");
    }
}

// Query and Equation Management
function saveQuery(query, userType) {
    const storageKey = userType === "student" ? "studentQueries" : "teacherQueries";
    const queries = JSON.parse(localStorage.getItem(storageKey)) || [];
    queries.push({ query, timestamp: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(queries));
    updateLog(storageKey, queries);
}

function saveEquation(equation, userType) {
    const storageKey = userType === "student" ? "studentEquations" : "teacherEquations";
    const equations = JSON.parse(localStorage.getItem(storageKey)) || [];
    equations.push({ equation, timestamp: new Date().toISOString() });
    localStorage.setItem(storageKey, JSON.stringify(equations));
    updateLog(storageKey, equations);
}

function updateLog(storageKey, items) {
    const listId = storageKey.includes("Queries") ? "query-list" : "equation-list";
    const listElement = document.getElementById(listId);

    listElement.innerHTML = "";
    items.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${item.query || item.equation} (Saved on ${new Date(item.timestamp).toLocaleString()})`;
        listElement.appendChild(listItem);
    });
}

// Load Logs on Page Load
window.onload = function () {
    initializeGraphs();

    ["studentQueries", "teacherQueries", "studentEquations", "teacherEquations"].forEach((key) => {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        updateLog(key, items);
    });
};
