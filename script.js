let users = JSON.parse(localStorage.getItem("attendify_users")) || [
    { name: "Aman", present: false },
    { name: "Rishi", present: false },
    { name: "Suman", present: false }
];

function saveUsers() {
    localStorage.setItem("attendify_users", JSON.stringify(users));
}

function renderUsers() {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach((user, index) => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.innerHTML = `
            <span>${user.name}</span>
            <button class="btn" onclick="toggleAttendance(${index})" 
                style="background: ${user.present ? '#00ffcc' : '#ff6f61'}">
                ${user.present ? "Present" : "Absent"}
            </button>
        `;
        userList.appendChild(userDiv);
    });
    updateStats();
}

function toggleAttendance(index) {
    users[index].present = !users[index].present;
    saveUsers();
    renderUsers();
    const userElements = document.querySelectorAll(".user");
    userElements[index].style.transform = "scale(1.05)";
    setTimeout(() => userElements[index].style.transform = "scale(1)", 200);
}

function addUser() {
    const name = prompt("Enter student name:");
    if (name) {
        users.push({ name, present: false });
        saveUsers();
        renderUsers();
    }
}

function clearAttendance() {
    users = users.map(user => ({ ...user, present: false }));
    saveUsers();
    renderUsers();
    document.querySelector(".container").classList.add("shake");
    setTimeout(() => document.querySelector(".container").classList.remove("shake"), 500);
}

function updateStats() {
    const presentCount = users.filter(user => user.present).length;
    const absentCount = users.length - presentCount;
    document.getElementById("presentCount").textContent = presentCount;
    document.getElementById("absentCount").textContent = absentCount;
}

// Shake animation CSS injection
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    .shake {
        animation: shake 0.5s ease;
    }
`, styleSheet.cssRules.length);

renderUsers();