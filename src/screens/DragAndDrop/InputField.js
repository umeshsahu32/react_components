import React, { useRef } from "react";
import styles from "./DragAndDrop.module.css";

const InputField = ({ task, setTask, handleAdd }) => {
  const inputRef = useRef();

  //? JSX START
  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Enter a Task"
        value={task}
        ref={inputRef}
        onChange={(e) => setTask(e.target.value)}
        className={styles.input__box}
        onKeyDown={(e) => {
          console.log(e.key);
          if (e.key === "Enter") {
            handleAdd(e);
            inputRef.current?.blur();
          }
        }}
      />
      <button
        onClick={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
        className={styles.input_submit}
      >
        GO
      </button>
    </div>
  );
};

export default InputField;
