import React from "react";

function ViewTodo({
    id,
    name,
    completed,
    onComplete,
    onDelete,
    toggleEditMode,
    editButtonRef
}) {
    return (
        <div className="inline-small">
            <div className="c-cb short">
                <input
                    id={id}
                    type="checkbox"
                    defaultChecked={completed}
                    onChange={() => onComplete(id)}
                />
                <label className="todo-label" htmlFor={id}>
                    {name}
                </label>
            </div>
            <div className="btn-group short">
                <button 
                    type="button" 
                    className="btn"
                    onClick={toggleEditMode}
                    ref={editButtonRef}
                >
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
        </div>
    );
}

export default ViewTodo;