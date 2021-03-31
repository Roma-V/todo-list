import './App.css';
import Form from './components/Form.js';
import FilterButton from './components/FilterButton.js';
import Todo from './components/Todo.js';

function App(props) {
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form />
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
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {
          props.tasks.map(task => (
            <Todo 
              key={task.id}
              id={task.id} 
              name={task.name} 
              completed={task.completed} 
            />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
