// Define all ui element variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearTasksButton = document.querySelector('.clear-tasks');


// Load all eventListeners
loadEventListeners();

function loadEventListeners() {
  // present currnet tasks in list
  window.addEventListener('load', showCurrentTasks);
  
  // add task to localStorage
  form.addEventListener('submit', addToLocalStorage);
  
  // add task to list
  form.addEventListener('submit', addTask);

  // delete task form localStorage
  taskList.addEventListener('click', removeFromLocalStorage);
  
  // delete task from List
  taskList.addEventListener('click', deleteTask);

  // delete all tasks from list
  clearTasksButton.addEventListener('click', clearAllFromList);
  
  // delete all tasks from localStorage
  clearTasksButton.addEventListener('click', clearAll);
}

function showCurrentTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks === null) {
    tasks = [];
  } else {
    tasks.forEach(function (task) {
      // create and append li to ul
      taskList.appendChild(createTaskElement(task));
    });
  }
}

function createTaskElement(task) {
  // Create an li element
  const li = document.createElement('li');

  // add delete button
  const deleteButton = document.createElement('a');

  // make href empty
  deleteButton.setAttribute('href','#');

  // set class on delete button
  deleteButton.className = 'delete-item secondary-content';
    
  // add icon to delete button
  deleteButton.innerHTML= '<i class="fa fa-remove"></i>';

  // append text to li
  li.appendChild(document.createTextNode(task));

  // append delete button to li
  li.appendChild(deleteButton);

  // assign classs to li
  li.className = 'collection-item';

  return li;
}

function addTask(e) {
  if (taskInput.value === '') {
    alert('Please enter a task');
  } else {
    // create and append li to ul
    taskList.appendChild(createTaskElement(taskInput.value));

    taskInput.value = '';
  }

  e.preventDefault();
}

function deleteTask(e) {
  if (e.target.classList.contains('fa-remove')) {
    e.target.parentElement.parentElement.remove();
  }

  e.preventDefault();
}

function addToLocalStorage(e) {
  const taskValue = taskInput.value;
  let tasks;
  tasks = JSON.parse(localStorage.getItem('tasks'));

  // remove all tasks fromm current localStorage
  localStorage.removeItem('tasks');
  
  // if it's the first task
  if (tasks === null) {
    tasks = [];
  }

  tasks.push(taskValue);

  // add to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage(e) {
  if (e.target.classList.contains('fa-remove')) {
    const taskToBeRemoved = e.target.parentElement.parentElement.childNodes[0];
  }

  // get all current tasks form localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  // delete current tasks form localStorage
  localStorage.removeItem('tasks');

  // find index and remove the task
  const taskIndex = tasks.indexOf(taskToBeRemoved);
  tasks.splice(taskIndex, 1);

  // upsert tasks on localstorage
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function clearAllFromList(e) {
  if (confirm('Are you sure you want to clear all tasks?')) {
    taskList.innerHTML = '';
  }

  alert('all tasks cleared');
}

function clearAll() {
  localStorage.removeItem('tasks');
}