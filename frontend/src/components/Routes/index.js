import React, { Suspense, lazy, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";
import useAuth from "../../hooks/useAuth";
import setAuthToken from "../../utils/setAuthToken";

const AsyncRoute = ({ importPath, ...props }) => {
  return <Route {...props} component={lazy(importPath)} />;
};

function AuthenticatedRoute(props) {
  const { user } = useAuth();
  if (!user) return <Redirect to="/login" />;
  return <AsyncRoute {...props} />;
}

const Routes = () => {
  const { user, setUser, logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (!user && localStorage.jwtToken && localStorage.jwtToken !== "undefined") {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      setUser(decoded.user);
      history.push("/");
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
        <Redirect to="/login" />;
      }
    }
  }, [user]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <AuthenticatedRoute
          exact
          path="/"
          importPath={() => import("../../pages/HomePage")}
        />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/sign_up" component={SignUpPage} />
      </Switch>
    </Suspense>
  );
};
export default Routes;
