import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types'




function TodoList({ todoList, onRemoveTodo }) {
    return (

        <ul>
            {todoList.map((item) => {
                console.log(item);
                return (
                    <TodoListItem
                        onRemoveTodo={onRemoveTodo}
                        key={item.id}
                        id={item.id}
                        title={item.title}
                    />

                );
            })}
        </ul>
    );
}
export default TodoList;

TodoList.propType = {
    todoList: PropTypes.func,
    onRemoveTodo: PropTypes.func
};