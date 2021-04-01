import React, { useState } from "react";
import { nanoid } from "nanoid";

import './App.css';
import NewTaskForm from './components/NewTaskForm';
import Filter from './components/Filter';
import TodoList from './components/TodoList';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

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
            ? { ...task, completed: !task.completed }
            : task
    );
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
      const editedTaskList = tasks.map(task =>
          id === task.id
              ? { ...task, name: newName }
              : task
      );
      setTasks(editedTaskList);
  }

  function deleteTask(id) {
      const remainingTasks = tasks.filter(task => id !== task.id);
      setTasks(remainingTasks);
  }
  
  return (
    <div className="todoapp stack-large">
      <h1>Manage your tasks</h1>
      <NewTaskForm onSubmit={addTask} />
      <Filter
        filterNames={FILTER_NAMES} 
        currentFilter={filter}
        setFilter={setFilter}
      />
      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        filterFunction={FILTER_MAP[filter]}
        onTaskComplete={toggleTaskCompleted}
        onTaskDelete={deleteTask}
        onTaskEdit={editTask}
      />
    </div>
  );
}

export default App;
