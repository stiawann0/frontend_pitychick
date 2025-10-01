import React from "react";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pitychick-production.up.railway.app';

const DishesCard = ({ image, title, description, price, index = 0 }) => {
  // Helper function untuk mendapatkan full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-food.jpg';
    
    // Jika sudah full URL, return langsung
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Jika path relative, gabungkan dengan base URL
    if (imagePath.startsWith('/storage/')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    
    // Jika path tanpa slash depan
    if (imagePath.startsWith('storage/')) {
      return `${API_BASE_URL}/${imagePath}`;
    }
    
    // Default case - tambahkan /storage/
    return `${API_BASE_URL}/storage/${imagePath}`;
  };

  const imageUrl = getImageUrl(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.1,
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl shadow-md cursor-pointer w-[280px] overflow-hidden"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            // Fallback image jika gagal load
            e.target.src = '/images/placeholder-food.jpg';
            e.target.alt = 'Image not available';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>
        <p className="text-red-600 font-semibold text-lg">{price}</p>
      </div>
    </motion.div>
  );
};

export default DishesCard;