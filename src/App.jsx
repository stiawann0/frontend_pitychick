import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import Gallery from "./pages/Gallery";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PortfolioPage from "./pages/PortfolioPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import ProtectedRoute from "./ProtectedRoute";
import { useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  const noNavFooter = ["/booking", "/gallery", "/login", "/register", "/portfolio"];
  const hideNavFooter = noNavFooter.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
      {!hideNavFooter && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
