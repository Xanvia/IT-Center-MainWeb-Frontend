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
      <div
        className="flex overflow-x-scroll space-x-2 lg:justify-between snap-x snap-mandatory scrollbar-hide touch-pan-x"
        ref={scrollContainerRef}
      >
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

      {/* Right shadow */}
      <div
        className={`${
          isScrolledToEnd ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300 absolute top-0 right-0 h-full w-12 pointer-events-none`}
      >
        <div className="h-full w-full bg-gradient-to-l from-gray-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default NewsCards;
