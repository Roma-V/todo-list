import React, { useRef, useEffect } from "react";

import usePrevious from '../../hooks/usePrevious.js';

import Todo from './Todo.js';

function TodoList({ 
    tasks, 
    filterFunction, 
    onTaskComplete, 
    onTaskDelete, 
    onTaskEdit
}) {
    const listHeadingRef = useRef(null);

    const prevTaskLength = usePrevious(tasks.length);
    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <React.Fragment>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {tasks.length} {tasks.length !== 1 ? 'tasks' : 'task'} remaining,&nbsp;
                {tasks.filter(task => !task.completed).length} incomplete
            </h2>
            <ul
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
            {
                tasks
                    .filter(filterFunction)
                    .map(task => (
                        <Todo
                            key={task.id}
                            id={task.id}
                            name={task.name}
                            completed={task.completed}
                            onComplete={onTaskComplete}
                            onDelete={onTaskDelete}
                            onEdit={onTaskEdit}
                        />
                    ))
            }
            </ul>
        </React.Fragment>
    );
}

export default TodoList;
