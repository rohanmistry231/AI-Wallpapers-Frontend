// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Gallery from "./pages/Gallery/Gallery";
import Upload from "./pages/Upload/Upload";
import Category from "./pages/Category/Category";

function App() {
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen ${
          isDarkMode ? "dark" : "light"
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/upload" element={<Upload />} />
            {/* New route for AddNote */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const MainApp = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default MainApp;
