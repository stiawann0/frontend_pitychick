import React, { useEffect, useState } from "react";
import apiService from "../services/apiService"; // GANTI
import { BsInstagram } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getFooter() // GANTI
      .then((data) => {
        // Handle response structure yang berbeda
        const footerData = data.data || data || {};
        setFooter(footerData);
      })
      .catch((err) => console.error("Gagal fetch footer:", err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white rounded-t-3xl mt-8 py-8 text-center">
        <p>Loading footer...</p>
      </div>
    );
  }

  if (!footer) {
    return (
      <div className="bg-black text-white rounded-t-3xl mt-8 py-8 text-center">
        <p>Failed to load footer</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">

        {/* Brand Identity */}
        <div className="w-full md:w-1/4">
          <h1 className="font-semibold text-xl pb-4">{footer.brand_name || "PITY Chick"}</h1>
          <p className="text-sm text-gray-300">{footer.brand_description || "Restaurant description"}</p>
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
            <a href={`mailto:${footer.email}`} className="hover:text-red-500 cursor-pointer transition-colors">{footer.email || "email@example.com"}</a>
            <a href={`tel:${footer.phone}`} className="hover:text-red-500 cursor-pointer transition-colors">{footer.phone || "+62 xxx-xxxx-xxxx"}</a>
            <a href={footer.instagram || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-red-500 cursor-pointer transition-colors">
              <BsInstagram className="inline mr-2" /> Instagram
            </a>
          </nav>
        </div>
      </div>

      {/* Footer Bottom Info */}
      <div>
        <p className="text-center py-4 text-gray-300">
          {footer.footer_note ? (
            <Link to="/portfolio" className="hover:underline text-inherit hover:text-white">
              {footer.footer_note}
            </Link>
          ) : (
            `@${footer.brand_name || "PITY Chick"}`
          )}{" "}
          <span className="text-red-500">{footer.address || "Restaurant address"}</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;