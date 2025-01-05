import React, { useEffect, useState } from "react";
import axios from "axios";
import SignUp from "../../components/SignUp";
import { useTheme } from "../../context/ThemeContext";
import { FaDownload } from "react-icons/fa";

const Wallpapers = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const itemsPerPage = 32;

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://ai-wallpapers-backend.vercel.app/images"
      );
      setImages(response.data.data);
    } catch (err) {
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDownload = (downloadUrl) => {
    if (isAuthenticated()) {
      window.location.href = downloadUrl;
    } else {
      setShowSignUpModal(true);
    }
  };

  const copyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const currentImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20">{error}</div>;

  return (
    <div
      className={`min-h-screen mt-20 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold text-center mb-6">Wallpapers</h1>
      <div className="px-4 columns-2 sm:columns-2 md:columns-3 lg:columns-6 gap-4">
        {currentImages.map((image) => (
          <div
            key={image._id}
            className="relative mb-4 break-inside-avoid shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={image.imageUrl}
              alt={image.imageName}
              className={`w-full h-auto object-cover rounded-lg ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
              onClick={() => setPreviewImage(image)}
            />
            <div className="absolute top-2 right-2 flex space-x-2">
            <button
      onClick={() => handleDownload(image.downloadUrl)}
      className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-md hover:bg-opacity-70 transition-all"
    >
      <FaDownload className="text-xl" /> {/* Adjust size if needed */}
    </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>

      {previewImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <img
              src={previewImage.imageUrl}
              alt={previewImage.imageName}
              className="w-full h-auto rounded-md mb-4"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => setPreviewImage(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
              <button
                onClick={() => copyLink(previewImage.imageUrl)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Copy Link
              </button>
              <button
                onClick={() => handleDownload(previewImage.downloadUrl)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {showSignUpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Please Sign Up First
            </h2>
            <SignUp closeModal={() => setShowSignUpModal(false)} />
            <button
              onClick={() => setShowSignUpModal(false)}
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallpapers;
