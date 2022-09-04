import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";

const Colors = () => {
  const { location, setIsColorsOpen, todos, setTodos } = useGlobalContext();
  const colorsRef = useRef(null);

  useEffect(() => {
    const { top, right } = location;
    colorsRef.current.style.left = `${right + 30}px`;
    colorsRef.current.style.top = `${top - 20}px`;
  }, [location]);

  const changeColor = (e) => {
    const color = e.target.style.backgroundColor;
    const { id } = location;
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, color: color } : todo;
      })
    );
    setIsColorsOpen(false);
  };

  return (
    <div ref={colorsRef} className='color-container'>
      <span style={{ backgroundColor: "#eb1313" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#e91e63" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#673ab7" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#009688" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#4caf50" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#00bcd4" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#ff5722" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#607d8b" }} onClick={changeColor}></span>
      <span style={{ backgroundColor: "#795548" }} onClick={changeColor}></span>
    </div>
  );
};

export default Colors;
