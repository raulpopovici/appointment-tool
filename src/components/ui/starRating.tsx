import React from 'react';

type StarRatingProps = {
  rating: number; // Between 0 and 5
};

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={rating >= starIndex ? '#FFC107' : '#E5E7EB'} // Gold for filled stars, Gray for empty stars
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .673.418l2.7 5.47 6.007.873a.75.75 0 0 1 .415 1.28l-4.355 4.247 1.026 5.986a.75.75 0 0 1-1.088.79L12 18.896l-5.37 2.82a.75.75 0 0 1-1.087-.79l1.026-5.986-4.355-4.247a.75.75 0 0 1 .415-1.28l6.007-.873 2.7-5.47A.75.75 0 0 1 12 2.25Z"
              clipRule="evenodd"
            />
          </svg>
        );
      })}
    </div>
  );
};
