import React, { useEffect, useState } from "react";
import ReviewCard from "../layouts/ReviewCard";
import axios from "axios";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/reviews") // Ganti sesuai URL backend kamu
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
        Customer's Review
      </h1>
      <div className="flex md:flex-row gap-5 mt-5 flex-nowrap">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            img={review.img}
            name={review.name}
            description={review.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
