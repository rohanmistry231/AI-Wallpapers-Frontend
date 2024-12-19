import { createContext, useState, useContext, useEffect } from "react";

// Vintage Black-and-White Theme Palette
const themes = {
  dark: {
    background: "#000000", // Pure black background
    color: "#ffffff", // Pure white text
    scrollbarTrack: "#1a1a1a", // Darker gray for scrollbar track
    scrollbarThumb: "#4d4d4d", // Medium gray for scrollbar thumb
    scrollbarThumbHover: "#666666", // Slightly lighter gray for hover effect
  },
  light: {
    background: "#ffffff", // Pure white background
    color: "#000000", // Pure black text
    scrollbarTrack: "#f0f0f0", // Light gray for scrollbar track
    scrollbarThumb: "#cccccc", // Medium gray for scrollbar thumb
    scrollbarThumbHover: "#b3b3b3", // Slightly darker gray for hover effect
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const currentTheme = themes[theme];
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.color;

    // Apply custom scrollbar styles
    document.documentElement.style.setProperty(
      "--scrollbar-track-color",
      currentTheme.scrollbarTrack
    );
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-color",
      currentTheme.scrollbarThumb
    );
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-hover-color",
      currentTheme.scrollbarThumbHover
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
