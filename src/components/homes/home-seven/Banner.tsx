"use client";
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Banner = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  // Ensure pagination styles apply
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .swiper-pagination-bullet {
        width: 10px !important;
        height: 10px !important;
        background-color: #168e6a !important;
        opacity: 1 !important;
        transition: transform 0.3s ease-in-out;
      }
      .swiper-pagination-bullet-active {
        background-color: #168e6a !important;
        transform: scale(1.5) !important;
      }
    `;
    document.head.appendChild(styleTag);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200 relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={false}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          verticalClass: "swiper-pagination-vertical",
        }}
        modules={[Pagination]}
        direction="vertical"
        className="w-[80%] h-[80vh] swiper-container"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        style={{ height: "100vh" }}
      >
        <SwiperSlide className="relative flex justify-center items-center h-full">
          <div className="w-full h-full">
            <ReactPlayer
              url="/assets/video/video1.mp4"
              playing
              muted
              loop
              width="100%"
              height="100%"
              className="react-player"
              style={{ objectFit: "cover", maxHeight: "100%" }}
            />
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative flex justify-center items-center h-full">
          <div className="w-full h-full">
            <ReactPlayer
              url="/assets/video/video2.mp4"
              playing
              muted
              loop
              width="100%"
              height="100%"
              className="react-player"
              style={{ objectFit: "cover", maxHeight: "100%" }}
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Pagination Dots on the Right */}
      <div className="swiper-pagination swiper-pagination-vertical absolute right-5 top-1/2 transform -translate-y-1/2"></div>
    </div>
  );
};

export default Banner;
