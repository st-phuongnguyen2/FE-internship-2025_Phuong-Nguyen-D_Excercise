// create element DOM
const addBtn = document.getElementById('add-btn');
console.log("addBtn", addBtn);
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// add new todo to list
addBtn.addEventListener("click", () => {
  const todoText = todoInput.value.trim();

  if (todoText !== "") {
    const li = document.createElement("li");

    //create label for todo
    const label = document.createElement("label");
    label.textContent = todoText;
    label.addEventListener("click", () => {
      li.classList.toggle("done");
    });

    // create delete for todo
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => {
      todoList.removeChild(li);
    });

    // add label and deletebtn to li
    li.appendChild(label);
    li.appendChild(deleteBtn);

    // add li to todolist
    todoList.appendChild(li);

    //clear input after add todo
    todoInput.value = "";
  }
});

//user enter when add todolist
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});
