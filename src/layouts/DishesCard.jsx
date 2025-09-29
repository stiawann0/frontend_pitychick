import React from "react";
import { motion } from "framer-motion";

const DishesCard = ({ image, title, description, price, index = 0 }) => {
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
      <img
        src={`http://localhost:8000/storage/${image}`}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-2">{description}</p>
        <p className="text-red-600 font-semibold">{price}</p>
      </div>
    </motion.div>
  );
};

export default DishesCard;
