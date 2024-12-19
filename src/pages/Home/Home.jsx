import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion"; // Import Framer Motion
import './Home.css';

const Home = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className={`home-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Hero Section */}
      <motion.section
        className={`hero-section ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="hero-content">
          <motion.h1
            className={`hero-title ${isDarkMode ? "text-white" : "text-black"}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            AI Generated Wallpapers
          </motion.h1>
          <motion.p
            className={`hero-subtitle ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            Experience the timeless beauty of AI-generated art, reimagined in stunning black-and-white wallpapers that add elegance and sophistication to your screen.
          </motion.p>
          <motion.a
            href="#explore"
            className={`explore-btn ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          >
            Explore Wallpapers
          </motion.a>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className={`about-section ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
      >
        <div className="about-content">
          <motion.h2 className={isDarkMode ? "text-white" : "text-black"}>About Us</motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          >
            Welcome to our platform, where art meets technology! Our AI-driven algorithms create one-of-a-kind black-and-white wallpapers that cater to every style. Whether you're looking for classic vintage designs or modern minimalist aesthetics, we offer a wide variety of high-resolution wallpapers updated regularly.
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className={`features-section ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
      >
        <div className="feature">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
          >
            Vintage Aesthetic
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: "easeOut" }}
          >
            Our wallpapers are designed with a timeless black-and-white vintage feel, perfect for creating a sophisticated and nostalgic atmosphere.
          </motion.p>
        </div>
        <div className="feature">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2.6, ease: "easeOut" }}
          >
            AI-Powered Art
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
          >
            Our algorithms generate truly unique wallpapers based on cutting-edge AI technology, ensuring no two designs are alike.
          </motion.p>
        </div>
        <div className="feature">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 3, ease: "easeOut" }}
          >
            High Quality
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2, ease: "easeOut" }}
          >
            Each wallpaper is rendered in high resolution, perfect for both desktop and mobile devices, guaranteeing a crisp, vibrant display even in black-and-white.
          </motion.p>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className={`cta-section ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3, ease: "easeOut" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.4, ease: "easeOut" }}
        >
          Ready to give your screen a makeover with vintage-inspired AI art? Explore our collection of black-and-white AI-generated wallpapers and discover something unique!
        </motion.p>
        <motion.a
          href="#explore"
          className={`explore-btn ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6, ease: "easeOut" }}
        >
          Explore Wallpapers
        </motion.a>
      </motion.section>
    </div>
  );
};

export default Home;
