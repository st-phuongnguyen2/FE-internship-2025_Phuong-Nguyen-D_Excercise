// create element DOM
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// add new todo to list
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const li = document.createElement('li');
    li.classList.add('list-item');
    //create label for todo
    const label = document.createElement('label');
    label.classList.add('item-label');
    label.textContent = todoText;
    label.addEventListener('click', () => {
      label.classList.toggle('done-item');
    });

    // create delete for todo
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-primary');
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', () => {
      todoList.removeChild(li);
    });

    // add label and deletebtn to li
    li.appendChild(label);
    li.appendChild(deleteBtn);

    // add li to todolist
    todoList.appendChild(li);

    //clear input after add todo
    todoInput.value = '';
    console.log('ABC');
  }
});

//user enter when add todolist
todoInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addBtn.click();
  }
});
