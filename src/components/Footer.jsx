import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { BsInstagram } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService.getFooter()
      .then((data) => {
        console.log("Raw footer data:", data); // Debug log
        
        // Handle berbagai kemungkinan response structure
        let footerData = {};
        
        if (data && data.data) {
          // Structure: { data: { ... } }
          footerData = data.data;
        } else if (data && data.footer) {
          // Structure: { footer: { ... } }
          footerData = data.footer;
        } else if (data && typeof data === 'object') {
          // Structure langsung object
          footerData = data;
        } else {
          // Data kosong atau tidak valid
          footerData = {};
        }
        
        console.log("Processed footer data:", footerData); // Debug log
        setFooter(footerData);
        setError(null);
      })
      .catch((err) => {
        console.error("Gagal fetch footer:", err);
        setError("Failed to load footer data");
        setFooter({}); // Set empty object sebagai fallback
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white rounded-t-3xl mt-8 py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-2">Loading footer...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white rounded-t-3xl mt-8 py-8 text-center">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Fallback data jika footer null atau empty
  const displayData = footer || {};

  return (
    <div className="bg-black text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">

        {/* Brand Identity */}
        <div className="w-full md:w-1/4">
          <h1 className="font-semibold text-xl pb-4">
            {displayData.brand_name || displayData.name || "PITY Chick"}
          </h1>
          <p className="text-sm text-gray-300">
            {displayData.brand_description || displayData.description || "Your favorite crispy chicken restaurant"}
          </p>
        </div>

        {/* Links */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className="flex flex-col gap-2">
            <ScrollLink to="home" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">Home</ScrollLink>
            <ScrollLink to="about" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">About</ScrollLink>
            <ScrollLink to="dishes" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">Dishes</ScrollLink>
            <ScrollLink to="review" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">Reviews</ScrollLink>
          </nav>
        </div>

        {/* Dishes Menu */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Dishes</h1>
          <nav className="flex flex-col gap-2">
            <ScrollLink to="dishes-original" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">Original</ScrollLink>
            <ScrollLink to="dishes-add" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">Add</ScrollLink>
            <ScrollLink to="dishes-snack" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">Snack</ScrollLink>
            <ScrollLink to="dishes-drink" smooth duration={500} className="hover:text-red-500 cursor-pointer transition-colors">Drink</ScrollLink>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className="flex flex-col gap-2">
            <a href={`mailto:${displayData.email}`} className="hover:text-red-500 cursor-pointer transition-colors">
              {displayData.email || "contact@pitychick.com"}
            </a>
            <a href={`tel:${displayData.phone}`} className="hover:text-red-500 cursor-pointer transition-colors">
              {displayData.phone || "+62 123-4567-8900"}
            </a>
            <a href={displayData.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 cursor-pointer transition-colors">
              <BsInstagram className="inline mr-2" /> 
              {displayData.instagram ? "Instagram" : "Follow Us"}
            </a>
          </nav>
        </div>
      </div>

      {/* Footer Bottom Info */}
      <div>
        <p className="text-center py-4 text-gray-300">
          {displayData.footer_note ? (
            <Link to="/portfolio" className="hover:underline text-inherit hover:text-white">
              {displayData.footer_note}
            </Link>
          ) : (
            `@${displayData.brand_name || displayData.name || "PITY Chick"}`
          )}{" "}
          <span className="text-red-500">
            {displayData.address || "Jl. Restaurant No. 123, Indonesia"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;