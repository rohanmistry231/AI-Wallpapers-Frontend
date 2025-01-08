import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import emailjs from "emailjs-com"; // Import EmailJS

const Contributor = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [formData, setFormData] = useState({
    contributorName: "",
    email: "",
    driveLink: "",
    category: "",
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
      // Using EmailJS to send the form data
      const response = await emailjs.send(
        "service_q7yp1ne", // Replace with your EmailJS service ID
        "template_00wjjev", // Replace with your EmailJS template ID
        formData,
        "YPYGQJanJ9f_o4YcE" // Replace with your EmailJS user ID
      );

      if (response.status === 200) {
        // On success, show a success message or redirect
        alert("Thank you for your contribution!");
        navigate("/"); // Redirect after successful submission
      } else {
        setError("Error sending contribution. Please try again.");
      }
    } catch (error) {
      console.error("Error during contribution submission:", error);
      setError("Error sending contribution. Please try again.");
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
        <h2 className="text-2xl font-semibold text-center mb-6">
          Be The Contributor
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label
              htmlFor="contributorName"
              className="block text-sm font-medium"
            >
              Contributor Name
            </label>
            <input
              type="text"
              name="contributorName"
              id="contributorName"
              value={formData.contributorName}
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
            <label htmlFor="driveLink" className="block text-sm font-medium">
              Drive Link of Wallpapers
            </label>
            <input
              type="url"
              name="driveLink"
              id="driveLink"
              value={formData.driveLink}
              onChange={handleChange}
              className={`w-full p-3 mt-2 rounded-lg border-2 focus:ring-2 focus:outline-none ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
                  : "bg-white text-black border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter Google Drive link"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="category" className="block text-sm font-medium">
              Category of Wallpapers
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
              placeholder="Enter category (e.g., Nature, Tech)"
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
            {loading ? "Submitting..." : "Submit Contribution"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contributor;
