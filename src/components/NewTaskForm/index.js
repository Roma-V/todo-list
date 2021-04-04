import React, { useState } from "react";

import './Form.css';

function NewTaskForm({ onSubmit }) {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState('');
    const [inputError, setInputError] = useState(null);

    function conditionallyAddClass(mainClass, contition, additionalCladd) {
        return contition ? mainClass + " " + additionalCladd : mainClass;
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!isActive) {
            setIsActive(true);
            return;
        }

        if (name.length === 0) {
            setInputError('A task name should be at least one character long')
            return;
        }

        setInputError(null);
        onSubmit(name);
        setName('');
        setIsActive(false);
    }

    function handleCancel() {
        setIsActive(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    Need to add more?
                </label>
            </h2> */}
            <label 
                htmlFor="new-todo-input" 
                className={conditionallyAddClass("label__lg short", isActive, "invisible")}
            >
                Need to add more?
            </label>
            <div className={conditionallyAddClass("input-group", !isActive, "invisible")}>
                <input
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="text"
                    placeholder="New task"
                    autoComplete="off"
                    value={name}
                    onChange={handleChange}
                />
                <p className="input__error">{inputError}</p>
            </div>
            <div className={conditionallyAddClass("btn-group", !isActive, "flex-short")}>
                {
                    isActive &&
                    <button 
                        type="button" 
                        className="btn todo-cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    <span className="visually-hidden">creating new task</span>
                    </button>
                }
                <button type="submit" className="btn btn__primary btn__lg">
                    Add
                </button>
            </div>
        </form>
    );
}

export default NewTaskForm;