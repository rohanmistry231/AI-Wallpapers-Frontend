import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext"; // Assuming ThemeContext is in `context` folder

const Category = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Fetch categories and their thumbnails on component mount
  useEffect(() => {
    const fetchCategoriesAndThumbnails = async () => {
      try {
        const categoriesResponse = await axios.get("https://ai-wallpapers-backend.vercel.app/images/categories");
        const categories = categoriesResponse.data.categories;
        setCategories(categories);

        // Fetch a sample image for each category
        const imagePromises = categories.map((category) =>
          axios.get(`https://ai-wallpapers-backend.vercel.app/images/category/${category}?limit=1`)
        );

        const imageResponses = await Promise.all(imagePromises);
        const imagesMap = {};
        categories.forEach((category, index) => {
          const categoryImage = imageResponses[index]?.data?.data?.[0]?.imageUrl || null;
          imagesMap[category] = categoryImage;
        });
        setCategoryImages(imagesMap);
      } catch (error) {
        console.error("Error fetching categories or thumbnails:", error);
      }
    };

    fetchCategoriesAndThumbnails();
  }, []);

  // Fetch images when a category is selected
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    try {
      const response = await axios.get(`https://ai-wallpapers-backend.vercel.app/images/category/${category}`);
      setImages(response.data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setImages([]);
  };

  // Open preview modal
  const openPreviewModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  // Close preview modal
  const closePreviewModal = () => {
    setModalImage(null);
  };

  return (
    <div
      className={`categories-container p-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Modal for Image Preview */}
      {modalImage && (
        <div className="modal fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div
            className={`modal-content relative p-4 rounded-lg shadow-lg max-w-screen-md w-full ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-1 px-3 rounded-full hover:bg-red-700"
              onClick={closePreviewModal}
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Preview"
              className="max-w-full max-h-screen rounded-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* Show Categories if no category is selected */}
      {!selectedCategory ? (
        <section className="categories-section">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Explore Categories
          </h2>
          <div className="categories-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className={`category-card p-4 rounded-lg shadow-md cursor-pointer transition-shadow ${
                  isDarkMode
                    ? "bg-gray-800 hover:shadow-gray-700"
                    : "bg-white hover:shadow-lg"
                }`}
                onClick={() => handleCategoryClick(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Category Thumbnail */}
                {categoryImages[category] ? (
                  <img
                    src={categoryImages[category]}
                    alt={`${category} thumbnail`}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                {/* Category Name */}
                <h3 className="text-lg font-semibold text-center">{category}</h3>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        // Show Images if a category is selected
        <section className="images-section mt-12">
          <button
            className="mb-6 p-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            onClick={handleBackToCategories}
          >
            Back to Categories
          </button>
          <h2 className="text-3xl font-bold mb-6 text-center">
            {selectedCategory} Images
          </h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : images.length > 0 ? (
            <div className="images-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`image-card p-2 rounded-lg shadow-md cursor-pointer transition-shadow ${
                    isDarkMode
                      ? "bg-gray-800 hover:shadow-gray-700"
                      : "bg-white hover:shadow-lg"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openPreviewModal(image.imageUrl)}
                >
                  <img
                    src={image.imageUrl}
                    alt={`Wallpaper ${index}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <a
                    href={image.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 p-2 text-sm text-center font-semibold block text-decoration-none rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Download
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center">No images found for this category.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Category;
