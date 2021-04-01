import React, { useRef, useState, useEffect } from "react";

import usePrevious from '../../hooks/usePrevious.js';

import EditTodo from './EditTodo.js';
import ViewTodo from './ViewTodo.js';


import './Todo.css'

function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const wasEditing = usePrevious(isEditing);

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    useEffect(() => {
        if (!wasEditing && isEditing) {
          editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
          editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);
    
    function toggleEditMode() {
        setEditing(!isEditing);
    }

    return (
        <li className="todo">
            {
                isEditing 
                    ? <EditTodo 
                        {...props}
                        toggleEditMode={toggleEditMode}
                        editFieldRef={editFieldRef}
                    /> 
                    : <ViewTodo 
                        {...props}
                        toggleEditMode={toggleEditMode}
                        editButtonRef={editButtonRef}
                    />
            }
        </li>);
}


export default Todo;