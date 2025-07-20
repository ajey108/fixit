import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { AuthProvider } from "../src/context/AuthContext";
import Issue from "./pages/Issue";
import PrivateRoute from "./components/PrivateRoutes";
import IssueStatus from "./pages/IssueStatus";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./components/Dashboard";
import Newsletter from "./components/Newsletter";
const App = () => {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/issue"
              element={
                <PrivateRoute>
                  <Issue />
                </PrivateRoute>
              }
            />

            <Route
              path="/status"
              element={
                <PrivateRoute>
                  <IssueStatus />
                </PrivateRoute>
              }
            />

            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <Newsletter />
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
