import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain both letters and numbers"
      );
      return;
    }
    setError("");
    setPasswordError("");
    try {
      const response = await axios.post(
        "https://prodigy-fs-02-z3wk.onrender.com/api/auth/register",
        {
          username,
          email,
          phone,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/employees");
    } catch (error) {
      setError("Error registering user");
      console.error("Error registering user", error);
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full mt-1 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mt-1 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full mt-1 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mt-1 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="show-password" className="text-sm text-gray-600">
              Show Password
            </label>
          </div>
          {passwordError && (
            <div className="mt-2 text-red-500 text-sm">{passwordError}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md shadow-md hover:from-pink-600 hover:to-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            cursor: "pointer",
          }}
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={navigateToLogin}
              className="text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
