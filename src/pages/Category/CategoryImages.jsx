import React, { useState, useEffect } from "react";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import { useTheme } from "../../context/ThemeContext";
import { useParams, useNavigate } from "react-router-dom";

const CategoryImages = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  const [shareStatus, setShareStatus] = useState(false);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://ai-wallpapers-backend.vercel.app/images/category/${categoryName}`
        );
        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [categoryName, theme]);

  const openPreviewModal = (imageUrl) => {
    if (isAuthenticated()) {
      setModalImage(imageUrl);
    } else {
      setShowSignUpModal(true);
    }
  };

  const closePreviewModal = () => {
    setModalImage(null);
    setShareStatus(false);
  };

  const handleImageLoad = (index) => {
    setImageLoadStatus((prevStatus) => ({ ...prevStatus, [index]: true }));
  };

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(modalImage);
    setShareStatus(true);
    setTimeout(() => setShareStatus(false), 2000);
  };

  const handleDownloadClick = (url, event) => {
    if (isAuthenticated()) {
      event.stopPropagation(); // Prevent modal opening when clicking on the download icon
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      link.click();
    } else {
      setShowSignUpModal(true);
    }
  };

  const handleDownloadAll = async () => {
    if (isAuthenticated()) {
      setDownloadingAll(true);
      const zip = new JSZip();
      const folder = zip.folder(`${categoryName}-wallpapers`);

      try {
        const downloadPromises = images.map(async (image, index) => {
          const response = await axios.get(image.downloadUrl, {
            responseType: "blob",
          });
          folder.file(`wallpaper-${index + 1}.jpg`, response.data);
        });

        await Promise.all(downloadPromises);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `${categoryName}-wallpapers.zip`);
      } catch (error) {
        console.error("Error downloading images:", error);
      } finally {
        setDownloadingAll(false);
      }
    } else {
      setShowSignUpModal(true);
    }
  };

  return (
    <div
      className={`images-container p-6 mt-14 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Modal for Image Preview */}
      {modalImage && (
        <div className="modal fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div
            className={`modal-content relative p-4 rounded-lg shadow-lg max-w-screen-md w-full ${
              isDarkMode ? "bg-transparent" : "bg-transparent"
            }`}
          >
            <img
              src={modalImage}
              alt="Preview"
              className="max-w-full max-h-screen rounded-lg object-contain"
            />
            {/* Action buttons */}
            <div className="flex justify-center mt-4 space-x-6">
              <button
                onClick={handleShareClick}
                className="bg-transparent text-white p-3 rounded-full flex items-center justify-center transition duration-300 shadow-md"
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
                  <span className="ml-2 text-sm text-gray-300 animate-pulse">
                    Link copied!
                  </span>
                )}
              </button>
              <button
                onClick={(e) => handleDownloadClick(modalImage, e)}
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

      <div className="flex justify-between items-center mb-6">
        {/* Back to Categories Button with SVG Logo */}
        <div
          className={`flex items-center py-2 px-2 border rounded-md shadow-md transition-all duration-300 space-x-2 cursor-pointer ${
            isDarkMode ? "bg-black text-black" : "bg-black text-white"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          onClick={() => navigate("/categories")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={isDarkMode ? "white" : "white"}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        {/* Download All Button */}
        <div
          className={`py-2 px-4 border bg-black text-white rounded-md shadow-md hover:bg-gray-400 transition-all duration-300 cursor-pointer ${
            downloadingAll ? "hover:text-white" : "hover:text-black"
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={handleDownloadAll}
          disabled={downloadingAll}
        >
          {downloadingAll ? "Downloading..." : "Download All"}
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">
        {categoryName} Images
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div
            className={`animate-spin rounded-full h-16 w-16 border-t-4 ${
              isDarkMode ? "border-white" : "border-black border-opacity-75"
            }`}
          ></div>
        </div>
      ) : images.length > 0 ? (
        <div className="images-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-card p-2 rounded-lg shadow-md cursor-pointer relative ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
              onClick={() => openPreviewModal(image.imageUrl)}
            >
              {!imageLoadStatus[index] && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse rounded-lg"></div>
              )}
              <img
                src={image.imageUrl}
                alt={`Wallpaper ${index}`}
                className={`w-full h-48 object-cover rounded-lg transition-opacity duration-300 ${
                  !imageLoadStatus[index] ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => handleImageLoad(index)}
              />
              <button
                onClick={(e) => handleDownloadClick(image.downloadUrl, e)}
                className="absolute top-2 right-2 bg-transparent text-white p-2 rounded-full"
                title="Download"
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
          ))}
        </div>
      ) : (
        <p className="text-center">No images found for this category.</p>
      )}

      {showSignUpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm mb-0">
          <div
            className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Please Sign Up First
            </h2>
            <SignUp
              customMargin={false}
              closeModal={() => {
                setShowSignUpModal(false);
                setShowSignInModal(true); // Open Sign In Modal after Sign Up
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

export default CategoryImages;
