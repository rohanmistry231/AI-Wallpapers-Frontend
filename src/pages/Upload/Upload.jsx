import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust the path if necessary

const Upload = () => {
  const { theme } = useTheme(); // Access the theme from the context
  const isDarkMode = theme === "dark"; // Determine if dark mode is active

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    imageUrl: "",
    tags: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedTags = formData.tags.split(",").map((tag) => tag.trim());

    const payload = {
      title: formData.title,
      category: formData.category,
      imageUrl: formData.imageUrl,
      tags: processedTags,
    };

    try {
      const response = await fetch("https://ai-wallpapers-backend.vercel.app/wallpapers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to upload wallpaper");
      }

      setMessage("Wallpaper uploaded successfully!");
      setFormData({
        title: "",
        category: "",
        imageUrl: "",
        tags: "",
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className={`p-6 rounded-md shadow-md max-w-md mx-auto mt-20 mb-10 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2
        className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-gray-300" : "text-gray-800"
        }`}
      >
        Upload Wallpaper
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-2 mt-1 rounded-md ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border focus:outline-none`}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full p-2 mt-1 rounded-md ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border focus:outline-none`}
          />
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full p-2 mt-1 rounded-md ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border focus:outline-none`}
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className={`block text-sm font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={`w-full p-2 mt-1 rounded-md ${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-black border-gray-300"
            } border focus:outline-none`}
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 mt-4 font-medium rounded-md ${
            isDarkMode
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-700"
          }`}
        >
          Upload
        </button>
        {message && (
          <p
            className={`mt-4 text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Upload;
