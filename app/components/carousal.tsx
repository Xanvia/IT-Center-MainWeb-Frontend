"use client";

import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define types for arrow props
interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

export const Carousel: React.FC = () => {
  const images = [
    "Slide/first.png",
    "Slide/first.png",
    "Slide/first.png",
    "Slide/first.png",
    "Slide/first.png",
  ];
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Slider
      slidesToShow={3}
      infinite={true}
      lazyLoad="anticipated"
      speed={300}
      centerMode={true}
      centerPadding="0"
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      beforeChange={(current, next) => setImgIndex(next)}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          className={idx === imgIndex ? "slide activeSlide" : "slide"}
        >
          <img src={img} alt={`slide-${idx}`} />
        </div>
      ))}
    </Slider>
  );
};
