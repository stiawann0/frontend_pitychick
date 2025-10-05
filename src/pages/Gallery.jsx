import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import apiService from "../services/apiService";

const Gallery = () => {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ganti dengan domain backend kamu jika tidak pakai .env
  const BACKEND_URL = import.meta.env.VITE_API_URL || "https://pitychick-production.up.railway.app";

  useEffect(() => {
    apiService.getGallery()
      .then((galleryData) => {
        setImages(galleryData);
        setError(null);
      })
      .catch((err) => {
        console.error("Gagal mengambil data galeri:", err);
        setError("Failed to load gallery data");
        setImages([]);
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
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-20 bg-white flex flex-col items-center relative">
      {location.pathname === "/gallery" && (
        <Link
          to="/"
          className="fixed bottom-6 right-6 bg-brightColor text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition duration-300 z-50 flex items-center justify-center animate-bounce"
          title="Back to Home"
        >
          <FaArrowCircleLeft className="text-2xl" />
        </Link>
      )}

      <h1 className="text-4xl font-semibold mb-10">Our Gallery</h1>

      {error && (
        <div className="text-red-600 mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 w-full max-w-6xl">
        {images.length > 0 ? (
          images.map((item, index) => (
            <img
              key={index}
              src={item.image_url || item.image}
              alt={item.title || `gallery-${index + 1}`}
              className="w-full rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.error("Gallery image failed to load:", e.target.src);
                e.target.onerror = null; // Cegah loop
                e.target.src = `${BACKEND_URL}/storage/gallery/placeholder-gallery.jpg`;
              }}
            />
          ))
        ) : (
          <p className="text-gray-500">No gallery images available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
