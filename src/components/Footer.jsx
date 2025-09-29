import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsInstagram } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/footer")
      .then((res) => setFooter(res.data))
      .catch((err) => console.error("Gagal fetch footer:", err));
  }, []);

  if (!footer) return null;

  return (
    <div className="bg-black text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">

        {/* Brand Identity */}
        <div className="w-full md:w-1/4">
          <h1 className="font-semibold text-xl pb-4">{footer.brand_name}</h1>
          <p className="text-sm">{footer.brand_description}</p>
        </div>

        {/* Links */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className="flex flex-col gap-2">
            <ScrollLink to="home" smooth duration={500} className="hover:text-brightColor cursor-pointer">Home</ScrollLink>
            <ScrollLink to="about" smooth duration={500} className="hover:text-brightColor cursor-pointer">About</ScrollLink>
            <ScrollLink to="dishes" smooth duration={500} className="hover:text-brightColor cursor-pointer">Dishes</ScrollLink>
            <ScrollLink to="review" smooth duration={500} className="hover:text-brightColor cursor-pointer">Reviews</ScrollLink>
          </nav>
        </div>

        {/* Dishes Menu */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Dishes</h1>
          <nav className="flex flex-col gap-2">
            <ScrollLink to="dishes-original" smooth duration={500} className="hover:text-brightColor cursor-pointer">Original</ScrollLink>
            <ScrollLink to="dishes-add" smooth duration={500} className="hover:text-brightColor cursor-pointer">Add</ScrollLink>
            <ScrollLink to="dishes-snack" smooth duration={500} className="hover:text-brightColor cursor-pointer">Snack</ScrollLink>
            <ScrollLink to="dishes-drink" smooth duration={500} className="hover:text-brightColor cursor-pointer">Drink</ScrollLink>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className="flex flex-col gap-2">
            <a href={`mailto:${footer.email}`} className="hover:text-brightColor cursor-pointer">{footer.email}</a>
            <a href={`tel:${footer.phone}`} className="hover:text-brightColor cursor-pointer">{footer.phone}</a>
            <a href={footer.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brightColor cursor-pointer">
              <BsInstagram className="inline mr-2" /> Instagram
            </a>
          </nav>
        </div>
      </div>

      {/* Footer Bottom Info */}
      <div>
  <p className="text-center py-4">
    {footer.footer_note ? (
      <Link to="/portfolio" className="hover:underline text-inherit">
        {footer.footer_note}
      </Link>
    ) : (
      `@${footer.brand_name}`
    )}{" "}
    <span className="text-brightColor">{footer.address}</span>
  </p>
</div>

    </div>
  );
};

export default Footer;
