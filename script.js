// JavaScript
const form = document.querySelector("form");
const input = document.querySelector(".title");
const output = document.querySelector(".output");
const clearBtn = document.querySelector(".clear");
const todosCount = document.querySelector(".todos-count");
const totalTodosCount = document.querySelector(".total");
const completedTodosCount = document.querySelector(".completed");
const processingTodosCount = document.querySelector(".processing");

// Создаем кнопку для очистки всех тудушек
const clearAllBtn = document.createElement("button");
clearAllBtn.textContent = "Clear All";
clearAllBtn.classList.add("clear-all-btn");
clearAllBtn.style.display = "none"; // Начально скрываем кнопку

const updateClearAllButtonVisibility = () => {
  clearAllBtn.style.display = todos.length > 0 ? "block" : "none";
};

clearAllBtn.addEventListener("click", () => {
  todos = [];
  output.innerHTML = "";
  todosCount.textContent = "Done: 0";
  totalTodosCount.textContent = "All todos: 0";
  completedTodosCount.textContent = "Processing: 0";
  clearAllBtn.style.display = "none";
});

// Добавляем кнопку в DOM
document.body.appendChild(clearAllBtn);

// data state
let todos = [];

const createTodo = () => {
  const task = {
    id: new Date().toISOString(),
    title: input.value,
    status: false,
    date: new Date(),
  };
  input.value = "";
  todos = [...todos, task];
  renderTodos();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createTodo();
});

const renderTodos = () => {
  output.innerHTML = "";
  todos.forEach((el, index) => {
    const wrap = document.createElement("div");
    const title = document.createElement("p");
    const text = document.createElement("p");
    const dateText = document.createElement("p");
    const edit = document.createElement("button");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const checkbox = document.createElement("input");
    const clear = document.createElement("button");
    title.textContent = `${index + 1}) ${el.title}`;
    edit.textContent = "edit";
    delBtn.textContent = "delete";
    doneBtn.textContent = "done";
    checkbox.type = "checkbox";

    wrap.style.background = el.status ? "lightgreen" : "pink";
    text.textContent = el.status ? "Todo is completed" : "Processing";
    dateText.textContent = generateDate(el.date);

    wrap.append(title, edit, delBtn, doneBtn, checkbox, text, dateText, clear);
    output.append(wrap);

    edit.addEventListener("click", () => {
      editTodo(el.id);
    });
    delBtn.addEventListener("click", () => {
      deleteTodo(el.id);
    });
    doneBtn.addEventListener("click", () => {
      doneTodo(el.id);
      // Toggle background color when Done button is clicked
      wrap.style.background = el.status ? "lightgreen" : "pink";
    });
    checkbox.addEventListener("change", (event) => {
      doneTodo(el.id, event.target.checked);
    });
    clear.addEventListener("click", () => {
      clearTodo(el.id);
    });

    delBtn.disabled = el.status;
    edit.disabled = el.status;
  });
  renderInterfaceCount();
};

const renderInterfaceCount = () => {
  const countTodos = () => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.status).length;
    const processing = total - completed;
    return { total, completed, processing };
  };

  const counts = countTodos();
  todosCount.textContent = `Done: ${counts.completed}`;
  totalTodosCount.textContent = `All todos: ${counts.total}`;
  completedTodosCount.textContent = `Processing: ${counts.processing}`;

  updateClearAllButtonVisibility();
};

const editTodo = (id) => {
  const editedMessage = prompt("Edit title");
  todos = todos.map((el) => {
    if (el.id === id) {
      return { ...el, title: editedMessage };
    }
    return el;
  });
  renderTodos();
};

const deleteTodo = (id) => {
  todos = todos.filter((el) => el.id !== id);
  renderTodos();
};

const doneTodo = (id, checked) => {
  todos = todos.map((el) => {
    if (el.id === id) {
      el.status = checked || !el.status;
    }
    return el;
  });
  renderTodos();

  renderInterfaceCount();
};

const clearTodo = (id) => {
  todos = [];
  renderTodos();
};

const generateCountInterface = () => {
  const allLength = todos.length;
  const doneLength = todos.filter((el) => el.status).length;
  const undoneLength = todos.filter((el) => !el.status).length;
  const result = `<p>all: ${allLength}</p> <p>done: ${doneLength}</p> <p>undone: ${undoneLength}</p>`;
  document.querySelector(".countWrapper").innerHTML =
    allLength > 0 ? result : "";
};

const composeClearButton = () => {
  const clear = document.querySelector(".clear");
  clear.style.display = "none";
  clear.addEventListener("click", () => {
    // Select all elements except form, buttons, and script tags
    const elementsToClear = document.querySelectorAll(
      "body > :not(form):not(button):not(script)"
    );

    // Loop through the selected elements and remove them
    elementsToClear.forEach((element) => {
      element.remove();
    });
  });
};

const generateDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const generateNewTime = (time) => {
    return time < 10 ? "0" + time : time;
  };

  const [newMinutes, newSeconds, newDay, newMonth] = [
    minutes,
    seconds,
    day,
    month,
  ].map((el) => generateNewTime(el));

  const currentDate = `Current date: ${newDay} - ${newMonth} - ${year} ${hours}:${newMinutes}:${newSeconds}`;
  return currentDate;
};

clearBtn.addEventListener("click", () => {
  output.innerHTML = "";
  todos = [];
  todosCount.textContent = "Done: 0";
  totalTodosCount.textContent = "All todos: 0";
  completedTodosCount.textContent = "Processing: 0";
  clearAllBtn.style.display = "none";
});

renderTodos();
