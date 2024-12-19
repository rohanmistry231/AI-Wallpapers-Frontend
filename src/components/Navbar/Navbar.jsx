import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Use useLocation hook to track current path

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isDarkMode = theme === "dark";

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "text-gray-400 border-b-2 border-gray-400" // Active link style
      : `${
          isDarkMode ? "text-gray-300" : "text-gray-800"
        } hover:text-gray-500`; // Default link style
  };

  return (
    <nav
      className={`${
        isDarkMode ? "bg-black text-gray-200" : "bg-white text-gray-900"
      } shadow-md fixed w-full top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } text-3xl font-bold`}
            >
              Wallpapers.ai
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className={`transition duration-150 ${getLinkClass("/")}`}>
              Home
            </Link>
            <Link
              to="/categories"
              className={`transition duration-150 ${getLinkClass("/categories")}`}
            >
              Categories
            </Link>
            <Link
              to="/gallery"
              className={`transition duration-150 ${getLinkClass("/gallery")}`}
            >
              Gallery
            </Link>
            <Link
              to="/profile"
              className={`transition duration-150 ${getLinkClass("/profile")}`}
            >
              Profile
            </Link>
            <button
              onClick={toggleTheme}
              className={`px-3 py-1.5 rounded-lg shadow-md border focus:outline-none transition duration-300 
                ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className={`mr-2 px-2 py-1 rounded-lg shadow-md border focus:outline-none transition duration-300 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={toggleMenu}
              className={`${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isDarkMode ? "bg-black text-gray-200" : "bg-white text-gray-900"
        } shadow-lg space-y-4 px-6 pt-4 pb-6 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } fixed top-14 right-0 h-screen w-64 overflow-y-auto z-40`}
      >
        {["/", "/categories", "/gallery", "/profile"].map((path) => (
          <Link
            key={path}
            to={path}
            className={`block ${
              location.pathname === path
                ? "text-gray-400"
                : getLinkClass(path)
            } text-lg py-2`}
            onClick={toggleMenu}
          >
            {path === "/"
              ? "Home"
              : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
