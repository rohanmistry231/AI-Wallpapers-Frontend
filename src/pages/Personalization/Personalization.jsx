import React, { useState } from "react";
import { motion } from "framer-motion";
import { send } from "emailjs-com";
import { useTheme } from "../../context/ThemeContext";

const Personalization = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wallpaperDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await send(
        "service_a67x7y8",
        "template_8hy5yxt",
        formData,
        "rHzYtPzuq3jMFUP4W"
      );
      setSuccessMessage("Your request has been sent successfully!");
      setFormData({ name: "", email: "", wallpaperDetails: "" });
    } catch (error) {
      console.error("Failed to send email:", error);
      setSuccessMessage("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <motion.section
      id="personalized"
      className={`py-20 pb-10 px-6 sm:px-12 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <motion.h2
          className="text-4xl font-bold tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Get Your Personalized Wallpaper
        </motion.h2>

        <motion.p
          className={`text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Share your ideas, and we'll create a custom AI-designed wallpaper
          tailored just for you.
        </motion.p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Left Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full py-3 px-6 border rounded-lg shadow-sm ${
                  isDarkMode
                    ? "bg-gray-900 text-white border-gray-700"
                    : "bg-gray-100 text-black border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your name"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <label htmlFor="email" className="block text-lg font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full py-3 px-6 border rounded-lg shadow-sm ${
                  isDarkMode
                    ? "bg-gray-900 text-white border-gray-700"
                    : "bg-gray-100 text-black border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
                required
              />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <label
                htmlFor="wallpaperDetails"
                className="block text-lg font-medium mb-2"
              >
                Wallpaper Details
              </label>
              <textarea
                id="wallpaperDetails"
                name="wallpaperDetails"
                value={formData.wallpaperDetails}
                onChange={handleChange}
                rows="4"
                className={`w-full py-3 px-6 border rounded-lg shadow-sm ${
                  isDarkMode
                    ? "bg-gray-900 text-white border-gray-700"
                    : "bg-gray-100 text-black border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Describe your ideal wallpaper"
                required
              ></textarea>
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            className="col-span-1 md:col-span-2 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button
              type="submit"
              className={`border py-3 px-8 bg-black text-white rounded-md shadow-md transition-all duration-300 ${
                isDarkMode
                  ? "hover:text-white border hover:bg-gray-800"
                  : "hover:text-black border hover:bg-gray-400"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Get Personalized Wallpaper"}
            </button>
          </motion.div>
        </form>

        {/* Success Message */}
        {successMessage && (
          <motion.p
            className={`mt-6 text-lg ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {successMessage}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
};

export default Personalization;
