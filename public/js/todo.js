const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form input');
const todoList = document.querySelector('#todo-list');

let toDos = [];

const TODOS_KEYS = 'toDos';

function saveTodos() {
  localStorage.setItem(TODOS_KEYS, JSON.stringify(toDos));
}

//delete todo in Html and localsorage
//and save the changed todos to localstorage

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todoObj) => todoObj.id !== parseInt(li.id));
  saveTodos();
}

//paint to do

function paintTodo(newTodoObj) {
  const li = document.createElement('li');
  li.id = newTodoObj.id;
  const span = document.createElement('span');
  span.innerText = newTodoObj.todo;
  const button = document.createElement('button');
  button.innerText = '❌';
  button.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

//save to do to localstorage

function submitTodoForm(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  const newTodoObj = {
    todo: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  saveTodos();
  paintTodo(newTodoObj);
}

todoForm.addEventListener('submit', submitTodoForm);

const loadsaveTodos = localStorage.getItem(TODOS_KEYS);

//if user have toDos, draw the todos in html
//save the todos in toDos Arry because the value of inital arry is null.

if (loadsaveTodos !== null) {
  const parseTodo = JSON.parse(loadsaveTodos);

  // parseTodo.forEach((element) => {
  //     paintTodo(element);
  //     toDos.push(element);
  // });

  toDos = parseTodo; // parseTodo.forEach(item => toDos.push(item));
  parseTodo.forEach(paintTodo);
}
