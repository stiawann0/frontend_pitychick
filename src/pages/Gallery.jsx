import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import apiService from "../services/apiService";

const Gallery = () => {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService.getGallery()
      .then((galleryData) => {
        if (galleryData && galleryData.length > 0) {
          setImages(galleryData);
        } else {
          setImages([]);
        }
        setError(null);
      })
      .catch((err) => {
        console.error("Gagal mengambil data galeri:", err);
        setError("Failed to load gallery data. Please try again later.");
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-2xl w-full">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 w-full max-w-6xl">
        {images.length > 0 ? (
          images.map((item, index) => (
            <div key={item.id || index} className="break-inside-avoid">
              <img
                src={item.image_url}
                alt={item.title || `Gallery image ${index + 1}`}
                className="w-full rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                loading="lazy"
                onError={(e) => {
                  console.error(`Image failed to load: ${item.image_url}`);
                  e.target.src = '/images/placeholder-gallery.jpg'; // Fallback lokal
                }}
              />
              {item.title && (
                <p className="mt-2 text-sm text-gray-600 text-center">{item.title}</p>
              )}
            </div>
          ))
        ) : (
          !error && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No gallery images available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for updates!</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Gallery;