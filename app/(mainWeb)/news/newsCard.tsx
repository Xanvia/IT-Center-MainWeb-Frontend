import React from "react";
import { News } from "./page";
import { getAbsoluteImageUrl } from "@/utils/common";

export const NCard = (news: News) => {
  console.log(news);
  return (
    <div className="bg-white shadow-xl rounded-lg relative">
      <figure>
        <img
          width={600}
          height={600}
          className="rounded-t-lg h-64 object-cover w-full"
          src={getAbsoluteImageUrl(news?.images?.[0]?.path) || "/common/labReservation.jpg"}
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
            {news.date && (
              <div className="flex items-center text-gray-500">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" stroke="currentColor" fill="none" />
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" stroke="currentColor" />
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" stroke="currentColor" />
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" stroke="currentColor" />
                </svg>
                <span className="text-sm">{news.date}</span>
              </div>
            )}
          <div className="flex items-center text-gray-500 pb-4">
              {news.time && (
                <>
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
                </>
              )}
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100 absolute bottom-4">
          <p className="text-xs text-gray-400">Published on {news.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};
