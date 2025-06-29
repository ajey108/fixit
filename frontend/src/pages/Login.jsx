import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  //loginHandle
  const LoginHandler = async (e) => {
    e.preventDefault();
    console.log("LoginHandler called");
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });
      console.log("response from login", response);
      if (response.data.success) {
        console.log("response data", response.data);
        const { token, user } = response.data;
        console.log("token and user", token, user);
        login(token, user);
        toast.success("welcome back " + user.username);
        navigate("/");
      }
    } catch (error) {
      console.log("error registering", error);
      toast.error("Login Failed", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center  min-h-screen">
        <form
          className="w-full max-w-md border-2 border-gray-200   p-10 rounded-lg shadow-lg text-center mb-3"
          onSubmit={LoginHandler}
        >
          <div>
            <h1 className="text-center text-green-600 mb-4">LOG IN</h1>
            <label className="input validator mb-10">
              <svg
                className="h-[1em] opacity-30"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email"
                title="Only letters, numbers or dash"
              />
            </label>

            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="password"
                title="Only letters, numbers or dash"
              />
            </label>
            <p className="validator-hint">
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>
            <div className="flex items-center justify-around ">
              <button className="inline-block  cursor-pointer rounded-md bg-green-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                Login
              </button>
              <h6 className="text-sm">Create an account?</h6>

              <Link to="/register">
                <h4 className=" text-sm cursor-pointer rounded-md  px-1 py-1 text-center  font-semibold uppercase text-green-600  ">
                  Register
                </h4>
              </Link>
              <Link to="/admin">
                <h4 className=" text-sm cursor-pointer rounded-md  px-1 py-1 text-center   font-semibold uppercase text-green-600  ">
                  Admin
                </h4>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
