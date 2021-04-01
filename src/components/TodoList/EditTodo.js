import React, { useState } from "react";

import '../NewTaskForm/Form.css'

function EditTodo({
    id,
    name,
    toggleEditMode,
    onEdit,
    editFieldRef
}) {
    const [newName, setNewName] = useState('');
    const [inputError, setInputError] = useState(null);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!newName || newName === name) {
            setInputError('A task name should be at least one character long')
            return;
        }

        onEdit(id, newName);
        setNewName("");
        toggleEditMode();
    }

    return (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={id}>
                    New name for {name}
                </label>
                <input
                    id={id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
                <p className="input__error">{inputError}</p>
            </div>
            <div className="btn-group">
                <button 
                    type="button" 
                    className="btn todo-cancel"
                    onClick={toggleEditMode}
                >
                    Cancel
              <span className="visually-hidden">renaming {name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
              <span className="visually-hidden">new name for {name}</span>
                </button>
            </div>
        </form>
    );
}

export default EditTodo;