"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface YoutubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function LatestVideosHome() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);

  useEffect(() => {
    fetch("/api/youtube-videos")
      .then((r) => r.json())
      .then((data) => setVideos(data.videos?.slice(0, 8) || []));
  }, []);

  return (
    <section
      className="courses-area-six py-5 mb-5"
      style={{
        width: "100%",
        background: "linear-gradient(120deg, #230908 10%, #fec107 100%)", // Use your homepage background
      }}
    >
      <div className="container">
        <h1
          className="title bold text-center mb-8"
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#230908",
            textShadow: "0 2px 12px #f9a11655",
            marginBottom: "2rem",
            letterSpacing: "0.02em",
          }}
        >
          Latest YouTube Videos
        </h1>
        <div className="row" style={{ gap: "32px 0" }}>
          {videos.map((video) => (
            <div
              key={video.videoId}
              className="col-lg-3 col-md-4 mb-5 d-flex"
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link
                href="/latest-videos"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <div
                  className="courses__item-eight tilt-ready"
                  style={{
                    height: "100%",
                    background: "#fff",
                    borderRadius: "18px",
                    boxShadow: "0 4px 24px #f9a11633",
                    border: "1.5px solid #f9a11622",
                    transition:
                      "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
                    width: "100%",
                    maxWidth: "340px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-4px) scale(1.03)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 8px 32px #f9a11655";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "#f9a116";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 24px #f9a11633";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "#f9a11622";
                  }}
                >
                  <div
                    className="courses__item-thumb-seven"
                    style={{
                      position: "relative",
                      borderRadius: "16px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "16px",
                        display: "block",
                        boxShadow: "0 2px 12px #f9a11622",
                      }}
                    />
                    <span
                      className="play-overlay"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "#f9a116cc",
                        borderRadius: "50%",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 12px #f9a11633",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        width="32"
                        height="32"
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="12" fill="#fff8ec" />
                        <polygon points="10,8 16,12 10,16" fill="#f9a116" />
                      </svg>
                    </span>
                  </div>
                  <div
                    className="courses__item-content-seven"
                    style={{
                      padding: "18px 16px 12px 16px",
                      minHeight: "110px",
                    }}
                  >
                    <h2
                      className="title"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: "#230908",
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {video.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#230908",
                        opacity: 0.85,
                        marginBottom: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {video.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
