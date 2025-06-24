import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const SignUp = ({ customMargin = true }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [formData, setFormData] = useState({
    name: "",
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
    setError(""); // Clear any previous errors
    setLoading(true);

    // Password validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://ai-wallpapers-backend.vercel.app/users/register",
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
        // Redirect to SignIn page after successful signup
        navigate("/signin");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-h-screen flex items-center justify-center p-0 ${
        customMargin ? "mt-16" : ""
      } ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <motion.div
        className="w-full max-w-sm bg-opacity-90 rounded-lg p-6 shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-white text-black border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your name"
              required
            />
          </div>

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
              Generate Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none mb-2 ${
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
            className={`w-full inline-block py-3 px-8 bg-black text-white rounded-md shadow-md transition-all duration-300 ${
              isDarkMode
                ? "hover:text-white border hover:bg-gray-800"
                : "hover:text-black border hover:bg-gray-400"
            }`}
            disabled={loading}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-md">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
