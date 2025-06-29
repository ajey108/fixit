/* eslint-disable */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log("user in navbar", user);

  //logout
  const handleLogout = () => {
    logout();
    navigate("/");

    toast.success("Logged out successfully");
  };
  return (
    <div className="navbar bg-neutral rounded-sm px-4">
      {/* Mobile menu button */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>

        {/* Logo/Brand */}
        <Link to="/" className="text-xl font-medium">
          FixiT
        </Link>
      </div>

      {/* Desktop navigation */}
      <div className="navbar-center hidden lg:flex">
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/?filter=hot")}
            className="hover:text-green-500 transition-colors"
          >
            Hot issues
          </button>
          <Link to="/status" className="hover:text-green-500 transition-colors">
            Check status
          </Link>
          <Link
            to="/issue"
            className="text-green-500 hover:text-green-600 font-medium"
          >
            Add Issue
          </Link>
        </div>
      </div>

      {/* User section */}
      <div className="navbar-end space-x-4">
        {user ? (
          <>
            <img
              className="rounded-full w-10 h-10 border border-gray-400"
              src={user.profile}
              alt="User"
            />
            <button
              onClick={handleLogout}
              className="hover:text-green-500 transition-colors"
            >
              <AiOutlineLogout />
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-green-500 transition-colors">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
