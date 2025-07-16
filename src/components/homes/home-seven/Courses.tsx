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
  youtubeUrl?: string; // <-- Add this line
}

const LatestVideos = () => {
  const [videos, setVideos] = useState<LatestVideo[]>([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
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
    <section className="courses-area-six grey-bg-two py-5 mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center" data-aos="fade-up">
          <div className="col-xl-6 text-center mb-4">
            <span
              className="btn arrow-btn"
              style={{
                background: "#f9a116",
                padding: "6px 12px",
                borderRadius: "15px",
                fontWeight: 600,
                color: "#fff",
                marginBottom: "20px",
              }}
            >
              Exhaustive Library with 2000+ Videos
            </span>
            <h2 className="title bold">Latest Videos</h2>
          </div>
        </div>

        {/* ✅ SLIDER WITH SPACING */}
        <Slider {...sliderSettings}>
          {videos.map((video, index) => {
            const CardContent = (
              <div className="courses__item-eight" style={{ height: "100%" }}>
                <div className="courses__item-thumb-seven">
                  <Image
                    src={video.thumb}
                    alt="video"
                    width={300}
                    height={180}
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                  />
                  <span className="courses__item-tag-three">{video.tag}</span>
                </div>
                <div className="courses__item-content-seven">
                  <h5 className="title">{video.title}</h5>
                  <div className="courses__review">
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span>({video.review}) Reviews</span>
                  </div>
                  <div
                    className="courses__item-bottom-three courses__item-bottom-five"
                    style={{ marginTop: "10px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "14px",
                        color: "#555",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className="flaticon-book"></i> Lessons {video.lesson}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <i className="skillgro-group"></i> Students {video.student}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <div key={video.id} className="px-3" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                {video.youtubeUrl ? (
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
                  >
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default LatestVideos;
