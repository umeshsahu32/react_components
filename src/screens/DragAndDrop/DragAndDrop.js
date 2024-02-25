import React, { Fragment, useState } from "react";
import styles from "./DragAndDrop.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import InputField from "./InputField";
import TodoList from "./TodoList";

const DragAndDrop = () => {
  const [task, setTask] = useState("");
  const [allTask, setAllTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  //? HANDLE ADD TASK
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(task);
    if (task) {
      setAllTask([...allTask, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };

  //? ON DRAG TASK
  const onDragEnd = (result) => {
    console.log("result", result);

    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = allTask;
    let complete = completedTask;
    // Source Logic
    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TaskList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTask(complete);
    setAllTask(active);
  };

  //? JSX START
  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.app}>
          <span className={styles.heading}>Task Manger</span>
          <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
          <TodoList
            allTask={allTask}
            setAllTask={setAllTask}
            completedTask={completedTask}
            setCompletedTask={setCompletedTask}
          />
        </div>
      </DragDropContext>
    </Fragment>
  );
};

export default DragAndDrop;
