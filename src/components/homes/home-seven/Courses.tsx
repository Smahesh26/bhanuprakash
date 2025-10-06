"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface LatestVideo {
  id: string;
  title: string;
  tag: string;
  review: string;
  price: number;
  lesson: string;
  student: number;
  thumb: string;
  page?: string;
  youtubeUrl?: string;
}

const LatestVideos = () => {
  const [videos, setVideos] = useState<LatestVideo[]>([]);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/latest-videos");
        const data = await res.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else if (Array.isArray(data.data)) {
          setVideos(data.data);
        } else {
          console.warn("Unexpected response format", data);
          setVideos([]);
        }
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    };
    fetchVideos();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section
      className="courses-area-six py-5 mb-5"
      style={{
        background: "linear-gradient(120deg,#FFD600 70%,#230908 100%)",
        width: "100%",
        boxShadow: "0 8px 32px #23090822",
        position: "relative",
        overflow: "hidden",
        // Remove minHeight or set a smaller value if needed
        maxHeight: "650px", // or minHeight: "400px"
      }}
    >
      <style>{`
        .courses__item-eight {
          background: #fff;
          border-radius: 22px;
          box-shadow: 0 12px 48px #23090833, 0 2px 12px #FFD60044;
          transition: 
            transform 0.35s cubic-bezier(.21,.6,.36,1), 
            box-shadow 0.35s, 
            border-color 0.35s,
            filter 0.35s;
          overflow: hidden;
          position: relative;
          min-height: 340px;
          max-height: 340px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 2.5px solid #FFD600;
          transform-style: preserve-3d;
          perspective: 800px;
          filter: none;
        }
        .courses__item-eight:hover {
          transform: translateY(-18px) scale(1.07) rotateY(-8deg) rotateX(3deg);
          box-shadow: 0 32px 72px #23090855, 0 4px 24px #FFD60066;
          border-color: #230908;
          z-index: 3;
          filter: drop-shadow(0 0 24px #FFD60088) brightness(1.07);
        }
        .courses__item-eight::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          border-radius: 22px;
          background: linear-gradient(120deg,rgba(255,214,0,0.08) 60%,rgba(35,9,8,0.08) 100%);
          opacity: 0;
          transition: opacity 0.35s;
          z-index: 2;
        }
        .courses__item-eight:hover::before {
          opacity: 1;
        }
        .courses__item-thumb-seven {
          position: relative;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          box-shadow: 0 2px 12px #FFD60022;
          background: #FFD600;
        }
        .courses__item-tag-three {
          position: absolute;
          top: 14px;
          left: 14px;
          background: linear-gradient(90deg,#230908,#FFD600);
          color: #fff;
          padding: 5px 16px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 2px 8px #FFD60033;
          letter-spacing: 0.5px;
          border: 2px solid #23090844;
        }
        .courses__item-content-seven {
          padding: 22px 20px 18px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #fffbe6;
          border-radius: 0 0 22px 22px;
          box-shadow: 0 2px 8px #FFD60011;
        }
        .courses__review {
          margin: 10px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .courses__review .rating i {
          color: #FFD600;
          margin-right: 2px;
          text-shadow: 0 1px 2px #23090822;
        }
        .courses__item-bottom-three {
          margin-top: 14px;
          background: linear-gradient(90deg,#FFD60022,#23090811 80%);
          border-radius: 0 0 16px 16px;
          padding: 10px 0 0 0;
          display: flex;
          justify-content: space-between;
        }
        .courses__item-bottom-three span {
          background: #fff;
          padding: 5px 14px;
          border-radius: 8px;
          font-size: 14px;
          color: #230908;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          box-shadow: 0 1px 4px #FFD60011;
          border: 1.5px solid #FFD60044;
        }
        .play-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          background: linear-gradient(120deg,#FFD600 70%,#230908 100%);
          border-radius: 50%;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          box-shadow: 0 2px 12px #23090833;
          animation: pulse 1.2s infinite;
          border: 2px solid #23090844;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 #FFD60044; }
          70% { box-shadow: 0 0 0 12px #FFD60011; }
          100% { box-shadow: 0 0 0 0 #FFD60044; }
        }
        .play-overlay svg {
          color: #fff;
          font-size: 28px;
        }
        .title.bold {
          font-weight: 800;
          font-size: 2.1rem;
          margin-top: 10px;
          color: #230908;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 8px #FFD60022;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .courses__item-content-seven .title {
          font-weight: 700;
          font-size: 1.08rem;
          margin-bottom: 6px;
          color: #230908;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .courses__item-eight::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 38px;
          background: linear-gradient(90deg,#FFD600 0%,#230908 100%);
          opacity: 0.18;
          z-index: 1;
          pointer-events: none;
        }
        .courses__item-eight:hover::after {
          opacity: 0.28;
        }
        .courses-area-six {
          position: relative;
          z-index: 2;
        }
      `}</style>
      <div className="container">
        <div className="row justify-content-center" data-aos="fade-down">
          <div className="col-xl-6 text-center mb-4">
            <span
              className="btn arrow-btn"
              style={{
                background: "#230908",
                padding: "7px 22px",
                borderRadius: "15px",
                fontWeight: 700,
                color: "#FFF",
                marginBottom: "20px",
                fontSize: "18px",
                letterSpacing: "0.5px",
                boxShadow: "0 2px 12px #23090833",
                textShadow: "0 1px 4px #FFD60022",
                border: "2px solid #FFD60022",
              }}
            >
              Exhaustive Library with 2000+ Videos
            </span>
            <h2 className="title bold">
              Latest Videos
            </h2>
          </div>
        </div>

        <Slider {...sliderSettings}>
          {videos.map((video, index) => {
            const CardContent = (
              <div className="courses__item-eight" style={{ minHeight: "340px", maxHeight: "340px", overflow: "hidden" }} data-aos="zoom-in" data-aos-delay={`${index * 80}`}>
                <div className="courses__item-thumb-seven">
                  <Image
                    src={video.thumb}
                    alt="video"
                    width={300}
                    height={180}
                    style={{ width: "100%", height: "auto", borderRadius: "16px", boxShadow: "0 2px 12px #FFD60022" }}
                  />
                  <span className="courses__item-tag-three">{video.tag}</span>
                  {video.youtubeUrl && (
                    <span className="play-overlay">
                      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                        <circle cx="12" cy="12" r="12" fill="none"/>
                        <polygon points="10,8 16,12 10,16" fill="#fff"/>
                      </svg>
                    </span>
                  )}
                </div>
                <div className="courses__item-content-seven">
                  <h5 className="title">
                    {video.title}
                  </h5>
                  <div className="courses__review">
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span style={{ fontWeight: 500, color: "#230908", fontSize: "13px" }}>
                      ({video.review}) Reviews
                    </span>
                  </div>
                  <div
                    className="courses__item-bottom-three courses__item-bottom-five"
                  >
                    <span>
                      <i className="flaticon-book"></i> Lessons {video.lesson}
                    </span>
                    <span>
                      <i className="skillgro-group"></i> Students {video.student}
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <div key={video.id} className="px-3" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                <Link
                  href="/latest-videos"
                  style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                >
                  {CardContent}
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
     
    </section>
 
  );
};

export default LatestVideos;
