class task {
  constructor(title, description, date, priority, notes) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.notes = notes;
  }
}

function displayTask(tasks) {
  const Ul = document.querySelector(".todo ul");
  const h2 = document.createElement("h2");
  const liTitle = document.createElement("li");
  const liDesription = document.createElement("li");
  const liDate = document.createElement("li");
  const liPriority = document.createElement("li");
  const liNotes = document.createElement("li");
  const ul = document.createElement("ul");
  const btn = document.createElement("button");
  const dialog = document.createElement("dialog");
  const div = document.createElement("div");
  div.classList.add("close");
  div.innerHTML = "×";
  dialog.classList.add("itemDetail");
  h2.textContent = tasks.title;
  liDesription.innerHTML = `<b>Description:</b> ${tasks.description}`;
  liDate.innerHTML = `<b>Date:</b> ${tasks.date}`;
  liPriority.innerHTML = `<b>Priority:</b> ${tasks.priority}`;
  liNotes.innerHTML = `<b>Notes:</b> ${tasks.notes}`;
  btn.classList.add("delete");
  btn.textContent = "Delete Task";
  ul.appendChild(liDesription);
  ul.appendChild(liDate);
  ul.appendChild(liPriority);
  ul.appendChild(liNotes);
  dialog.appendChild(div);
  dialog.appendChild(h2);
  dialog.appendChild(ul);
  dialog.appendChild(btn);
  liTitle.innerHTML = `${tasks.title} <button class="details">Details</button>`;
  Ul.appendChild(liTitle);
  Ul.appendChild(dialog);
}
function projectController() {
  // loadFromStorage();
  const newItem = document.querySelector("#newItem");
  newItem.addEventListener("click", () => {
    document.querySelector(".addDialog").showModal();
    const btnClose = document.querySelectorAll(".close");
    Array.from(btnClose).forEach((btn) => {
      btn.addEventListener("click", () => {
        resetInput();
        btn.parentElement.close();
      });
    });
    document.forms[1].addEventListener("submit", function (e) {
      e.preventDefault();
      loadFromInput();
      document.querySelector(".addDialog").close();
    });
  });
  const btnDetail = document.querySelectorAll(".details");
  Array.from(btnDetail).forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.parentElement.nextElementSibling;
      modal.showModal();
      modal.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
          // Handle delete button click
          e.target.parentElement.close();
          e.target.parentElement.previousElementSibling.remove();
          e.target.parentElement.remove();
        } else if (e.target.classList.contains("close")) {
          // Handle close button click
          e.target.parentElement.close();
        }
      });
    });
  });
  const searchBar = document.forms["search-todo"].querySelector("input");
  searchBar.addEventListener("keyup", function (e) {
    const ul = document.querySelector(".todo ul");
    const term = e.target.value.toLowerCase();
    const todos = ul.getElementsByTagName("li");
    Array.from(todos).forEach(function (todo) {
      const title = todo.firstChild.textContent;
      if (title.toLowerCase().indexOf(term) != -1) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  });
}
function loadFromInput() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#date").value;
  const high = document.querySelector("#high").checked;
  const medium = document.querySelector("#medium").checked;
  const notes = document.querySelector("#notes").value;
  let priority;
  if (title === "" || description === "" || date === "") {
    return;
  }
  if (high === true) {
    priority = "high";
  } else if (medium === true) {
    priority = "medium";
  } else {
    priority = "low";
  }
  const newTask = new task(title, description, date, priority, notes);
  displayTask(newTask);
  resetInput();
  // saveToStorage(newTask);
  const btnDetail = document.querySelectorAll(".details");
  Array.from(btnDetail).forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.parentElement.nextElementSibling;
      modal.showModal();
      modal.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
          // Handle delete button click
          e.target.parentElement.close();
          e.target.parentElement.previousElementSibling.remove();
          e.target.parentElement.remove();
        } else if (e.target.classList.contains("close")) {
          // Handle close button click
          e.target.parentElement.close();
        }
      });
    });
  });
}
function resetInput() {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#date").value = "";
  document.querySelector("#high").checked = true;
  document.querySelector("#medium").checked = false;
  document.querySelector("#notes").value = "";
}
projectController();
