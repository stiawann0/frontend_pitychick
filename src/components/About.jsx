import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import apiService from "../services/apiService";
import { getImageUrl } from "../services/apiService";
import Button from "../layouts/Button";

const About = () => {
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAbout()
      .then(data => {
        console.log("📊 About data received:", data);
        setAboutData(data);
      })
      .catch(err => {
        console.error("Failed to fetch about data", err);
        // Set minimal fallback data
        setAboutData({
          title: "About PITY Chick",
          description_1: "Welcome to PITY Chick, your favorite crispy chicken destination.",
          description_2: "We serve the best quality chicken with authentic recipes that will keep you coming back for more."
        });
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

  if (!aboutData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center text-red-600">
          <p>Failed to load about data</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Destructure dengan default values
  const {
    title = "About PITY Chick",
    description_1 = "Welcome to PITY Chick, your favorite crispy chicken destination.",
    description_2 = "We serve the best quality chicken with authentic recipes that will keep you coming back for more.",
    main_image,
    story_image
  } = aboutData;

  const mainImageUrl = main_image ? getImageUrl(main_image) : null;
  const storyImageUrl = story_image ? getImageUrl(story_image) : null;

  console.log("🎯 Processed data:", {
    title,
    description_1,
    description_2,
    mainImageUrl,
    storyImageUrl
  });

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
        {mainImageUrl ? (
          <motion.img
            src={mainImageUrl}
            alt={title}
            className="w-full max-w-[280px] h-64 object-cover rounded-xl shadow-2xl shadow-black/30"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            onError={(e) => {
              console.error("❌ Main image failed:", mainImageUrl);
              e.target.src = '/images/placeholder-about.jpg';
            }}
            onLoad={() => console.log("✅ Main image loaded:", mainImageUrl)}
          />
        ) : (
          <div className="w-full max-w-[280px] h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-2xl shadow-black/30">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🍗</div>
              <p>About Image</p>
            </div>
          </div>
        )}
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
          className="font-semibold text-4xl text-center lg:text-left text-gray-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg leading-relaxed"
        >
          {description_1}
        </motion.p>

        {description_2 && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg leading-relaxed"
          >
            {description_2}
          </motion.p>
        )}

        {storyImageUrl && (
          <motion.div
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div onClick={() => setIsStoryVisible(true)}>
              <Button title="Our Story" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Story Modal */}
      <AnimatePresence>
        {isStoryVisible && storyImageUrl && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-4 relative max-w-xl shadow-lg mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsStoryVisible(false)}
                className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✖
              </button>
              <img
                src={storyImageUrl}
                alt="Our Story"
                className="rounded-lg max-h-[80vh] w-full object-contain"
                onError={(e) => {
                  console.error("❌ Story image failed:", storyImageUrl);
                  e.target.src = '/images/placeholder-story.jpg';
                }}
                onLoad={() => console.log("✅ Story image loaded:", storyImageUrl)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;