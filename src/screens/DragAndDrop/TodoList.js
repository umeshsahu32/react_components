import React from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import styles from "./DragAndDrop.module.css";

const TodoList = ({ allTask, setAllTask, completedTask, setCompletedTask }) => {
  //? JSX START
  return (
    <div className={styles.container}>
      <Droppable droppableId="TaskList">
        {(provided, snapshot) => (
          <div
            className={`${styles.allTask} ${
              snapshot.isDraggingOver ? styles.drag_active : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className={styles.task__heading}>Active Tasks</span>
            {allTask?.map((task, index) => (
              <SingleTodo
                index={index}
                allTask={allTask}
                task={task}
                key={task.id}
                setAllTask={setAllTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TaskRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.allTask}  ${
              snapshot.isDraggingOver ? styles.drag_complete : styles.remove
            }`}
          >
            <span className={styles.task__heading}>Completed Tasks</span>
            {completedTask?.map((task, index) => (
              <SingleTodo
                index={index}
                allTask={completedTask}
                task={task}
                key={task.id}
                setAllTask={setCompletedTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
