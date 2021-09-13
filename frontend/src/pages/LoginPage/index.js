import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const { login, error, setError } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (error) {
      setError();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    login(values);
    setValues({ email: "", password: "" });
  };

  return (
    <div className="card-body">
      <h5 className="card text-white bg-dark mb-3">Sign In</h5>
      <span className="card-text">
        <form onSubmit={loginHandler}>
          <div class="mb-3">
            <input
              name="email"
              type="email"
              value={values.email}
              className="mb-2 form-control titleIn"
              onChange={handleInputChange}
              placeholder="User Email"
              required
            />
          </div>
          <div class="mb-3">
            <input
              name="password"
              value={values.password}
              type="password"
              className="mb-2 form-control desIn"
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary mx-2 mb-3"
            style={{ borderRadius: "10px", "font-weight": "bold" }}
          >
            Submit
          </button>
        </form>
        {error && <p>Bad login/password</p>}
      </span>
      <div className="card-tex">
        Don't have Account <Link to="/sign_up">Sign Up here...</Link>
      </div>
    </div>
  );
};
export default LoginPage;
