import React, { useState } from "react";

import { conditionallyAddClass } from '../../utils/styles.js'

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
            setInputError('A task name should be at least one character long');
            editFieldRef.current.focus();
            return;
        }

        onEdit(id, newName);
        setNewName("");
        toggleEditMode();
    }

    return (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="input-group">
                <label className="todo-label" htmlFor={id}>
                    New name for {name}
                </label>
                <input
                    id={id}
                    className={conditionallyAddClass("input input__sm", inputError, "input__error")}
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
                <p className="input__error-message">{inputError}</p>
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