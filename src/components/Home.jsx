import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "../services/apiService"; // Import yang benar

const Home = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [homeData, setHomeData] = useState({
    title: "",
    description: "",
    background_image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService.getHomeSettings() // ✅ GUNAKAN API SERVICE
      .then((data) => {
        console.log("Home data received:", data);
        setHomeData(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch home settings", err);
        setError("Failed to load home data");
        // Set default data jika error
        setHomeData({
          title: "Welcome to PITY Chick",
          description: "Pity Fams – The Crispy Chicken Heaven That Keeps You Coming Back!",
          background_image_url: "/images/default-background.jpg"
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOrderClick = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (isLoggedIn) {
      navigate("/booking");
    } else {
      setShowLoginModal(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading home content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-5 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.3)), url(${homeData.background_image_url})`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" />

      <motion.div
        className="text-center space-y-5 max-w-3xl z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1
          className="font-semibold text-5xl md:text-6xl text-white"
          style={{ textShadow: `0 0 5px #fff, 0 0 10px red, 0 0 20px red` }}
        >
          {homeData.title || "Welcome to PITY Chick"}
        </h1>

        <p
          className="text-white text-lg md:text-xl font-medium"
          style={{ textShadow: `0 0 4px #fff, 0 0 8px red` }}
        >
          {homeData.description || "Pity Fams – The Crispy Chicken Heaven That Keeps You Coming Back!"}
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleOrderClick}
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
          >
            Order Now
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
            <p className="mb-6">
              You must register to make a booking. Please register using the button on the top right.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;