import React from 'react';
import style from '../css/TodoListItem.module.css';
import PropTypes from 'prop-types';


function TodoListItem({ id, title, onRemoveTodo }) {
    console.log(title);
    return (
        <li className={style.ListItem}>
            {title}
            <button onClick={() => onRemoveTodo(id)}>Remove</button>
        </li>
    )
}

TodoListItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    onRemoveTodo: PropTypes.func
}


export default TodoListItem; 