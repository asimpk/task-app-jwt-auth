import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";

import * as taskApi from "../api/taskApi";

const TaskContext = createContext(null);

export { TaskContext };

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getAllTasks = () => {
    taskApi
      .getAllTasks()
      .then((response) => {
        setTasks([...response]);
        console.log("response", response);
      })
      .catch((newError) => console.log(newError));
  };
  const addTask = ({ title, description, user }) => {
    taskApi
      .addTask(title, description, user)
      .then((response) => {
        setTasks([...tasks, response]);
        console.log("response", response);
      })
      .catch((newError) => console.log(newError));
  };

  const deleteTask = (taskId) => {
    taskApi
      .deleteTask(taskId)
      .then((response) => {
        setTasks([...response]);
        console.log("response", response);
      })
      .catch((newError) => console.log(newError));
  };

  const memoedValue = useMemo(
    () => ({
      tasks,
      getAllTasks,
      addTask,
      deleteTask,
    }),
    [tasks]
  );

  return (
    <TaskContext.Provider value={memoedValue}>{children}</TaskContext.Provider>
  );
};

export default function useAuth() {
  return useContext(TaskContext);
}
