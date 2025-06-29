import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const RegisterHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, {
        username,
        email,
        password,
      });
      console.log("Register response:", response.data);
      if (response.data.message) {
        toast.success("Registerd successfully");
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error) {
      console.log("error registering", error);
      toast.error("Couldnt register", error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="w-full max-w-md p-8 space-y-6 border rounded-lg shadow-sm"
          onSubmit={RegisterHandler}
        >
          <h1 className="text-2xl font-medium text-center text-green-600">
            Register
          </h1>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="w-full p-2 border-b focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full p-2 border-b focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full p-2 border-b focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none"
            >
              Register
            </button>

            <div className="text-sm">
              <span className="text-gray-600">Already a user? </span>
              <Link to="/login" className="text-green-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
