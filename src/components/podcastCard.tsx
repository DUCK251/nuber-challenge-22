import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { StarRating } from "./star-rating";

interface IPodcastProps {
  id: number;
  title: string;
  updatedAt: any;
  category: string;
  rating: number;
  description: string;
  totalSubscribers: number;
}

const getDateString = (date: any): string => {
  date = new Date(date);
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return `${y}-${m}-${d}`;
};

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

export const PodcastCard: React.FC<IPodcastProps> = ({
  id,
  title,
  updatedAt,
  category,
  rating,
  description,
  totalSubscribers,
}) => (
  <div key={id} className="flex px-4 py-2 bg-white text-black justify-between">
    <div className="flex flex-col md:flex-row w-full">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex h-12 w-12 md:h-24 md:w-24 bg-blue-600 mr-3 rounded-lg"></div>
          <div className="flex flex-col mb-4 md:hidden">
            <p>
              {title} (
              <FontAwesomeIcon icon={faStar} className="text-blue-900 mr-1" />
              {rating})
            </p>
            <small>{getDateString(updatedAt)}</small>
          </div>
        </div>
        <div className="flex flex-col md:hidden">
          <small>SUBS</small>
          <p className="font-bold">{totalSubscribers}</p>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-xl">
        <small className="hidden md:flex">{category}</small>
        <div className="hidden md:flex items-center">
          {title}(
          <StarRating rating={rating} />)
        </div>
        <p className="truncate">{description} abcdefghijklmnopqrstu</p>
        <small className="hidden md:flex">{getDateString(updatedAt)}</small>
      </div>
    </div>
    <div className="hidden md:flex flex-col text-center items-center justify-center">
      <p>SUBS</p>
      <p className="font-bold">{totalSubscribers}</p>
    </div>
  </div>
);
