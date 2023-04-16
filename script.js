document.getElementById('addTask').addEventListener('submit', function (event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
  
    if (taskValue.length > 0) {
      addTask(taskValue);
      taskInput.value = '';
      saveTasksToLocalStorage();
    }
  });
  
  function addTask(task) {
    const listItem = document.createElement('li');
    const taskText = document.createTextNode(task);
  
    const deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('削除'));
    deleteButton.addEventListener('click', function () {
      listItem.remove();
      saveTasksToLocalStorage();
    });
  
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    document.getElementById('tasks').appendChild(listItem);
  }
  
  function saveTasksToLocalStorage() {
    const tasksList = document.getElementById('tasks');
    const tasks = [];
  
    for (let i = 0; i < tasksList.children.length; i++) {
      tasks.push(tasksList.children[i].innerText.replace('削除', ''));
    }
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
  
    if (tasks) {
      tasks.forEach(function (task) {
        addTask(task);
      });
    }
  }
  
  loadTasksFromLocalStorage();
  