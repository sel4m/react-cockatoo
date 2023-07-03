import React from 'react';
import style from '../css/TodoListItem.module.css';
import PropTypes from 'prop-types';


function TodoListItem({ id, title, onRemoveTodo }) {  
    return (
        <li className={style.ListItem} key={id}>  {/* delete key here? and id two lines up next to TodoListItem function? */}
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