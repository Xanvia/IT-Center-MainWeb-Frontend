import React from "react";
import { News } from "./page";
import Image from "next/image";

export const NCard = (news: News) => {
  console.log(news);
  return (
    <div className="bg-white shadow-xl rounded-lg">
      <figure>
        <Image
          width={600}
          height={600}
          className="rounded-t-lg h-64 object-cover w-full"
          src={(news && news.images?.[0]?.path) || "/common/labReservation.jpg"}
          alt="Shoes"
        />
      </figure>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          {news.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {news.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{news.venue}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{news.time}</span>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Published on {news.date}</p>
        </div>
      </div>
    </div>
  );
};
