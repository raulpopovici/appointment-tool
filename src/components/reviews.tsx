import { useState } from 'react';
import { Star } from 'lucide-react'; // Import star icon for ratings
import { Avatar, AvatarFallback } from '../components/ui/avatar'; // Adjust import based on your project
import { StarRating } from './ui/starRating';
import { Card } from './ui/card';

interface ReviewProps {
  name: string;
  rating: number;
  review: string;
  date: string;
  initials: string;
}

const reviews: ReviewProps[] = [
  {
    name: 'Alice Johnson',
    rating: 5,
    review:
      'Amazing service! The staff was very friendly and professional. Highly recommend!',
    date: 'January 12, 2024',
    initials: 'AJ',
  },
  {
    name: 'Michael Smith',
    rating: 4,
    review:
      'Great experience overall. The wait time was a bit long, but the service made up for it.',
    date: 'February 5, 2024',
    initials: 'MS',
  },
  {
    name: 'Sarah Williams',
    rating: 5,
    review:
      'Absolutely loved it! I will definitely be coming back again. Fantastic work!',
    date: 'March 8, 2024',
    initials: 'SW',
  },
];

export const ReviewComponent = () => {
  return (
    <div className="flex space-y-4 flex-col">
      {reviews.map((review, index) => (
        <Card key={index} className="bg-white p-4 flex space-x-4 items-center">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gray-300 text-gray-700">
              {review.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {review.name}
              </h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <div className="flex space-x-1 my-1">
              <StarRating rating={review.rating} />
            </div>

            <p className="text-gray-700">{review.review}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
