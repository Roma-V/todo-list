import React, { useState } from "react";
import { nanoid } from "nanoid";

import './App.css';
import Form from './components/Form.js';
import FilterButton from './components/FilterButton.js';
import Todo from './components/Todo.js';

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { 
      id: "todo-" + nanoid(), 
      name, 
      completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => 
      id === task.id
        ? {...task, completed: !task.completed}
        : task
    );
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  
  return (
    <div className="todoapp stack-large">
      <h1>Manage your tasks</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">
        {tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'} remaining
        <br></br>
        {tasks.filter(task => !task.completed).length} incomplete
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {
          tasks.map(task => (
            <Todo 
              key={task.id}
              id={task.id} 
              name={task.name} 
              completed={task.completed}
              onComplete={toggleTaskCompleted}
              onDelete={deleteTask}
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
