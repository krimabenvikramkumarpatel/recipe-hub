"use client";

import { useEffect, useState } from "react";

interface Review {
  rating: string;
  comment: string;
}

interface ReviewSectionProps {
  recipeId: string;
}

export default function ReviewSection({ recipeId }: ReviewSectionProps) {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const savedReviews = JSON.parse(
      localStorage.getItem(`reviews-${recipeId}`) || "[]"
    );
    setReviews(savedReviews);
  }, [recipeId]);

  const handleAddReview = () => {
    if (!rating || !comment) {
      alert("Please add rating and comment.");
      return;
    }

    const newReview = { rating, comment };
    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${recipeId}`, JSON.stringify(updatedReviews));

    setRating("");
    setComment("");
  };

  return (
    <div>
      <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>Ratings & Reviews</h2>
      <p style={{ color: "#555", marginBottom: "20px" }}>
        Share your opinion about this recipe.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            minWidth: "140px",
          }}
        >
          <option value="">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <input
          type="text"
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            padding: "12px",
            flex: "1",
            minWidth: "240px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={handleAddReview}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#222",
            color: "white",
          }}
        >
          Add Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <div
          style={{
            padding: "18px",
            border: "1px solid #e5e5e5",
            borderRadius: "12px",
            backgroundColor: "#fafafa",
          }}
        >
          <p>No reviews yet.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {reviews.map((review, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "16px",
                backgroundColor: "#fafafa",
              }}
            >
              <p style={{ marginBottom: "8px" }}>
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}