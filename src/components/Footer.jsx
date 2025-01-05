import React from "react";
import { useTheme } from "../context/ThemeContext"; // Adjust the path if necessary
import { Link } from "react-router-dom"; // Using Link for routing consistency

const Footer = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark"; // Check if dark mode is active

  return (
    <footer
      className={`${
        isDarkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      } pb-8 shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h2
              className={`text-2xl font-semibold mt-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Wallpapers<span className="text-blue-500">.AI</span>
            </h2>
            <p
              className={`mt-2 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Discover and download beautiful, high-quality wallpapers curated just for you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Quick Links
            </h3>
            <Link
              to="/categories"
              className={`hover:text-blue-500 transition duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Categories
            </Link>
            <Link
              to="/gallery"
              className={`hover:text-blue-500 transition duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-500 transition duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`hover:text-blue-500 transition duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-blue-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`border-t mt-6 pt-4 text-center text-xs ${
            isDarkMode ? "border-gray-700 text-gray-500" : "border-gray-300 text-gray-500"
          }`}
        >
          &copy; {new Date().getFullYear()} Wallpapers<span className="text-blue-500">.AI</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
