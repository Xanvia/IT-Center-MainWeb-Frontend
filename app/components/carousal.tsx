"use client";

import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

interface ArrowProps {
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <TfiArrowCircleRight />
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <TfiArrowCircleLeft />
    </div>
  );
};

// Image array
export const Carousel: React.FC = () => {
  const images = [
    "/Slide/first.png",
    "/Slide/second.png",
    "/Slide/third.png",
    "/Slide/first.png",
    "/Slide/second.png",
  ];
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Slider
      // remove dots if screen size is mobile
      dots={!(typeof window !== "undefined" && window.innerWidth < 750)}
      autoplay={true}
      autoplaySpeed={5000}
      // no of slides
      slidesToShow={
        typeof window !== "undefined" && window.innerWidth < 750 ? 1 : 3
      }
      infinite={true}
      focusOnSelect={true}
      lazyLoad="ondemand"
      speed={700}
      centerMode={true}
      centerPadding="0"
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      beforeChange={(current, next) => setImgIndex(next)}
      appendDots={(dots) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            opacity: "50%",
          }}
        >
          <div
            className="csl-dots"
            style={{
              borderRadius: "10px",
              width: "auto",
              backgroundColor: "white",
              position: "inherit",
            }}
          >
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </div>
        </div>
      )}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          className={
            idx === imgIndex ? "csl-slide csl-activeSlide" : "csl-slide"
          }
        >
          <Image
            height={400}
            width={800}
            src={img}
            alt={`slide-${idx}`}
            className="h-48 object-cover"
          />
        </div>
      ))}
    </Slider>
  );
};
