"use client";

import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "plyr-react/plyr.css";
import HeaderSeven from "@/layouts/headers/HeaderSeven";


const Banner = () => {
  const slides = [
    {
      title: "Gastric Cancer",
      subtitle: "Advance your career with hands-on courses and expert mentorship.",
      video: "/assets/video/video1.mp4",
    },
    {
      title: "Auditory Tube",
      subtitle: "Focused strategies and expert content to boost your rank.",
      video: "/assets/video/video2.mp4",
    },
    {
      title: "Learn Human Anatomy",
      subtitle: "Visualize complex topics with interactive videos and notes.",
      video: "/assets/video/video3.mp4",
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  return (
    <>
    <HeaderSeven />
    <section
      className="hero-section d-flex align-items-center"
      style={{
        backgroundImage: `url('/assets/img/banner/main.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        overflow: "hidden",
      }}
    >
      <div className="container-fluid h-100 p-0">
        <Slider {...settings}>
          {slides.map((slide, i) => (
            <div key={i} className="h-100">
              <div className="row h-100 m-0">
                {/* TEXT LEFT */}
                <div className="col-lg-5 d-flex flex-column justify-content-center ps-5">
                  <div className="glass-box p-4">
                    <h1 className="fw-bold display-4 text-white">{slide.title}</h1>
                    <p className="lead my-3 text-white">{slide.subtitle}</p>
                    <Link
                      href="/contact"
                      className="btn arrow-btn fw-bold"
                      style={{
                        width: "fit-content",
                        backgroundColor: "#f9a116",
                        color: "#fff",
                        borderRadius: "30px",
                        padding: "10px 25px",
                      }}
                    >
                      Get Started →
                    </Link>
                  </div>
                </div>

                {/* VIDEO RIGHT */}
                <div className="col-lg-7 p-0 d-flex align-items-end h-100">
                  <div className="video-container w-100 px-4 pb-4">
                    <div className="plyr-wrapper">
                      <Plyr
                        source={{
                          type: "video",
                          sources: [
                            {
                              src: slide.video,
                              type: "video/mp4",
                            },
                          ],
                        }}
                        options={{
                          autoplay: true,
                          muted: false,
                          loop: { active: true },
                          controls: [
                            "play",
                            "progress",
                            "current-time",
                            "mute",
                            "volume",
                            "settings",
                            "fullscreen",
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx>{`
  .glass-box {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }

  .plyr-wrapper {
    border-radius: 20px;
    overflow: hidden;
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.3); /* ✨ clean soft highlight */
  }

  .plyr-wrapper:hover {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.3); /* ✨ clean soft highlight */
  }

  .video-container {
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
      /* Customize slick dots */
  .slick-dots li button:before {
    font-size: 12px;
    color: #f9a116 !important; /* Yellow (your theme color) */
    opacity: 0.75;
  }

  .slick-dots li.slick-active button:before {
    color: #f9a116 !important; /* Active dot in yellow */
    opacity: 1;
  }

  @media (max-width: 768px) {
    .hero-section {
      height: auto;
      flex-direction: column;
    }

    .video-container {
      height: auto !important;
      padding: 20px;
    }

    .glass-box {
      margin-top: 20px;
    }

    .text-content {
      text-align: center;
    }
  }
`}</style>

    </section>
    </>
  );
};

export default Banner;
