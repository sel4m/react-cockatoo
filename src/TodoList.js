import React from 'react';
import TodoListItem from './TodoListItem';


function TodoList({ todoList, onRemoveTodo }) {
    return (
        <ul>
            {todoList.map((item) => {
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