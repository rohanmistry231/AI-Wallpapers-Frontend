import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

const Profile = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "", // Placeholder for user avatar
    socialLinks: {
      portfolio: "", // Default empty string to avoid undefined errors
      linkedin: "",
      github: "",
    },
    wallpaperCount: 0, // Track wallpaper count
    topWallpaper: "", // Showcase a top wallpaper
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Simulate fetching user data (replace with actual API call)
        const userData = {
          name: "Rohan Mistry",
          email: "rohanmistry231@gmail.com",
          bio: "A passionate wallpaper designer and developer, sharing beautiful and high-quality images with the world.",
          avatarUrl: "profile.jpg", // Example avatar URL
          socialLinks: {
            portfolio: "https://irohanportfolio.netlify.app",
            linkedin: "https://linkedin.com/in/rohan-mistry-493987202",
            github: "https://github.com/rohanmistry231",
          },
          wallpaperCount: 1200, // Example number of wallpapers
          topWallpaper: "top-wallpaper.jpg", // Example top wallpaper
        };

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className={`min-h-screen p-6 mt-14 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Profile Card */}
      <div
        className={`max-w-8xl mx-auto rounded-lg shadow-lg p-6 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover"
                loading="lazy" // Lazy loading added here
              />
              <div>
                <h1 className="text-3xl font-semibold">{user.name}</h1>
                <a
                  href="mailto:rohanmistry231@gmail.com"
                  className="text-sm text-gray-500"
                >
                  {user.email}
                </a>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Bio</h2>
              <p
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mt-2`}
              >
                {user.bio}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Social Media Links</h3>
              <div className="space-x-4">
                <a
                  href={user.socialLinks.portfolio || "#"}
                  className={`text-xl ${
                    isDarkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
                <a
                  href={user.socialLinks.linkedin || "#"}
                  className={`text-xl ${
                    isDarkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={user.socialLinks.github || "#"}
                  className={`text-xl ${
                    isDarkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Wallpaper Showcase Section */}
      {/* Wallpaper Showcase Section */}
          <div
            className={`mt-12 p-6 rounded-lg shadow-lg ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-semibold text-center">
              Wallpaper Showcase
            </h2>
            <div className="mt-4 text-center">
              <p className="text-lg">
                Over {user.wallpaperCount}+ stunning wallpapers available for download and use!
              </p>
              <div className="mt-6">
                <h3 className="text-xl font-medium">
                  Why Choose Our Wallpapers?
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg">
                    <p>High-Quality Designs</p>
                  </div>
                  <div className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
                    <p>Easy to Download</p>
                  </div>
                  <div className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-lg">
                    <p>Variety of Styles</p>
                  </div>
                  <div className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg">
                    <p>Free to Use</p>
                  </div>
                  {/* <div className="mt-4 text-center w-full">
                  <Link
                    to="/wallpapers"
                    className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white py-3 px-8 rounded-full shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:opacity-90 focus:outline-none"
                  >
                    Explore Wallpapers
                  </Link>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
