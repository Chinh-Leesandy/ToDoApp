import React, { useEffect } from "react";
import {FaGithub} from 'react-icons/fa';
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import Alert from "./component/Alert";
import List from "./component/List"
import { useGlobalContext } from "./component/context";
import Colors from "./component/Colors";
import DarkModeToggle from "./component/DarkMode/DarkModeToggle";

const App = () => {
  const {
    inputRef,
    todos,
    setTodos,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
  } = useGlobalContext();

  const addTodo = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Invalid Todo Name!");
    } else if (name && isEditing) {
      setTodos(
        todos.map((todo) => {
          return todo.id === editId ? { ...todo, name: name } : todo;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      showAlert(true, "Todo Edited.");
    } else {
      const newTodo = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        color: "#009688",
      };
      setTodos([...todos, newTodo]);
      showAlert(true, "Todo Added.");
      setName("");
    }
  };

  const filterTodos = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTodos([]);
    showAlert(true, "Your list is clear!");
  };

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [inputRef, todos]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...todos];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTodos(reOrdered);
    }
  };

  const hideColorsContainer = (e) => {
    //   body.
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };

  return (
  <>
    <div className='container' onClick={hideColorsContainer}>
      {isColorsOpen && <Colors />}
      {alert && <Alert msg={alert.msg} />}
      <form className='head' onSubmit={addTodo}>
        <input
          type='text'
          ref={inputRef}
          placeholder='New Todo'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>{isEditing ? "Edit" : "Add"}</button>
      </form>
      <div className='filter'>
        <button
          data-filter='all'
          className={filter === "all" ? "active" : ""}
          onClick={filterTodos}
        >
          All
        </button>
        <button
          data-filter='completed'
          className={filter === "completed" ? "active" : ""}
          onClick={filterTodos}
        >
          Completed
        </button>
        <button
          data-filter='uncompleted'
          className={filter === "uncompleted" ? "active" : ""}
          onClick={filterTodos}
        >
          Uncompleted
        </button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {todos.length > 0 ? (
          <List />
        ) : (
          <p className='no-todos'>Your list is clear!</p>
        )}
      </DragDropContext>
      {todos.length > 2 && (
        <button
          className='btn-delete-all'
          onClick={deleteAll}
          title='Delete All Todos (Completed and Uncompleted)!'
        >
          Clear All
        </button>
      )}
	  <DarkModeToggle/>
	  
    </div>
	</>
  );
};

export default App;
