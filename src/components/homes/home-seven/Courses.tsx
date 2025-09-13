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
    AOS.init({ duration: 700, once: true, easing: "ease" });
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/latest-videos");
        const data = await res.json();

        if (Array.isArray(data)) setVideos(data);
        else if (Array.isArray(data.data)) setVideos(data.data);
        else {
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
    dots: false,
    infinite: videos.length > 4,
    arrows: true,
    speed: 500,
    slidesToShow: Math.min(4, videos.length || 4),
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: Math.min(3, videos.length) } },
      { breakpoint: 992, settings: { slidesToShow: Math.min(2, videos.length) } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
    cssEase: "cubic-bezier(.2,.9,.2,1)",
  };

  return (
    <section className="courses-area-six grey-bg-two py-5 mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center" data-aos="fade-up">
          <div className="col-xl-6 text-center mb-4">
            <span className="badge-highlight" aria-hidden="true">
              Exhaustive Library with 2000+ Videos
            </span>
            <h2 className="title bold">Latest Videos</h2>
          </div>
        </div>

        <div className="slider-wrap">
          <Slider {...sliderSettings}>
            {videos.map((video, index) => {
              const CardContent = (
                <article className="courses__item-eight card" data-id={video.id}>
                  <div className="thumb-wrap">
                    <Image
                      src={video.thumb}
                      alt={video.title}
                      width={800}
                      height={450}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                    <span className="tag">{video.tag}</span>

                    {video.youtubeUrl && (
                      <div className="play-button" aria-hidden="true">
                        <i className="fas fa-play"></i>
                      </div>
                    )}
                  </div>

                  <div className="content">
                    <h5 className="video-title">{video.title}</h5>

                    <div className="meta-row">
                      <div className="rating" aria-hidden="true">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fas fa-star" />
                        ))}
                      </div>
                      <span className="reviews">({video.review}) Reviews</span>
                    </div>

                    <div className="bottom-row">
                      <div className="left">
                        <i className="flaticon-book"></i>
                        <span>Lessons {video.lesson}</span>
                      </div>
                      <div className="right">
                        <i className="skillgro-group"></i>
                        <span>Students {video.student}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );

              return (
                <div
                  key={video.id}
                  className="slide-item"
                  data-aos="fade-up"
                  data-aos-delay={`${index * 80}`}
                >
                  {video.youtubeUrl ? (
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="card-link">
                      {CardContent}
                    </a>
                  ) : video.page ? (
                    <Link href={video.page} className="card-link">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        .badge-highlight {
          display: inline-block;
          background: #f9a116;
          padding: 6px 12px;
          border-radius: 15px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 16px;
        }

        .slider-wrap { margin-top: 18px; }

        .slide-item { padding: 0 10px; box-sizing: border-box; height: 100%; display: flex; align-items: stretch; }
        .card-link { text-decoration: none; color: inherit; display: block; height: 100%; }

        /* Card visual upgrade: subtle gradient, neon accent border, larger shadows, hover lift & image zoom */
        .card {
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow:
            0 6px 20px rgba(0,0,0,0.06),
            0 18px 40px rgba(35,9,8,0.04);
          transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms ease;
          cursor: pointer;
          border: 1px solid rgba(35,9,8,0.06);
          outline: 1px solid transparent;
          will-change: transform;
        }
        .card::after {
          /* thin gradient accent line at card bottom for visual separation */
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 6px;
          background: linear-gradient(90deg, rgba(249,161,22,0.9), rgba(86,36,208,0.85));
          transform: translateY(100%);
          transition: transform 320ms ease;
        }
        .card:hover {
          transform: translateY(-10px) scale(1.01);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.12),
            0 30px 90px rgba(86,36,208,0.06);
        }
        .card:hover::after { transform: translateY(0%); }

        .thumb-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 aspect */
          overflow: hidden;
          background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.03));
        }
        .thumb-wrap :global(img) {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          transition: transform 420ms cubic-bezier(.2,.9,.2,1), filter 420ms ease;
        }
        .card:hover .thumb-wrap :global(img) {
          transform: scale(1.06) translateY(-3px);
          filter: brightness(0.98) contrast(1.02);
        }

        .tag {
          position: absolute;
          left: 12px;
          top: 12px;
          background: rgba(35,9,8,0.9);
          color: #fff;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .play-button {
          position: absolute;
          right: 12px;
          bottom: 12px;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: rgba(249,161,22,0.98);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #230908;
          font-size: 16px;
          box-shadow: 0 8px 20px rgba(249,161,22,0.16);
          transform: translateY(8px);
          opacity: 0;
          transition: transform 260ms ease, opacity 260ms ease;
        }
        .card:hover .play-button { transform: translateY(0); opacity: 1; }

        .content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1 1 auto;
        }

        .video-title {
          font-size: 16px;
          margin: 0;
          color: #111827;
          line-height: 1.25;
          min-height: 44px;
          transition: color 200ms ease;
        }
        .card:hover .video-title { color: #0b1220; }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #777;
          font-size: 14px;
        }
        .rating i { color: #f9a116; margin-right: 4px; }
        .reviews { color: #999; }

        .bottom-row {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 6px;
          border-top: 1px solid rgba(0,0,0,0.04);
          color: #555;
          font-size: 14px;
        }
        .bottom-row .left, .bottom-row .right { display:flex; gap:8px; align-items:center; }
        .bottom-row i { color: #f9a116; }

        /* subtle floating animation for the visible slides to add life */
        @keyframes floatUp {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        .slide-item[data-aos][data-aos][data-aos-delay] .card {
          animation: floatUp 6s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        /* responsive adjustments */
        @media (max-width: 992px) {
          .slide-item { padding: 0 8px; }
          .video-title { font-size: 15px; min-height: 40px; }
        }
        @media (max-width: 576px) {
          .slide-item { padding: 0 6px; }
          .thumb-wrap { padding-top: 60%; }
          .content { padding: 12px; }
          .video-title { font-size: 14px; min-height: 36px; }
          .card::after { display: none; }
        }
      `}</style>
    </section>
  );
};

export default LatestVideos;
