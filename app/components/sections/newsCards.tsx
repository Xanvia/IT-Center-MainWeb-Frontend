"use client";

import React, { useEffect, useRef, useState } from "react";
import HNewsCard from "../cards/hNewsCard";

const NewsCards = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <div className="relative my-16">
      <div className="flex overflow-x-scroll space-x-2 lg:justify-between snap-x snap-mandatory scrollbar-hide">
        <div className="snap-start">
          <HNewsCard />
        </div>
        <div className="snap-start">
          <HNewsCard />
        </div>
        <div className="snap-start">
          <HNewsCard />
        </div>
        <div className="snap-start">
          <HNewsCard />
        </div>
      </div>
      {/* Left shadow */}
      <div className="absolute top-0 left-0 h-full w-12 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-gray-800 to-transparent"></div>
      </div>
      {/* Right shadow */}
      {!isScrolledToEnd && (
        <div className="absolute top-0 right-0 h-full w-12 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-l from-gray-300 to-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default NewsCards;
