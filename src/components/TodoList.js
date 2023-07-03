import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types'




function TodoList({ todoList, onRemoveTodo }) {
    console.log("todoList", todoList);
    //console.log(todoList[0]["fields"]["Title"]);
    //console.log(todoList[1]["fields"]["Title"]);
    //console.log(todoList[2]["fields"]["Title"]);
    return (
        <ul>
            {todoList.map((item) => {
                return (
                    <TodoListItem
                        onRemoveTodo={onRemoveTodo}
                        key={item.id}
                        id={item.id}
                        title={item["fields"]["Title"]} 
                        //title="temporary"
                
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