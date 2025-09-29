import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../assets/img/pity.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleChange = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);
  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    closeAuthModal();
    navigate("/login");
  };

  const handleRegister = () => {
    closeAuthModal();
    navigate("/register");
  };

  return (
    <div className="fixed w-full z-50 transition-all duration-300 bg-[#e4002b] text-white shadow-md">
      <div className="flex justify-between items-center px-5 md:px-10 py-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pity Chick Logo" className="h-10 md:h-12" />
          <h1 className="text-xl md:text-2xl font-semibold">PITY Chick</h1>
        </div>

        {/* Center Menu */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <ScrollLink to="home" spy smooth duration={500} className="hover:text-yellow-300 cursor-pointer">Home</ScrollLink>
          <ScrollLink to="about" spy smooth duration={500} className="hover:text-yellow-300 cursor-pointer">About</ScrollLink>

          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-yellow-300">
              <ScrollLink to="dishes" spy smooth duration={500}>Dishes</ScrollLink>
              <BiChevronDown size={20} />
            </div>
            <ul className="absolute hidden group-hover:block bg-white text-black border rounded-lg p-4 space-y-2 z-50 mt-2 w-40">
              <li><ScrollLink to="dishes-original" spy smooth duration={500} className="hover:text-red-600">Original</ScrollLink></li>
              <li><ScrollLink to="dishes-add" spy smooth duration={500} className="hover:text-red-600">Add</ScrollLink></li>
              <li><ScrollLink to="dishes-snack" spy smooth duration={500} className="hover:text-red-600">Snack</ScrollLink></li>
              <li><ScrollLink to="dishes-drink" spy smooth duration={500} className="hover:text-red-600">Drink</ScrollLink></li>
            </ul>
          </div>

          <RouterLink to="/gallery" className="hover:text-yellow-300">Gallery</RouterLink>
          <ScrollLink to="review" spy smooth duration={500} className="hover:text-yellow-300 cursor-pointer">Reviews</ScrollLink>
        </nav>

        {/* User + Cart */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-white text-[#e4002b] font-semibold px-4 py-1 rounded-full text-sm hover:bg-gray-100">
            Enter Promo Code
          </button>

          <button className="text-white hover:text-yellow-300">
            <FiShoppingCart size={24} />
          </button>

          {user ? (
            <div className="relative group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 font-bold text-sm cursor-pointer">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="absolute hidden group-hover:flex flex-col bg-white text-black rounded-md right-0 mt-2 shadow-lg">
                <span className="px-4 py-2 text-sm">Hi, {user.name || "User"}</span>
                <button onClick={logout} className="px-4 py-2 text-sm hover:bg-red-100">Logout</button>
              </div>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="bg-white text-[#e4002b] px-3 py-2 rounded-full text-sm font-semibold hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {menu ? (
            <AiOutlineClose size={25} onClick={handleChange} />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`${
        menu ? "translate-x-0" : "-translate-x-full"
      } md:hidden flex flex-col absolute bg-[#e4002b] text-white left-0 top-20 font-semibold text-xl text-center pt-8 pb-4 gap-6 w-full h-fit transition-transform duration-300`}>
        <ScrollLink to="home" spy smooth duration={500} onClick={closeMenu} className="hover:text-yellow-300 cursor-pointer">Home</ScrollLink>
        <ScrollLink to="about" spy smooth duration={500} onClick={closeMenu} className="hover:text-yellow-300 cursor-pointer">About</ScrollLink>
        <ScrollLink to="dishes" spy smooth duration={500} onClick={closeMenu} className="hover:text-yellow-300 cursor-pointer">Dishes</ScrollLink>
        <RouterLink to="/gallery" onClick={closeMenu} className="hover:text-yellow-300">Gallery</RouterLink>
        <ScrollLink to="review" spy smooth duration={500} onClick={closeMenu} className="hover:text-yellow-300 cursor-pointer">Reviews</ScrollLink>

        {user ? (
          <button
            onClick={() => {
              closeMenu();
              logout();
            }}
            className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              closeMenu();
              openAuthModal();
            }}
            className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition"
          >
            Login
          </button>
        )}
      </div>

      {/* Modal Auth */}
      {!user && showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-4 w-80">
            <h2 className="text-xl font-semibold">Login or Register</h2>
            <p className="text-gray-600 text-sm">Please choose an option</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogin}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 transition"
              >
                Register
              </button>
              <button
                onClick={closeAuthModal}
                className="text-gray-500 text-sm hover:underline mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
