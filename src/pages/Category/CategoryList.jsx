import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div
      className={`categories-container p-4 mt-14 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Loading Animation */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-t-4 ${
              isDarkMode
                ? "border-white border-opacity-75"
                : "border-black border-opacity-75"
            }`}
          ></div>
        </div>
      ) : (
        <section className="categories-section">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Explore Categories
          </h2>
          <div className="categories-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className={`category-card p-3 rounded-lg shadow-md cursor-pointer transition-shadow ${
                  isDarkMode
                    ? "bg-gray-800 hover:shadow-gray-700"
                    : "bg-white hover:shadow-lg"
                }`}
                onClick={() => navigate(`/category/${category}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {categoryImages[category] ? (
                  <img
                    src={categoryImages[category]}
                    alt={`${category} thumbnail`}
                    className="w-full h-28 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="w-full h-28 bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="text-sm font-medium text-center">{category}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoriesList;
