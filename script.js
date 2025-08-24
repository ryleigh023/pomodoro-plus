
// Pomodoro Timer

// -----------------------
// Timer
// -----------------------
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Start button
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Break time!");
      }
    }, 1000);
  }
});

// Pause/Resume button
pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    pauseBtn.textContent = "Resume";
  } else {
    isRunning = true;
    pauseBtn.textContent = "Pause";
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        alert("Break time!");
      }
    }, 1000);
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
  pauseBtn.textContent = "Pause";
});

// Initial display
updateDisplay();

// -----------------------
// To-Do List
// -----------------------
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px";

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.border = "none";
  deleteBtn.style.color = "#fff";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.fontSize = "1rem";

  // Strike-through when checked
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.7";
    } else {
      span.style.textDecoration = "none";
      span.style.opacity = "1";
    }
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = "";
}

addTodoBtn.addEventListener("click", addTask);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// -----------------------
// Ambient Sounds
// -----------------------
const soundSelect = document.getElementById("sound-select");
let audio = null;

soundSelect.addEventListener("change", function () {
  const selectedSound = this.value;

  // Stop current sound
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  if (selectedSound !== "none") {
    audio = new Audio(selectedSound);
    audio.loop = true;
    try {
      audio.play();
    } catch (err) {
      console.log("Audio play blocked:", err);
      alert("Please interact with the page first to enable sounds.");
    }
  }
});

// -----------------------
// Dark/Light Mode Toggle
// -----------------------
const themeToggle = document.getElementById("theme-toggle");
const bgVideo = document.getElementById("bg-video");

themeToggle.addEventListener("click", () => {
  if (!document.body.classList.contains("dark-mode")) {
    // Switch to Dark Mode
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    bgVideo.pause();
    bgVideo.style.display = "none";
  } else {
    // Switch back to Light Mode
    document.body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙 ";
    bgVideo.style.display = "block";
    bgVideo.play();
  }
});
