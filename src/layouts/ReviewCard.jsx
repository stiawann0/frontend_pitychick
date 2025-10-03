// src/layouts/ReviewCard.jsx
import React from "react";
import { getImageUrl } from "../services/apiService";

const ReviewCard = ({ img, name, description }) => {
  const imageUrl = getImageUrl(img);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-80">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-avatar.jpg';
          }}
        />
        <h3 className="font-semibold">{name}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ReviewCard;