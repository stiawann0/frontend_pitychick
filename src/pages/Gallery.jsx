import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import axios from "axios";

const Gallery = () => {
  const location = useLocation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Ambil data gambar dari backend
    axios
      .get("http://localhost:8000/api/gallery") // sesuaikan jika baseURL berbeda
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.error("Gagal mengambil data galeri:", err);
      });
  }, []);

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
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 w-full max-w-6xl">
        {images.length > 0 ? (
          images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`gallery-${index + 1}`}
              className="w-full rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          ))
        ) : (
          <p className="text-gray-500">Belum ada gambar.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
