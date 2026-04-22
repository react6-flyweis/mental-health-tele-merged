"use client"
import { Star } from "lucide-react";

export const RatingStars = ({ rating = 0 }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(rating)) {
          return (
            <Star
              key={i}
              className="size-4 fill-yellow-400 text-yellow-400"
            />
          );
        }

        if (i === Math.ceil(rating) && rating % 1 !== 0) {
          return (
            <Star
              key={i}
              className="size-4 text-yellow-400 opacity-50"
            />
          );
        }

        return <Star key={i} className="size-4 text-gray-300" />;
      })}
    </div>
  );
};