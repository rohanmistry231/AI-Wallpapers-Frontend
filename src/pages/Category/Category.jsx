import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust the path if necessary

const Category = () => {
  const { theme } = useTheme(); // Access the theme from the context
  const isDarkMode = theme === "dark"; // Determine if dark mode is active

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://ai-wallpapers-backend.vercel.app/wallpapers/categories"); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className={`p-6 rounded-md shadow-md max-w-4xl mx-auto mt-20 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2
        className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-gray-300" : "text-gray-800"
        }`}
      >
        Categories
      </h2>
      {error && (
        <p
          className={`text-sm mb-4 ${
            isDarkMode ? "text-red-400" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className={`p-4 rounded-md text-center shadow-md cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              <h3 className="text-lg font-medium">{category}</h3>
            </div>
          ))
        ) : (
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
