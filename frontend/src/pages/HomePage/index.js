import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useTask from "../../hooks/useTask";
import TaskItem from "../../components/TaskItem";

const HomePage = () => {
  const { addTask, tasks, getAllTasks, deleteTask } = useTask();
  const {
    user: { user },
  } = useAuth();
  const [values, setValues] = useState({ title: "", description: "" });

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    addTask({ ...values, user: user.id });
    setValues({ title: "", description: "" });
  };

  const deleteTaskHandler = (taskId) => {
    deleteTask(taskId);
  };

  console.log("user", user);
  return (
    <div className="card-body">
      <h5 className="card text-white bg-dark mb-3">Add Your Task</h5>
      <span className="card-text">
        <form onSubmit={addTaskHandler}>
          <input
            name="title"
            type="text"
            value={values.title}
            className="mb-2 form-control titleIn"
            onChange={handleInputChange}
            placeholder="Task Title"
            required
          />
          <input
            name="description"
            type="text"
            value={values.description}
            className="mb-2 form-control titleIn"
            onChange={handleInputChange}
            placeholder="Task Description"
            required
          />

          <button
            className="btn btn-outline-primary mx-2 mb-3"
            style={{ borderRadius: "50px", "font-weight": "bold" }}
            type="submit"
          >
            Add Task
          </button>
        </form>
      </span>
      <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
      <div>
        <ul>
          {tasks.map((task) => (
            <TaskItem task={task} deleteTaskHandler={deleteTaskHandler} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default HomePage;
