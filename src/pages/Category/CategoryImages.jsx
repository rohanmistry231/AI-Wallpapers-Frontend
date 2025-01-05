import React, { useState, useEffect } from "react";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";
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
  }, [categoryName]);

  const openPreviewModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closePreviewModal = () => {
    setModalImage(null);
    setShareStatus(false);
  };

  const handleImageLoad = (index) => {
    setImageLoadStatus((prevStatus) => ({ ...prevStatus, [index]: true }));
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(modalImage);
    setShareStatus(true);
    setTimeout(() => setShareStatus(false), 2000);
  };

  const handleDownloadClick = (url, event) => {
    event.stopPropagation(); // Prevent modal opening when clicking on the download icon
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  const handleDownloadAll = async () => {
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
                className="bg-transparent text-white p-3 rounded-full flex items-center justify-center"
                title="Share"
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
                    d="M15 12h3l-4 4m0 0l4-4-4-4m4 4H9"
                  />
                </svg>
                {shareStatus && <span className="ml-2 text-sm">Link copied!</span>}
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
        <button
          className="p-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/categories")}
        >
          Back to Categories
        </button>
        <button
          className={`p-2 px-4 ${
            downloadingAll ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white rounded-lg shadow-md transition-colors`}
          onClick={handleDownloadAll}
          disabled={downloadingAll}
        >
          {downloadingAll ? "Downloading..." : "Download All"}
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">
        {categoryName} Images
      </h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div
            className={`animate-spin rounded-full h-16 w-16 border-t-4 ${
              isDarkMode
                ? "border-white"
                : "border-black border-opacity-75"
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
    </div>
  );
};

export default CategoryImages;
