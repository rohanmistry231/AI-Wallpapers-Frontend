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
    avatarUrl: "",
    socialLinks: {
      portfolio: "",
      linkedin: "",
      github: "",
    },
    wallpaperCount: 0,
    topWallpaper: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);

        // Simulated API response
        const userData = {
          name: "Rohan Mistry",
          email: "rohanmistry231@gmail.com",
          bio: "A passionate wallpaper designer and developer, sharing beautiful and high-quality images with the world.",
          avatarUrl: "profile.jpg",
          socialLinks: {
            portfolio: "https://irohanportfolio.netlify.app",
            linkedin: "https://linkedin.com/in/rohan-mistry-493987202",
            github: "https://github.com/rohanmistry231",
          },
          wallpaperCount: 1200,
          topWallpaper: "top-wallpaper.jpg",
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
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto rounded-lg shadow-lg p-6 ${
          isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
              <img
                src={user.avatarUrl}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-400"
                loading="lazy"
              />
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <a
                  href={`mailto:${user.email}`}
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {user.email}
                </a>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Bio</h2>
              <p className="mt-2 text-lg">{user.bio}</p>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">Social Media Links</h3>
              <div className="mt-2 space-x-4">
                <a
                  href={user.socialLinks.portfolio || "#"}
                  className={`text-lg underline ${
                    isDarkMode ? "hover:text-gray-400" : "hover:text-gray-700"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
                <a
                  href={user.socialLinks.linkedin || "#"}
                  className={`text-lg underline ${
                    isDarkMode ? "hover:text-gray-400" : "hover:text-gray-700"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={user.socialLinks.github || "#"}
                  className={`text-lg underline ${
                    isDarkMode ? "hover:text-gray-400" : "hover:text-gray-700"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Wallpaper Showcase Section */}
            <div
              className={`mt-12 p-6 rounded-lg shadow-lg ${
                isDarkMode
                  ? "bg-gray-900 text-gray-200"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <h2 className="text-2xl font-semibold text-center">
                Wallpaper Showcase
              </h2>
              <p className="mt-4 text-center text-lg">
                Over {user.wallpaperCount}+ stunning wallpapers available for
                download and use!
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600">
                  High-Quality Designs
                </div>
                <div className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600">
                  Easy to Download
                </div>
                <div className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600">
                  Variety of Styles
                </div>
                <div className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600">
                  Free to Use
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
