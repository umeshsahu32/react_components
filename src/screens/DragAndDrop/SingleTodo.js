import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import styles from "./DragAndDrop.module.css";

const SingleTodo = ({ index, task, allTask, setAllTask }) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(task?.task);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  //? EDIT TASK HANDLER
  const handleEdit = (e, id) => {
    e.preventDefault();
    setAllTask(
      allTask.map((task) =>
        task.id === id ? { ...task, task: editTodo } : task
      )
    );
    setEdit(false);
  };

  //? TASK DELETE HANDLER
  const handleDelete = (id) => {
    setAllTask(allTask.filter((task) => task.id !== id));
  };

  //? TASK COMPLETE HANDLER
  const handleDone = (id) => {
    setAllTask(
      allTask.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  //? JSX START
  return (
    <Draggable draggableId={task?.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, task?.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`${styles.task__single} ${
            snapshot.isDragging ? styles.drag : ""
          }`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className={styles.task__single__text}
              ref={inputRef}
            />
          ) : task.isDone ? (
            <s className={styles.task__single__text}>{task.task}</s>
          ) : (
            <span className={styles.task__single__text}>{task.task}</span>
          )}
          <div>
            <span
              className={styles.icon}
              onClick={() => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className={styles.icon} onClick={() => handleDelete(task.id)}>
              <AiFillDelete />
            </span>
            <span className={styles.icon} onClick={() => handleDone(task.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
