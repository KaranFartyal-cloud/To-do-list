const text = document.getElementById("text-input");
const btn = document.getElementById("add-button");
const tasksList = document.querySelector(".tasks-list");

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let task = text.value.trim();

    if (task === "") {
        return;
    }

    // Create task item
    const li = document.createElement("li");
    li.className = "to-dos";

    const taskText = document.createElement("span");
    taskText.textContent = task;

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-minus", "icons");

    li.appendChild(taskText);
    li.appendChild(icon);
    tasksList.appendChild(li);

    // Save task to local storage
    saveTask(task);

    text.value = "";

    // Remove task on click
    icon.addEventListener("click", function () {
        li.remove();
        removeTaskFromStorage(task);
    });
}

// Save task to local storage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage when the page loads
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "to-dos";

        const taskText = document.createElement("span");
        taskText.textContent = task;

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-minus", "icons");

        li.appendChild(taskText);
        li.appendChild(icon);
        tasksList.appendChild(li);

        // Remove task on click
        icon.addEventListener("click", function () {
            li.remove();
            removeTaskFromStorage(task);
        });
    });
}

// Remove task from local storage
function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listeners
btn.addEventListener("click", addTask);
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
