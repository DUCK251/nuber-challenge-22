import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IStarRatingProps {
  rating: number;
}

const getWidthScaleForRate = (rating: number): number => {
  let minDistance = 1000;
  let ScaledWidth = 0;
  for (let width = 0; width <= 20; ++width) {
    const distance = Math.abs(rating * 20 - width * 5);
    if (distance < minDistance) {
      minDistance = distance;
      ScaledWidth = width;
    }
  }
  return ScaledWidth;
};

export const StarRating: React.FC<IStarRatingProps> = ({ rating }) => {
  return (
    <div className="flex relative">
      <div
        className={`flex absolute overflow-hidden w-${getWidthScaleForRate(
          rating
        )}/20`}
      >
        <FontAwesomeIcon icon={faStar} className="text-blue-900" />
        <FontAwesomeIcon icon={faStar} className="text-blue-900" />
        <FontAwesomeIcon icon={faStar} className="text-blue-900" />
        <FontAwesomeIcon icon={faStar} className="text-blue-900" />
        <FontAwesomeIcon icon={faStar} className="text-blue-900" />
      </div>
      <FontAwesomeIcon icon={faStar} className="text-blue-400" />
      <FontAwesomeIcon icon={faStar} className="text-blue-400" />
      <FontAwesomeIcon icon={faStar} className="text-blue-400" />
      <FontAwesomeIcon icon={faStar} className="text-blue-400" />
      <FontAwesomeIcon icon={faStar} className="text-blue-400" />
    </div>
  );
};
