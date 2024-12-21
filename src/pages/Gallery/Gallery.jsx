import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust the path if necessary

const Gallery = () => {
  // Theme logic
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Generate an array of image URLs from 01 to 1680.
  const generateImageUrls = () => {
    const baseUrl = "https://ai-wallpapers.s3.eu-north-1.amazonaws.com/";
    const imageUrls = [];
    for (let i = 1; i <= 1680; i++) {
      const imageName = i.toString().padStart(2, "0") + ".png";
      imageUrls.push(`${baseUrl}${imageName}`);
    }
    return imageUrls;
  };

  const imageUrls = generateImageUrls();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  const imagesPerPage = 20;

  const [loading, setLoading] = useState(false);

  // Calculate the images to display on the current page
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imageUrls.slice(indexOfFirstImage, indexOfLastImage);

  // Calculate total pages
  const totalPages = Math.ceil(imageUrls.length / imagesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        localStorage.setItem("currentPage", newPage);
        return newPage;
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        localStorage.setItem("currentPage", newPage);
        return newPage;
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulates a loading time of 1 second for demonstration

    return () => {
      clearTimeout(timer);
      localStorage.setItem("currentPage", 1);
    };
  }, [currentPage, theme]);

  return (
    <div
      className={`min-h-screen py-8 px-6 mt-12 ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Wallpaper Gallery</h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="loader border-4 border-t-4 border-gray-300 h-10 w-10 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentImages.map((url, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-4 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img
                  src={url}
                  alt={`AI Wallpaper ${index + 1}`}
                  className="w-full h-auto max-w-xs max-h-48 rounded-lg mb-4 object-cover"
                />
              </a>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = url.split("/").pop();
                  link.click();
                }}
                className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1 ? "bg-gray-400 text-gray-200" : isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-blue-500 text-white hover:bg-blue-400"}`}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-medium ${currentPage === totalPages ? "bg-gray-400 text-gray-200" : isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-blue-500 text-white hover:bg-blue-400"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gallery;
