import React, { useState } from "react";

import './Form.css';

function NewTaskForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [inputError, setInputError] = useState(null);

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (name.length === 0) {
            setInputError('A task name should be at least one character long')
            return;
        }

        setInputError(null);
        onSubmit(name);
        setName('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    Need to add more?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <p className="input__error">{inputError}</p>
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default NewTaskForm;