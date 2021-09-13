import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import useAuth from "../../hooks/useAuth";
const Layout = ({ children }) => {
  const { user, setUser, logout } = useAuth();

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      setUser(decoded);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div
      className="App list-group-item  justify-content-center align-items-center mx-auto"
      style={{ width: "500px", backgroundColor: "white", marginTop: "15px" }}
    >
      <div
        className="bg-primary mb-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="text-white bg-primary ">Task Manager</h1>
        {user && (
          <span
            className="card text-white bg-warning"
            style={{ marginLeft: "20%", cursor: "pointer", padding: "0 4px" }}
            onClick={logout}
          >
            Logout
          </span>
        )}
      </div>
      <h4 className="card text-white bg-primary mb-3">
        React - Express - MongoDB
      </h4>

      <div className="card-body">{children}</div>
      <h6 className="card text-dark bg-warning py-1 mb-0">
        Copyright 2021, All rights reserved &copy;
      </h6>
    </div>
  );
};
export default Layout;
