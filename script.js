// Show/Hide Forms
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('auth-section').classList.add('hidden');
}

function showSignUp() {
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('auth-section').classList.add('hidden');
}

function hideForms() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('auth-section').classList.remove('hidden');
}

// Handle Login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === "student" && password === "password") {
        alert("Welcome, student!");
    } else if (username === "teacher" && password === "password") {
        alert("Welcome, teacher!");
    } else {
        alert("Invalid credentials!");
    }
    hideForms();
}

// Handle Sign-Up
function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        alert("Sign-up successful! Use your credentials to log in.");
    } else {
        alert("Please fill in all fields.");
    }
    hideForms();
}
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === "student" && password === "password") {
        window.location.href = "student.html"; // Redirect to Student Page
    } else if (username === "teacher" && password === "password") {
        window.location.href = "teacher.html"; // Redirect to Teacher Page
    } else {
        alert("Invalid credentials!");
    }
    hideForms();
}
function solveMath() {
    const problem = document.getElementById('math-problem').value;
    const solutionDisplay = document.getElementById('math-solution');

    try {
        const solution = eval(problem); // Evaluates simple math expressions
        solutionDisplay.textContent = `Solution: ${solution}`;
    } catch (error) {
        solutionDisplay.textContent = "Invalid math problem. Please try again.";
    }
}
let calculator; // Declare the calculator globally

function initializeGraph() {
    const elt = document.getElementById('graph-container');
    calculator = Desmos.GraphingCalculator(elt, { expressions: false });
}

function plotGraph() {
    const equation = document.getElementById('graph-equation').value;
    if (equation) {
        calculator.setExpression({ id: 'graph1', latex: equation });
    } else {
        alert("Please enter a valid equation!");
    }
}

// Initialize the graph when the page loads
window.onload = function () {
    initializeGraph();
};
let teacherCalculator; // Declare a calculator for teachers

function initializeTeacherGraph() {
    const elt = document.getElementById('teacher-graph-container');
    teacherCalculator = Desmos.GraphingCalculator(elt, { expressions: false });
}

function plotTeacherGraph() {
    const equation = document.getElementById('teacher-graph-equation').value;
    if (equation) {
        teacherCalculator.setExpression({ id: 'teacherGraph1', latex: equation });
    } else {
        alert("Please enter a valid equation!");
    }
}

// Initialize the teacher graph when the page loads
window.onload = function () {
    initializeGraph(); // Student graph
    initializeTeacherGraph(); // Teacher graph
};
const studentQueries = [];
const teacherQueries = [];

function saveQuery(query, userType) {
    if (userType === "student") {
        studentQueries.push(query);
        updateQueryLog('query-list', studentQueries);
    } else if (userType === "teacher") {
        teacherQueries.push(query);
        updateQueryLog('teacher-query-list', teacherQueries);
    }
}

function updateQueryLog(listId, queries) {
    const queryList = document.getElementById(listId);
    queryList.innerHTML = ""; // Clear previous entries
    queries.forEach((query, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${query}`;
        queryList.appendChild(listItem);
    });
}

function solveMath() {
    const problem = document.getElementById('math-problem').value;
    if (problem) {
        saveQuery(problem, "student");
    }
    // Existing solveMath logic...
}

function plotGraph() {
    const equation = document.getElementById('graph-equation').value;
    if (equation) {
        saveQuery(equation, "student");
    }
    // Existing plotGraph logic...
}

function plotTeacherGraph() {
    const equation = document.getElementById('teacher-graph-equation').value;
    if (equation) {
        saveQuery(equation, "teacher");
    }
    // Existing plotTeacherGraph logic...
}
function saveQuery(query, userType) {
    const storageKey = userType === "student" ? "studentQueries" : "teacherQueries";

    // Retrieve existing queries from local storage
    const existingQueries = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // Add the new query
    existingQueries.push({ query, timestamp: new Date().toISOString() });
    
    // Save updated queries back to local storage
    localStorage.setItem(storageKey, JSON.stringify(existingQueries));

    // Update the UI
    updateQueryLog(storageKey, existingQueries);
}

function updateQueryLog(storageKey, queries) {
    const listId = storageKey === "studentQueries" ? "query-list" : "teacher-query-list";
    const queryList = document.getElementById(listId);

    // Clear the current list
    queryList.innerHTML = "";

    // Add each query to the list
    queries.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${entry.query} (Saved on ${new Date(entry.timestamp).toLocaleString()})`;
        queryList.appendChild(listItem);
    });
}

