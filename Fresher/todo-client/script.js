const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

const API_URL = 'http://localhost:3000/tasks'

let tasks = [];

document.addEventListener('DOMContentLoaded', function () {
  fetchTasks();
})

const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }
    tasks = await response.json();
  }
  catch (error){
    console.log('Error fetching tasks:', error);
  }
  finally {
    renderTasks();
  }
}

const addTask = async(task)=>{
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: task,
        completed: false
      })
    });
    
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }
  }
  catch(error){
    console.log('Error adding task:', error);
  }
  finally {
    await fetchTasks();
  }
}

const renderTasks = () => {
  list.innerHTML = ''; // Clear the list before rendering
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.task;

    if(task.completed){
      li.classList.add('completed');
    }
    // Toggle complete
    li.addEventListener('click', function () {
      li.classList.toggle('completed');
      task.completed = !task.completed; // Update the task's completed status
      updateTask(task._id, task.task, task.completed); // Update the task in the backend
    });

      // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // prevent toggling completion
      list.removeChild(li);
      tasks = tasks.filter(t => t._id !== task._id); // Remove from local tasks array
      fetch(`${API_URL}/${task._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
  })
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') return;

  console.log(taskText);



  // Save to backend and re-render
  addTask(taskText);

  // Clear input
  input.value = '';
});

const updateTask = async(id, taskText, completed)=>{
  try {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task: taskText,
          completed: completed
        })
    });
    const updatedTask = await response.json();
    const index = tasks.findIndex(t => t._id === id);
    if(index !== -1){
      tasks[index] = updatedTask;
    }
    renderTasks();
  }
  catch(error){
    console.log('Error updating task:', error);
  }
}




