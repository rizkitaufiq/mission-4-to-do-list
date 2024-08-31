const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

window.onload = function () {
  loadTaskData();
};

function formatDay(dateString) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return days[date.getDay()];
}

function formatDate(date) {
  const dates = new Date(date);
  let month = "" + (dates.getMonth() + 1);
  let day = "" + dates.getDate();
  const year = dates.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

document
  .getElementById("dataFormMakeToDoList")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let taskInput = document.getElementById("task");
    let task = taskInput.value.trim();

    let priorityLevelInput = document.getElementById("priorityLevel");
    let priorityLevel = priorityLevelInput.value;

    if (task === "") {
      alert("Please input your task");
      return;
    }

    let bodyToDoListData = document.getElementById("bodyToDoListData");

    let row = document.createElement("tr");

    let statusCell = document.createElement("td");
    statusCell.classList.add("px-4", "py-2", "text-center");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("mr-2");
    checkbox.addEventListener("change", function () {
      toggleTaskCompletion(taskCell, row);
    });

    statusCell.appendChild(checkbox);

    let taskCell = document.createElement("td");
    taskCell.classList.add("px-4", "py-2");
    taskCell.textContent = task;

    let priorityLevelCell = document.createElement("td");
    priorityLevelCell.classList.add("px-4", "py-2");
    priorityLevelCell.textContent = priorityLevel;

    const currentDate = new Date();
    let day = formatDay(currentDate);
    let date = formatDate(currentDate);

    let dayDate = `${day}, ${date}`;

    let dayDateCell = document.createElement("td");

    dayDateCell.classList.add("px-4", "py-2");
    dayDateCell.textContent = dayDate;

    row.appendChild(statusCell);
    row.appendChild(taskCell);
    row.appendChild(priorityLevelCell);
    row.appendChild(dayDateCell);

    bodyToDoListData.appendChild(row);

    saveTasks();

    taskInput.value = "";
  });

function toggleTaskCompletion(taskCell, row) {
  let bodyToDoListData = document.getElementById("bodyToDoListData");
  let bodyIsDoneToDoListData = document.getElementById(
    "bodyIsDoneToDoListData"
  );

  if (row.parentNode === bodyToDoListData) {
    taskCell.style.textDecoration = "line-through";
    bodyIsDoneToDoListData.appendChild(row);
  } else {
    taskCell.style.textDecoration = "none";
    bodyToDoListData.appendChild(row);
  }

  saveTasks();
}

function saveTasks() {
  let toDoList = [];
  let isDoneToDoList = [];

  document.querySelectorAll("#bodyToDoListData tr").forEach(function (row) {
    let toDoListData = {
      task: row.children[1].textContent,
      priorityLevel: row.children[2].textContent,
      dayDate: row.children[3].textContent,
      completed: false,
    };
    toDoList.push(toDoListData);
  });

  document
    .querySelectorAll("#bodyIsDoneToDoListData tr")
    .forEach(function (row) {
      let toDoListData = {
        task: row.children[1].textContent,
        priorityLevel: row.children[2].textContent,
        dayDate: row.children[3].textContent,
        completed: true,
      };
      isDoneToDoList.push(toDoListData);
    });

  localStorage.setItem("toDoListData", JSON.stringify(toDoList));
  localStorage.setItem("isDoneToDoListData", JSON.stringify(isDoneToDoList));
}

function loadTaskData() {
  let toDoListData = JSON.parse(localStorage.getItem("toDoListData")) || [];
  let isDoneToDoListData =
    JSON.parse(localStorage.getItem("isDoneToDoListData")) || [];

  let bodyToDoListData = document.getElementById("bodyToDoListData");
  let bodyIsDoneToDoListData = document.getElementById(
    "bodyIsDoneToDoListData"
  );

  toDoListData.forEach(function (toDo) {
    let row = document.createElement("tr");

    let statusCell = document.createElement("td");
    statusCell.classList.add("px-4", "py-2");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("mr-2");
    checkbox.checked = toDo.completed;
    checkbox.addEventListener("change", function () {
      toggleTaskCompletion(taskCell, row);
    });
    statusCell.appendChild(checkbox);

    let taskCell = document.createElement("td");
    taskCell.classList.add("px-4", "py-2");
    taskCell.textContent = toDo.task;
    if (task.completed) {
      taskCell.style.textDecoration = "line-through";
    }

    let priorityLevelCell = document.createElement("td");
    priorityLevelCell.classList.add("px-4", "py-2");
    priorityLevelCell.textContent = toDo.priorityLevel;

    let dayDates = toDo.dayDate;
    const dayDateSplite = dayDates.split(",")[1].trim();
    const taskDate = new Date(dayDateSplite);

    const currentDay = new Date();
    currentDay.setHours(0, 0, 0, 0);

    let dayDateCell = document.createElement("td");

    if (taskDate < currentDay) {
      dayDateCell.classList.add("px-4", "py-2", "text-primary");
    }

    dayDateCell.classList.add("px-4", "py-2");
    dayDateCell.textContent = toDo.dayDate;

    row.appendChild(statusCell);
    row.appendChild(taskCell);
    row.appendChild(priorityLevelCell);
    row.appendChild(dayDateCell);

    bodyToDoListData.appendChild(row);
  });

  isDoneToDoListData.forEach(function (toDo) {
    let row = document.createElement("tr");

    let statusCell = document.createElement("td");
    statusCell.classList.add("px-4", "py-2");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("mr-2");
    checkbox.checked = toDo.completed;
    checkbox.addEventListener("change", function () {
      toggleTaskCompletion(taskCell, row);
    });
    statusCell.appendChild(checkbox);

    let taskCell = document.createElement("td");
    taskCell.style.textDecoration = "line-through";
    taskCell.textContent = toDo.task;

    let priorityLevelCell = document.createElement("td");
    priorityLevelCell.classList.add("px-4", "py-2");
    priorityLevelCell.textContent = toDo.priorityLevel;

    let dayDateCell = document.createElement("td");
    dayDateCell.classList.add("px-4", "py-2");
    dayDateCell.textContent = toDo.dayDate;

    row.appendChild(statusCell);
    row.appendChild(taskCell);
    row.appendChild(priorityLevelCell);
    row.appendChild(dayDateCell);

    bodyIsDoneToDoListData.appendChild(row);
  });
}

document.getElementById("deleteAll").addEventListener("click", function () {
  if (confirm("Are you sure you want to delete all To Do List data?")) {
    localStorage.clear();
    alert("All data has been cleared!");
  }
  location.reload();
});
