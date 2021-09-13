import axios from "axios";

export const getAllTasks = async () => {
  try {
    let res = await axios({
      method: "get",
      url: "http://127.0.0.1:5000/api/task",
      headers: { "Content-Type": "application/json" },
    });

    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
};

export const addTask = async (title = "", description = "", user = "") => {
  const body = {
    title,
    description,
    user,
    isCompleted: false,
  };

  try {
    let res = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/api/task",
      data: body,
      headers: { "Content-Type": "application/json" },
    });

    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
};

export const deleteTask = async (taskId = "") => {
  try {
    let res = await axios({
      method: "delete",
      url: `http://127.0.0.1:5000/api/task/${taskId}`,
      headers: { "Content-Type": "application/json" },
    });

    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
};
