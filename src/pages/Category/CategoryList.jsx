import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoriesList = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Dummy data for upcoming categories
  const upcomingCategories = [
    { name: "AI Landscapes", description: "Beautiful AI-generated landscapes." },
    { name: "Fantasy Worlds", description: "Dive into fantastical realms." },
    { name: "Cyberpunk Cities", description: "Explore futuristic cityscapes." },
    { name: "Minimalist Art", description: "Sleek, modern, and minimalist." },
  ];

  useEffect(() => {
    const fetchCategoriesAndThumbnails = async () => {
      try {
        const cachedCategories = localStorage.getItem("categories");
        const cachedCategoryImages = localStorage.getItem("categoryImages");

        if (cachedCategories && cachedCategoryImages) {
          setCategories(JSON.parse(cachedCategories));
          setCategoryImages(JSON.parse(cachedCategoryImages));
          setLoading(false);
          return;
        }

        const categoriesResponse = await axios.get(
          "https://ai-wallpapers-backend.vercel.app/images/categories"
        );
        let categories = categoriesResponse.data.categories;

        categories = categories.sort((a, b) => a.localeCompare(b));
        setCategories(categories);

        const imagePromises = categories.map((category) =>
          axios.get(
            `https://ai-wallpapers-backend.vercel.app/images/category/${category}?limit=1`
          )
        );

        const imageResponses = await Promise.all(imagePromises);
        const imagesMap = {};
        categories.forEach((category, index) => {
          const categoryImage =
            imageResponses[index]?.data?.data?.[0]?.imageUrl || null;
          imagesMap[category] = categoryImage;
        });
        setCategoryImages(imagesMap);

        localStorage.setItem("categories", JSON.stringify(categories));
        localStorage.setItem("categoryImages", JSON.stringify(imagesMap));
      } catch (error) {
        console.error("Error fetching categories or thumbnails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndThumbnails();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className={`categories-container p-4 mt-6 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-t-4 ${
              isDarkMode
                ? "border-gray-200 border-opacity-75"
                : "border-gray-800 border-opacity-75"
            }`}
          ></div>
        </div>
      ) : (
        <section className="categories-section py-10">

          {/* Upcoming Categories Section */}
          <div className="upcoming-categories-section mb-4">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Upcoming Categories
            </h3>
            <Slider {...sliderSettings}>
              {upcomingCategories.map((category, index) => (
                <div
                  key={index}
                  className="slider-item p-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                  style={{
                    background: isDarkMode
                      ? "linear-gradient(to bottom, #111, #222)"
                      : "linear-gradient(to bottom, #eee, #fff)",
                    }}
                >
                  <h4 className="text-xl font-bold mb-2 text-center">
                    {category.name}
                  </h4>
                  <p className="text-sm text-center">{category.description}</p>
                </div>
              ))}
            </Slider>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">
            Explore Categories
          </h2>

          {/* Categories Grid */}
          <div className="categories-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="category-card relative overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
                onClick={() => navigate(`/category/${category}`)}
              >
                {/* Image Section */}
                <div className="relative w-full h-48">
                  {categoryImages[category] ? (
                    <img
                      src={categoryImages[category]}
                      alt={`${category} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  {/* Black & White Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black ${
                      isDarkMode ? "opacity-80" : "opacity-60"
                    }`}
                  ></div>
                  {/* Category Name */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <span className="text-white font-bold text-lg tracking-wide px-3 py-1 shadow-md">
                      {category}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoriesList;
