"use client";

import Slider from "react-slick";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import { Carousalimages } from "@/constants/homePageData";

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
  const [imgIndex, setImgIndex] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <Slider
      // remove dots if screen size is mobile
      dots={width > 768}
      autoplay={true}
      autoplaySpeed={5000}
      // no of slides
      slidesToShow={width < 768 ? 1 : 3}
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
              scale: "110%",
              borderRadius: "15px",
              width: "auto",
              backgroundColor: "gray",
              position: "inherit",
            }}
          >
            <ul className={`m-2 flex`}> {dots} </ul>
          </div>
        </div>
      )}
      className="h-96"
    >
      {Carousalimages.map((img, idx) => (
        <div
          key={idx}
          className={
            idx === imgIndex ? "csl-slide csl-activeSlide" : "csl-slide"
          }
        >
          <Image
            height={1024}
            width={1024}
            src={img}
            alt={`slide-${idx}`}
            className="h-60 object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
    </Slider>
  );
};
