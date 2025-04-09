// create element DOM
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todoData = loadCachedTodo();
renderTodoList();

function loadCachedTodo() {
  const todoDataString = localStorage.getItem("todoData");
  try {
    const todoData = JSON.parse(todoDataString);
    // If todoData is array, return it, else return an empty array by default
    if (Array.isArray(todoData)) return todoData;
    else return [];
  } catch (err) {
    return [];
  }
}

// Generate unique id
const generateId = function () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
};

function updateTodoData(nextTodoData) {
  todoData = nextTodoData;
  localStorage.setItem("todoData", JSON.stringify(todoData));
}

function renderTodoList() {
  todoList.innerHTML = "";
  todoData.forEach((todo) => {
    const todoContent = todo.content;
    const done = todo.done;
    const id = todo.id;

    const li = document.createElement("li");
    li.classList.add("list-item");
    //create label for todo
    const label = document.createElement("label");
    label.classList.add("item-label");
    label.textContent = todoContent;

    if (done) {
      label.classList.add("done-item");
    }

    label.addEventListener("click", () => {
      const nextTodoData = todoData.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        } else return todo;
      });
      updateTodoData(nextTodoData);
      renderTodoList();
    });

    // create delete for todo
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-primary");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", () => {
      const nextTodoData = todoData.filter((todo) => todo.id !== id);
      updateTodoData(nextTodoData);
      renderTodoList();
    });

    // add label and deletebtn to li
    li.appendChild(label);
    li.appendChild(deleteBtn);

    // add li to todolist
    todoList.appendChild(li);
    //clear input after add todo
    todoInput.value = "";
  });
}

function addTodo(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    // clone old todoData and push the new one to the end of the array
    const nextTodoData = [
      ...todoData,
      { id: generateId(), content: todoText, done: false },
    ];
    updateTodoData(nextTodoData);
    renderTodoList();
  }
}

// add new todo to list
addBtn.addEventListener("click", addTodo);

//user enter when add todolist
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodo(event);
  }
});
