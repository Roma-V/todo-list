import React, { useState, useRef, useEffect } from "react";

import usePrevious from '../../hooks/usePrevious.js'
import { conditionallyAddClass } from '../../utils/styles.js'

import './Form.css';

function NewTaskForm({ onSubmit }) {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState('');
    const [inputError, setInputError] = useState(null);

    const inputRef = useRef(null);
    const addButtonRef = useRef(null);
    const wasEditing = usePrevious(isActive);

    useEffect(() => {
        if (!wasEditing && isActive) {
            inputRef.current.focus();
        }
        if (wasEditing && !isActive) {
            addButtonRef.current.focus();
        }
    }, [wasEditing, isActive]);

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
            setInputError('A task name should be at least one character long');
            inputRef.current.focus();
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
        <form className="stack-small" onSubmit={handleSubmit}>
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
                    className={conditionallyAddClass("input input__lg", inputError, "input__error")}
                    name="text"
                    placeholder="New task"
                    autoComplete="off"
                    value={name}
                    ref={inputRef}
                    onChange={handleChange}
                />
                <p className="input__error-message">{inputError}</p>
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
                <button 
                    type="submit" 
                    className="btn btn__primary btn__lg"
                    ref={addButtonRef}
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export default NewTaskForm;