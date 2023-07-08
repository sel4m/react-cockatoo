import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './css/App.css';
import styles from "./css/TodoListItem.module.css"

const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };
    fetch(url, options)
      .then((response) => response.json())

      .then((result) => {
        const todos = result.records.map((todo) => {
          const newTodoAirtableFormat = {
            id: todo.id,
            title: todo.fields.Title,
          }
          return newTodoAirtableFormat
        });
        setTodoList(todos);
        setIsLoading(false);
      })
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = async (title) => {
    try {
      const airtableData = {
        fields: {
          Title: title,
        },
      };

      const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          },
          body: JSON.stringify(airtableData),
        }

      );

      if (!response.ok) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();
      console.log(dataResponse);
      const newTodoAirtableFormat = {
        id: dataResponse.id,
        title: dataResponse.fields.Title,
      };
      setTodoList([...todoList, newTodoAirtableFormat])
      console.log(todoList);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };



  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred:
                ${response.status}`;
        throw new Error(message);
      }
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              {isLoading ? (
                <div
                  className="loaderContainer">
                </div>
              ) : (
                <div className={styles.app}>

                  <div>
                    <h1 className={styles.heading}>Todo List</h1>
                    <AddTodoForm onAddTodo={addTodo} />
                  </div>
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                </div>
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={
            <h1>New Todo List</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

