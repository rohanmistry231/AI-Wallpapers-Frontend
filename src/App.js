import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import CategoryImages from "./pages/Category/CategoryImages";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Upload from "./pages/Upload/Upload";
import Wallpapers from "./pages/Wallpapers/Wallpapers";
import CategoriesList from "./pages/Category/CategoryList";
import Personalization from "./pages/Personalization/Personalization";
import Contribution from "./components/SignIn";
import Contributor from "./pages/Contribution/Contributor";

function App() {
  const { isDarkMode } = useTheme();

  return (
    <Router
      future={{
        v7_relativeSplatPath: true, // Opt into the new v7 relative splat path behavior
        v7_startTransition: true,  // Opt into state transition handling
      }}
    >
      <div
        className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : "light"}`}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/category/:categoryName" element={<CategoryImages />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/contri" element={<Contribution />} />
            <Route path="/contribution" element={<Contributor />} />
            <Route path="/personalization" element={<Personalization />} />
            <Route path="/wallpapers" element={<Wallpapers />} />
            <Route path="/category/:category" element={<CategoryImages />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const MainApp = () => (
  <ThemeProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

export default MainApp;
