import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "./context";
import Todo from "./Todo";

const List = () => {
  const { todos, filter } = useGlobalContext();

  let filtred = [...todos];

  switch (filter) {
    case "all":
      filtred = [...todos];
      break;
    case "completed":
      filtred = todos.filter((todo) => todo.completed);
      break;
    case "uncompleted":
      filtred = todos.filter((todo) => !todo.completed);
      break;
    default:
      filtred = [...todos];
      break;
  }

  return (
    <Droppable droppableId='droppable-1'>
      {(provided, snapshot) => (
        <ul
          className='tasks-wrapper'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filtred.map((todo, i) => (
            <Todo key={todo.id} {...todo} index={i} />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default List;
