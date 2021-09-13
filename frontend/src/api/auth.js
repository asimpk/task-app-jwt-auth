import axios from "axios";

export const login = async (email = "", password = "") => {
  const body = {
    email: email,
    password: password,
  };

  try {
    let res = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/api/auth/login",
      data: body,
      headers: { "Content-Type": "application/json" },
    });

    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
};

export const signUp = async (username = "", email = "", password = "") => {
  const body = {
    username,
    email,
    password,
  };

  try {
    let res = await axios({
      method: "post",
      url: "http://127.0.0.1:5000/api/auth/register",
      data: body,
      headers: { "Content-Type": "application/json" },
    });

    let data = res.data;
    return data;
  } catch (error) {
    return error.response;
  }
};

export const logout = async () => {};
