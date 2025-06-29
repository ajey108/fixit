import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Submit handler function
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });
      console.log("Login response from admin:", response);

      if (response.data.success) {
        console.log("admin response", response.data);
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-gray shadow-lg rounded-xl p-6 w-96 border">
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>
        <form onSubmit={submitHandler} className="space-y-4  ">
          <div>
            <label className="block  text-sm font-medium mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
