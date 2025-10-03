import React, { useEffect, useState } from "react";
import ReviewCard from "../layouts/ReviewCard";
import apiService from "../services/apiService"; // GANTI

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getReviews() // GANTI
      .then((response) => {
        // Handle response structure yang berbeda
        const reviewsData = response.data || response || [];
        setReviews(reviewsData);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
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
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
        Customer's Review
      </h1>
      <div className="flex md:flex-row gap-5 mt-5 flex-nowrap">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard
              key={index}
              img={review.img}
              name={review.name}
              description={review.description}
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default Review;