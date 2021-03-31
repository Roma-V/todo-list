import React from "react";

function Todo({ 
    id, 
    name, 
    completed, 
    onComplete, 
    onDelete 
}) {
    return (
        <li className="todo stack-small">
            <div className="c-cb">
                <input 
                    id={id} type="checkbox" 
                    defaultChecked={completed} 
                    onChange={() => onComplete(id)}
                />
                <label className="todo-label" htmlFor="todo-0">
                    {name}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn">
                    Edit <span className="visually-hidden">{name}</span>
                </button>
                <button 
                    type="button" 
                    className="btn btn__danger"
                    onClick={() => onDelete(id)}
                >
                    Delete <span className="visually-hidden">{name}</span>
                </button>
            </div>
        </li>
    );
}

export default Todo;