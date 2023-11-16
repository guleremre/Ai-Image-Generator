import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  updateTaskDescription,
  updateTaskTitle,
} from "../redux/actions/taskActions";

function AddTask() {
  const dispatch = useDispatch();
  const taskTitle = useSelector((state) => state.task.taskTitle);
  const taskDescription = useSelector((state) => state.task.taskDescription);

  const onAddTask = () => {
    const task = {
      title: taskTitle,
      description: taskDescription,
    };
    dispatch(addTask(task));
  };
  const onTaskTitleChange = (e) => dispatch(updateTaskTitle(e.target.value));
  const onTaskDescriptionChange = (e) =>
    dispatch(updateTaskDescription(e.target.value));
  return (
    <div style={styles.mainContainer}>
      <div style={styles.taskContainer}>
        <input
          type="text"
          placeholder="Task Title"
          onChange={onTaskTitleChange}
          value={taskTitle}
        />
        <input
          type="text"
          placeholder="Task Description"
          onChange={onTaskDescriptionChange}
          value={taskDescription}
        />
        <button onClick={onAddTask}>Add Task</button>
      </div>
    </div>
  );
}

export default AddTasks;
