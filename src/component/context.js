import React, { useState, useContext, useRef } from "react";

const getTodos = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [todos, setTodos] = useState(getTodos());
  const [alert, setAlert] = useState({ show: false, msg: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [location, setLocation] = useState({});
  const refContainer = useRef(null);

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    showAlert(true, "Todo Removed.");
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    showAlert(true, "Todo State Changed.");
  };

  const editTodo = (id) => {
    const { name } = todos.find((todo) => todo.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(name);
    inputRef.current.focus();
  };

  const showAlert = (show, msg) => {
    setAlert({ show, msg });
  };

  const showColors = (e, id) => {
    const { top, right } = e.target.getBoundingClientRect();
    setLocation({ top, right, id });
    setIsColorsOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        removeTodo,
        toggleDone,
        refContainer,
        alert,
        showAlert,
        isEditing,
        setIsEditing,
        editId,
        setEditId,
        editTodo,
        name,
        setName,
        getTodos,
        filter,
        setFilter,
        inputRef,
        location,
        setLocation,
        isColorsOpen,
        setIsColorsOpen,
        showColors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
