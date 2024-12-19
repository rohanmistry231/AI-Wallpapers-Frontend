// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

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