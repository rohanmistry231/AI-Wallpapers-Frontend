import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const SignIn = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://ai-wallpapers-backend.vercel.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // On success, store token and redirect to dashboard
        localStorage.setItem("token", data.token); // Store token in localStorage
        navigate("/"); // Redirect to the dashboard (or the page you want)
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("Error signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-h-screen flex items-center justify-center p-0 mt-16 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <motion.div
        className="w-full max-w-sm bg-opacity-90 rounded-lg p-6 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-white text-black border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-white text-black border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full py-3 px-8 bg-black text-white rounded-md shadow-md transition-all duration-300 ${
              isDarkMode
                ? "hover:text-white border hover:bg-gray-800"
                : "hover:text-black border hover:bg-gray-400"
            }`}
            disabled={loading}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-md">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
