import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';

const ProductReviews = ({ review }) => {
  const [rating, setRating] = useState(review?.rating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    setRating(review.rating);
  },[review])

  const reviewOptions = {
    edit: false,
    color: 'rgba(20, 20, 20, .1)',
    activeColor: 'tomato',
    size: 16,
    isHalf: true,
    onChange: handleRatingChange,
  };

  return (
    <div className="w-[200px] border p-2">
      <div>{review.name}</div>
      {rating === review.rating && <div>
        <ReactStars {...reviewOptions} value={review.rating} />
      </div>}
      <div>{review.comment}</div>
    </div>
  );
};

export default ProductReviews;
