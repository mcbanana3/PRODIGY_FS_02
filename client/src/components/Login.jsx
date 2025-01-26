import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../services/authService";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // For username or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username: identifier, password }
      );
      login(response.data.token);
      localStorage.setItem("username", identifier); // Set username in localStorage
      navigate("/employees");
    } catch (error) {
      console.error("Invalid credentials", error);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            Username or Email
          </label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="input input-bordered w-full mt-1 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Enter your username or email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full mt-1 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-500 transition duration-300 ease-in-out hover:text-indigo-600 focus:outline-none"
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md shadow-md hover:from-pink-600 hover:to-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={navigateToRegister}
              className="text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
