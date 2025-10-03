import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiService from "../services/apiService"; // GANTI
import { getImageUrl } from "../services/apiService"; // GANTI
import Button from "../layouts/Button";

const About = () => {
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAbout() // GANTI
      .then(data => {
        // Handle response structure yang berbeda
        const aboutData = data.data || data || {};
        setAboutData(aboutData);
      })
      .catch(err => {
        console.error("Failed to fetch about data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading about data...</p>
        </div>
      </div>
    );
  }

  if (!aboutData) return <div className="text-center py-10 text-red-600">Failed to load about data</div>;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:px-32 px-5 py-16 gap-10 relative">
      {/* Image Section */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.img
          src={getImageUrl(aboutData.main_image)} // GANTI
          alt="About us"
          className="w-full max-w-[280px] h-auto rounded-xl shadow-2xl shadow-black/30"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          onError={(e) => {
            e.target.src = '/images/placeholder-about.jpg';
          }}
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="w-full lg:w-1/2 space-y-6"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="font-semibold text-4xl text-center lg:text-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {aboutData.title || "About Us"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700"
        >
          {aboutData.description_1 || "No description available."}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-700"
        >
          {aboutData.description_2 || ""}
        </motion.p>

        <motion.div
          className="flex justify-center lg:justify-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div onClick={() => setIsStoryVisible(true)}>
            <Button title="Story Us" />
          </div>
        </motion.div>
      </motion.div>

      {/* Modal Image */}
      <AnimatePresence>
        {isStoryVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-4 relative max-w-xl shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsStoryVisible(false)}
                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black z-10"
              >
                ✖
              </button>
              <img
                src={getImageUrl(aboutData.story_image)} // GANTI
                alt="Our Story"
                className="rounded-lg max-h-[80vh] w-full object-contain"
                onError={(e) => {
                  e.target.src = '/images/placeholder-story.jpg';
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;