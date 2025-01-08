import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const correctPassword = "12345";
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [formData, setFormData] = useState({
    imageName: "",
    imageUrl: "",
    downloadUrl: "",
    category: "",
  });

  const [imageList, setImageList] = useState([]); // Array to hold multiple images
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch access state from localStorage on component mount
  useEffect(() => {
    const storedAccess = localStorage.getItem("accessGranted");
    if (storedAccess === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    // Add current form data to the image list
    setImageList((prev) => [...prev, formData]);
    setFormData({
      imageName: "",
      imageUrl: "",
      downloadUrl: "",
      category: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    // Retrieve password from localStorage
    const storedPassword = localStorage.getItem("password");

    // Check if the stored password matches the correct password
    if (storedPassword === correctPassword) {
      try {
        const dataToSend = imageList.length > 0 ? imageList : [formData];
        const response = await axios.post(
          "https://ai-wallpapers-backend.vercel.app/images",
          dataToSend
        );

        if (response.status === 201) {
          setMessage("Image(s) added successfully!");
          setFormData({
            imageName: "",
            imageUrl: "",
            downloadUrl: "",
            category: "",
          });
          setImageList([]);
          const storedPassword = localStorage.getItem("password");
          if (storedPassword === correctPassword) {
            setIsAuthorized(true);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError(
          "Failed to add image(s). Please check the inputs and try again."
        );
      }
    } else {
      alert(
        "⚠️ Access Denied: You lack authorization to perform this action. ⚠️"
      );
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthorized(true);
      localStorage.setItem("password", password);
      toast.success("Access granted!");
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  return (
    <div
      className={`max-h-screen flex items-center justify-center p-0 mt-16 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {!isAuthorized ? (
        <form
          onSubmit={handlePasswordSubmit}
          className={`p-6 rounded shadow-md ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <label
            htmlFor="password"
            className="block mb-4 text-lg font-semibold"
          >
            🔒 Prove You're Worthy! Enter the Secret Code:
          </label>
          <input
            type="password"
            id="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border-2 p-3 rounded w-full text-lg focus:outline-none focus:ring-2 ${
              isDarkMode
                ? "bg-black text-white border-gray-700 focus:ring-gray-500"
                : "bg-white text-black border-gray-300 focus:ring-gray-500"
            }`}
            placeholder="Enter secret code"
            required
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full mt-4 p-3 text-lg font-semibold rounded transition-all ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-800 hover:text-white"
                : "bg-black text-white hover:bg-gray-200 hover:text-black"
            }`}
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <motion.div
            className="w-full max-w-lg bg-opacity-90 rounded-lg p-6 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Add New Image(s)
            </h2>

            {error && (
              <div
                className={`p-2 rounded mb-4 border ${
                  isDarkMode
                    ? "bg-red-900 text-red-300 border-red-500"
                    : "bg-red-100 text-red-700 border-red-400"
                }`}
              >
                {error}
              </div>
            )}
            {message && (
              <div
                className={`p-2 rounded mb-4 border ${
                  isDarkMode
                    ? "bg-green-900 text-green-300 border-green-500"
                    : "bg-green-100 text-green-700 border-green-400"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="imageName"
                  className="block text-sm font-medium"
                >
                  Image Name
                </label>
                <input
                  type="text"
                  name="imageName"
                  id="imageName"
                  value={formData.imageName}
                  onChange={handleChange}
                  className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                      : "bg-white text-black border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter image name"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="imageUrl" className="block text-sm font-medium">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                      : "bg-white text-black border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter image URL"
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="downloadUrl"
                  className="block text-sm font-medium"
                >
                  Download URL
                </label>
                <input
                  type="url"
                  name="downloadUrl"
                  id="downloadUrl"
                  value={formData.downloadUrl}
                  onChange={handleChange}
                  className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                      : "bg-white text-black border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter download URL"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                      : "bg-white text-black border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter category (e.g., Nature, Abstract)"
                  required
                />
              </div>

              <motion.button
                type="button"
                onClick={handleAddImage}
                className={`w-full py-3 px-8 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-600 transition-all duration-300 ${
                  isDarkMode
                    ? "hover:text-white border"
                    : "hover:text-black border"
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Add to List
              </motion.button>

              <motion.button
                type="submit"
                className={`w-full py-3 px-8 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-all duration-300 ${
                  isDarkMode
                    ? "hover:text-white border"
                    : "hover:text-black border"
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Submit
              </motion.button>
            </form>

            {imageList.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold">Image List:</h3>
                <ul className="list-disc pl-5">
                  {imageList.map((image, index) => (
                    <li key={index} className="mt-1">
                      {image.imageName} - {image.category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Upload;
