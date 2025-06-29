import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  console.log("user in auth context", user);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    if (token) {
      console.log("token in auth context", token);
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData || null);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData || null));
  };

  const logout = () => {
    console.log("loged out");
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  //get all complaints

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/issue/allIssues`)
      .then((res) => {
        setIssues(res.data);
        console.log("issue from authcontext", res.data.issues);
      })
      .catch((err) => {
        err;
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, issues, setIssues }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
