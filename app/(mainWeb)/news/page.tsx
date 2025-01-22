"use client";

import React, { useEffect, useState } from "react";
import { NCard } from "./newsCard";
import Axios from "@/config/axios";

export type News = {
  title: string;
  description: string;
  date: string;
  time: string;
  images: { id: string; path: string }[];
  venue: string;
};

const Home: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const result = await Axios.get("/contents/news");
      setNews(result.data);
    };
    fetchNews();
  }, []);

  return (
    <div className="p-10">
      <h1 className=" from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl sm:text-lg text-center gird">
        News
      </h1>
      <div className="flex justify-center mt-1">
        <div className="bg-yellow-600 h-1 md:w-36 rounded-md"></div>
      </div>
      <br />
      <div className="pb-10">
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
          {news.map((news, index) => (
            <NCard key={index} {...news} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
