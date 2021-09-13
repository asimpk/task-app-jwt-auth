import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SignUpPage = () => {
  const { signUp } = useAuth();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

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

  const signUpHandler = async () => {
    e.preventDefault();
    signUp(values);
    setValues({ username: "", email: "", password: "" });
  };

  return (
    <div className="card-body">
      <h5 className="card text-white bg-dark mb-3">Sign Up</h5>
      <span className="card-text">
        <form onSubmit={signUpHandler}>
          <input
            name="username"
            type="text"
            value={values.username}
            className="mb-2 form-control titleIn"
            onChange={handleInputChange}
            placeholder="User Name"
          />
          <input
            name="email"
            type="email"
            value={values.email}
            className="mb-2 form-control titleIn"
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={values.password}
            className="mb-2 form-control desIn"
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <button
            className="btn btn-outline-primary mx-2 mb-3"
            style={{ borderRadius: "10px", "font-weight": "bold" }}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </span>
      <div className="card-tex">
        Already have Account <Link to="/login">Login here...</Link>
      </div>
    </div>
  );
};
export default SignUpPage;
