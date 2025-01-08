import React, { useEffect, useState } from "react";
import axios from "axios";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Wallpapers = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [shareStatus, setShareStatus] = useState(false);
  const [wallpapersLoading, setWallpapersLoading] = useState(true);
  const itemsPerPage = 32;

  const loadingMessages = [
    "Almost there...",
    "Cooking up wallpapers...",
    "Ready to deliver!",
    "Just a moment more...",
    "Hang tight, magic's happening!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (loading || wallpapersLoading) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) =>
          prevIndex === loadingMessages.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Change message every 2 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [loading, wallpapersLoading, loadingMessages.length]);

  const openPreviewModal = (imageUrl) => {
    if (isAuthenticated()) {
      setModalImage(imageUrl);
    } else {
      setPreviewImage(null);
      setShowSignUpModal(true);
    }
  };

  const closePreviewModal = () => {
    setPreviewImage(null);
    setModalImage(null);
    setShareStatus(false);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(modalImage);
    setShareStatus(true);
    setTimeout(() => setShareStatus(false), 2000);
  };

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

  useEffect(() => {
    setWallpapersLoading(true);
    const timeout = setTimeout(() => {
      setWallpapersLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentPage]);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleDownload = (downloadUrl) => {
    if (isAuthenticated()) {
      window.location.href = downloadUrl;
    } else {
      setShowSignUpModal(true);
    }
  };

  const currentImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) return <div className="text-center mt-20">{error}</div>;

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold text-center mb-6 mt-20">Wallpapers</h1>
      {loading || wallpapersLoading ? (
        <div
          className={`flex flex-col justify-center items-center min-h-screen ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <AnimatePresence>
            <motion.div
              key={loadingMessages[currentMessageIndex]}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold"
            >
              {loadingMessages[currentMessageIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <>
          <div className="px-4 columns-2 sm:columns-2 md:columns-3 lg:columns-6 gap-4">
            {currentImages.map((image) => (
              <div
                key={image._id}
                className="relative mb-4 break-inside-avoid shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => openPreviewModal(image.imageUrl)}
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
                    className="bg-transparent text-white px-2 py-1 rounded-md hover:bg-opacity-70 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-center items-center mt-6 space-x-4 mb-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md transition-all ${
            currentPage === 1
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Previous
        </button>

        <input
          type="number"
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          min="1"
          max={totalPages}
          className={`w-16 text-center rounded-md border-2 ${
            isDarkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-200 text-black border-gray-400"
          }`}
        />
        <span
          className={`text-lg font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md transition-all ${
            currentPage === totalPages
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>

      {previewImage && (
        <div className="modal fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div
            className={`modal-content relative p-4 rounded-lg shadow-lg max-w-screen-md w-full ${
              isDarkMode ? "bg-transparent" : "bg-transparent"
            }`}
          >
            <img
              src={previewImage.imageUrl}
              alt={previewImage.imageName}
              className="max-w-full max-h-screen rounded-lg object-contain"
            />
            <div className="flex justify-center mt-4 space-x-6">
              <button
                onClick={handleShareClick}
                className="bg-transparent text-white p-3 rounded-full flex items-center justify-center"
                title="Share"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 9l4-4m0 0l-4-4m4 4H3M7 12l-4 4m0 0l4 4m-4-4h14"
                  />
                </svg>
                {shareStatus && (
                  <span className="ml-2 text-sm">Link copied!</span>
                )}
              </button>
              <button
                onClick={() => handleDownload(previewImage.downloadUrl)}
                className="bg-transparent text-white p-3 rounded-full flex items-center justify-center"
                title="Download"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
              <button
                onClick={closePreviewModal}
                className="bg-transparent text-white p-3 rounded-full flex items-center justify-center"
                title="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {showSignUpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm mb-0">
          <div
            className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-0 text-center">
              Please Sign Up First
            </h2>
            <SignUp
              customMargin={false}
              closeModal={() => {
                setShowSignUpModal(false);
                setShowSignInModal(true);
              }}
            />
            <button
              onClick={() => setShowSignUpModal(false)}
              className={`mt-6 w-full px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSignInModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
          <div
            className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
            <SignIn closeModal={() => setShowSignInModal(false)} />
            <button
              onClick={() => setShowSignInModal(false)}
              className={`mt-6 w-full px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
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
