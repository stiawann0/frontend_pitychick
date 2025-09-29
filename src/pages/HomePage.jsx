import React from "react";
import Home from "../components/Home";
import About from "../components/About";
import Dishes from "../components/Dishes";
import Gallery from "../pages/Gallery"; // ✅ Ganti Menu menjadi Gallery
import Review from "../components/Review";

const HomePage = () => {
  return (
    <>
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="dishes">
        <Dishes />
      </div>
      <div id="gallery">
  <Gallery />
</div>
      <div id="review">
        <Review />
      </div>
    </>
  );
};

export default HomePage;
