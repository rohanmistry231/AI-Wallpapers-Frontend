import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "./Home.css";

const Home = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [inView, setInView] = useState(false);
  const [wallpapersCount, setWallpapersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  // Slick Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  useEffect(() => {
    if (inView) {
      const animateCounters = () => {
        let wallpapersInterval = setInterval(() => {
          setWallpapersCount((prev) => {
            if (prev >= 3300) {
              clearInterval(wallpapersInterval);
              return 3300;
            }
            return prev + 50; // Increment by 50
          });
        }, 20); // Speed of animation

        let categoriesInterval = setInterval(() => {
          setCategoriesCount((prev) => {
            if (prev >= 80) {
              clearInterval(categoriesInterval);
              return 80;
            }
            return prev + 2; // Increment by 2
          });
        }, 50); // Speed of animation
      };

      animateCounters();
    }
  }, [inView]);

  return (
    <div
      className={`home-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
    >
      {/* Hero Section */}
      <motion.section
        className={`hero-section mt-12 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } pt-40 px-6 sm:px-12 text-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="hero-content">
          <motion.h1
            className={`hero-title text-5xl sm:text-6xl font-extrabold mb-6 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            AI Generated Wallpapers for Every Screen
          </motion.h1>
          <motion.p
            className={`hero-subtitle text-xl sm:text-2xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Discover a world of one-of-a-kind black-and-white AI-generated art,
            carefully crafted to make your screens look amazing.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Explore Wallpapers Button */}
            <motion.a
              href="/wallpapers"
              className={`explore-btn inline-block py-3 px-8 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 ${
                isDarkMode ? "hover:text-white" : "hover:text-black"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Explore Wallpapers
            </motion.a>

            {/* Explore Categories Button */}
            <motion.a
              href="/categories"
              className={`explore-btn inline-block py-3 px-8 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 ${
                isDarkMode ? "hover:text-white" : "hover:text-black"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Explore Categories
            </motion.a>

            {/* Get Personalized Wallpapers Button */}
            <motion.a
              href="/personalized"
              className={`explore-btn inline-block py-3 px-8 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 ${
                isDarkMode ? "hover:text-white" : "hover:text-black"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              Get Personalized Wallpaper
            </motion.a>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className={`features-section ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        } py-20 px-6 sm:px-12`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className={`text-4xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Why Choose AI Wallpapers?
          </motion.h2>
          <div className="features-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mt-8">
            {/* Feature 1 */}
            <div className="feature-item">
              <motion.h3
                className="text-2xl font-semibold mb-3"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                High-Quality Resolution
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                Every wallpaper is created in ultra-high resolution, perfect for
                any screen size, ensuring that every detail pops.
              </motion.p>
            </div>
            {/* Feature 2 */}
            <div className="feature-item">
              <motion.h3
                className="text-2xl font-semibold mb-3"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                Unique AI Art
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                Our cutting-edge AI technology generates unique and creative
                wallpaper designs that you won't find anywhere else.
              </motion.p>
            </div>
            {/* Feature 3 */}
            <div className="feature-item">
              <motion.h3
                className="text-2xl font-semibold mb-3"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.2 }}
              >
                Easy to Browse
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.4 }}
              >
                Our simple and clean interface makes it easy to find and
                download your favorite wallpapers in just a few clicks.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className={`statistics-section py-20 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        onViewportEnter={() => setInView(true)}
      >
        <div className="container mx-auto text-center">
          <h2
            className={`text-4xl font-bold mb-10 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Our Growing Collection
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Wallpapers Counter */}
            <div className="stat-item">
              <motion.div
                className={`stat-number text-5xl font-extrabold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {wallpapersCount}+
              </motion.div>
              <p
                className={`stat-label text-xl mt-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Wallpapers
              </p>
            </div>

            {/* Categories Counter */}
            <div className="stat-item">
              <motion.div
                className={`stat-number text-5xl font-extrabold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {categoriesCount}+
              </motion.div>
              <p
                className={`stat-label text-xl mt-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Categories
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    
      {/* Personalized Wallpapers Section */}
      <motion.section
        className={`personalized-wallpapers-section ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        } py-20 px-6 sm:px-12`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className={`text-4xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Get Your Personalized Wallpaper
          </motion.h2>

          <motion.p
            className={`text-lg mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Enter your name, email, and describe the wallpaper you want, and
            we’ll generate a unique, AI-designed wallpaper just for you.
          </motion.p>

          <div className="form-container grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side: Name and Email */}
            <div className="input-section space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full py-3 px-6 border-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-900 text-white border-gray-600"
                      : "bg-white text-black border-gray-400"
                  }`}
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full py-3 px-6 border-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-900 text-white border-gray-600"
                      : "bg-white text-black border-gray-400"
                  }`}
                  placeholder="Enter your email"
                />
              </motion.div>
            </div>

            {/* Right Side: Wallpaper Details */}
            <div className="input-section space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <label
                  htmlFor="wallpaper-details"
                  className="block text-lg font-semibold mb-2"
                >
                  Wallpaper Details
                </label>
                <textarea
                  id="wallpaper-details"
                  rows="4"
                  className={`w-full py-7 px-6 border-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-900 text-white border-gray-600"
                      : "bg-white text-black border-gray-400"
                  }`}
                  placeholder="Describe your ideal wallpaper"
                ></textarea>
              </motion.div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.a
            href="/personalized"
            className={`explore-btn inline-block py-3 px-8 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 mt-8 ${
              isDarkMode ? "hover:text-white" : "hover:text-black"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Get Personalized Wallpaper
          </motion.a>
        </div>
      </motion.section>

      {/* Gallery Section with Slider */}
      <motion.section
        className={`gallery-section ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } py-20 px-6 sm:px-12`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className={`text-4xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            Featured Wallpapers
          </motion.h2>

          {/* Slider Component */}
          <Slider {...sliderSettings} className="mt-8">
            {/* Replace with your dynamic wallpaper images */}
            <div className="slider-item">
              <img
                src="path_to_image1.jpg"
                alt="Wallpaper 1"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="slider-item">
              <img
                src="path_to_image2.jpg"
                alt="Wallpaper 2"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="slider-item">
              <img
                src="path_to_image3.jpg"
                alt="Wallpaper 3"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="slider-item">
              <img
                src="path_to_image4.jpg"
                alt="Wallpaper 4"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </Slider>
        </div>
      </motion.section>

      {/* Free for Everyone Section */}
      <motion.section
        className={`free-section ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        } py-20 px-6 sm:px-12`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className={`text-4xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            Free for Everyone
          </motion.h2>
          <motion.p
            className={`text-xl sm:text-2xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.4 }}
          >
            All of our wallpapers are available completely free of charge. No
            subscriptions, no hidden fees—just amazing AI-generated art ready
            for you to download.
          </motion.p>
          <motion.a
            href="/gallery"
            className={`explore-btn inline-block py-3 px-8 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 ${
              isDarkMode ? "hover:text-white" : "hover:text-black"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.6 }}
          >
            Start Exploring
          </motion.a>
        </div>
      </motion.section>

      {/* Join the Community Section */}
      <motion.section
        className={`join-section ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } py-20 px-6 sm:px-12`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className={`text-4xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4 }}
          >
            Join the Community
          </motion.h2>
          <motion.p
            className={`text-xl sm:text-2xl mb-8 ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.2 }}
          >
            Stay up to date with new AI-generated wallpapers and other exciting
            updates. Join our community to be the first to know when new designs
            are released.
          </motion.p>
          <motion.a
            href="/signup"
            className={`explore-btn inline-block py-3 px-8 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 ${
              isDarkMode ? "hover:text-white" : "hover:text-black"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.4 }}
          >
            Sign Up Now
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