// Load queries from local storage on page load
window.onload = function () {
    initializeGraph(); // Student graph
    initializeTeacherGraph(); // Teacher graph

    // Load student queries
    const studentQueries = JSON.parse(localStorage.getItem("studentQueries")) || [];
    updateQueryLog("studentQueries", studentQueries);

    // Load teacher queries
    const teacherQueries = JSON.parse(localStorage.getItem("teacherQueries")) || [];
    updateQueryLog("teacherQueries", teacherQueries);
};
function clearQueries(storageKey) {
    localStorage.removeItem(storageKey);

    // Update the UI
    const listId = storageKey === "studentQueries" ? "query-list" : "teacher-query-list";
    const queryList = document.getElementById(listId);
    queryList.innerHTML = "";
}
// Initialize Graph for Students
let studentGraph;
function initializeGraph() {
    const elt = document.getElementById("graph");
    studentGraph = Desmos.GraphingCalculator(elt);
}

// Plot Graph for Students
function plotGraph() {
    const equation = document.getElementById("equation-input").value;

    if (equation) {
        studentGraph.setExpression({ id: 'graph1', latex: equation });
    } else {
        alert("Please enter a valid equation.");
    }
}

// Initialize Graph for Teachers
let teacherGraph;
function initializeTeacherGraph() {
    const elt = document.getElementById("teacher-graph");
    teacherGraph = Desmos.GraphingCalculator(elt);
}

// Plot Graph for Teachers
function plotTeacherGraph() {
    const equation = document.getElementById("teacher-equation-input").value;

    if (equation) {
        teacherGraph.setExpression({ id: 'teacherGraph1', latex: equation });
    } else {
        alert("Please enter a valid equation.");
    }
}
function saveEquation(equation, userType) {
    const storageKey = userType === "student" ? "studentEquations" : "teacherEquations";

    // Retrieve existing equations from local storage
    const existingEquations = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Add the new equation
    existingEquations.push({ equation, timestamp: new Date().toISOString() });

    // Save updated equations back to local storage
    localStorage.setItem(storageKey, JSON.stringify(existingEquations));

    // Update the UI
    updateEquationLog(storageKey, existingEquations);
}

function updateEquationLog(storageKey, equations) {
    const listId = storageKey === "studentEquations" ? "equation-list" : "teacher-equation-list";
    const equationList = document.getElementById(listId);

    // Clear the current list
    equationList.innerHTML = "";

    // Add each equation to the list
    equations.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${entry.equation} (Saved on ${new Date(entry.timestamp).toLocaleString()})`;
        equationList.appendChild(listItem);
    });
}
function plotGraph() {
    const equation = document.getElementById("equation-input").value;

    if (equation) {
        studentGraph.setExpression({ id: 'graph1', latex: equation });
        saveEquation(equation, "student");
    } else {
        alert("Please enter a valid equation.");
    }
}

function plotTeacherGraph() {
    const equation = document.getElementById("teacher-equation-input").value;

    if (equation) {
        teacherGraph.setExpression({ id: 'teacherGraph1', latex: equation });
        saveEquation(equation, "teacher");
    } else {
        alert("Please enter a valid equation.");
    }
}
window.onload = function () {
    initializeGraph(); // Student graph
    initializeTeacherGraph(); // Teacher graph

    // Load student queries
    const studentQueries = JSON.parse(localStorage.getItem("studentQueries")) || [];
    updateQueryLog("studentQueries", studentQueries);

    // Load teacher queries
    const teacherQueries = JSON.parse(localStorage.getItem("teacherQueries")) || [];
    updateQueryLog("teacherQueries", teacherQueries);

    // Load student equations
    const studentEquations = JSON.parse(localStorage.getItem("studentEquations")) || [];
    updateEquationLog("studentEquations", studentEquations);

    // Load teacher equations
    const teacherEquations = JSON.parse(localStorage.getItem("teacherEquations")) || [];
    updateEquationLog("teacherEquations", teacherEquations);
};
async function solveMathProblem(userType) {
    const inputId = userType === "student" ? "student-math-input" : "teacher-math-input";
    const outputId = userType === "student" ? "student-solution" : "teacher-solution";

    const problem = document.getElementById(inputId).value;

    if (!problem) {
        alert("Please enter a math problem!");
        return;
    }

    // Mock API call (replace this with a real API when available)
    const apiUrl = `https://api.mathjs.org/v4/?expr=${encodeURIComponent(problem)}`;

    try {
        const response = await fetch(apiUrl);
        const solution = await response.text();

        document.getElementById(outputId).innerHTML = `
            <h4>Solution:</h4>
            <p>${solution}</p>
        `;

        // Optionally save the problem and solution
        saveQuery(`${problem} = ${solution}`, `${userType}Queries`);
    } catch (error) {
        alert("Error solving the math problem. Please try again.");
        console.error(error);
    }
}
function addAnnotation(userType) {
    const annotation = userType === "student" 
        ? document.getElementById("annotation-input").value 
        : document.getElementById("teacher-annotation-input").value;

    if (!annotation) {
        alert("Please enter annotation text!");
        return;
    }

    const graph = userType === "student" ? studentGraph : teacherGraph;
    graph.setExpression({ id: `annotation${Date.now()}`, latex: `\\text{${annotation}}` });
}