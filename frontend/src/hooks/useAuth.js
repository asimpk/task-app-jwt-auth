import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import * as authApi from "../api/auth";
import setAuthToken from "../utils/setAuthToken";

const AuthContext = createContext(null);

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const signUp = ({username, email, password}) => {
    authApi
      .signUp(username, email, password)
      .then((response) => {
        console.log(response) 
        history.push("/login");
      })
      .catch((newError) => setError(newError))
      .finally(() => setLoading(false));
  };

  const login = ({email, password}) => {
    setLoading(true);
    authApi
      .login(email, password)
      .then((response) => {
        const { token } = response;
        console.log('token', token)
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        setUser(decoded);
        history.push("/");
      })
      .catch((newError) => setError(newError))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    setUser(null);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      setError,
      setUser,
      login,
      signUp,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
