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
        background: "transparent",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="text-center mb-5">
          <h1
            className="title bold"
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "#0d447a",
              marginBottom: "1rem",
              letterSpacing: "0.02em",
            }}
          >
            Latest YouTube Videos
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#666",
              marginBottom: "0",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Discover our newest educational content and tutorials
          </p>
        </div>

        <div className="row g-4">
          {videos.map((video, index) => (
            <div key={video.videoId} className="col-lg-3 col-md-6 col-sm-6">
              <Link
                href="/latest-videos"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="video-card"
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: `2px solid ${
                      index % 4 === 0
                        ? "#0d447a"
                        : index % 4 === 1
                        ? "#5dba47"
                        : index % 4 === 2
                        ? "#1976d2"
                        : "#4a9c38"
                    }`,
                    boxShadow: `0 4px 15px ${
                      index % 4 === 0
                        ? "rgba(13,68,122,0.15)"
                        : index % 4 === 1
                        ? "rgba(93,186,71,0.15)"
                        : index % 4 === 2
                        ? "rgba(25,118,210,0.15)"
                        : "rgba(74,156,56,0.15)"
                    }`,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-6px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 30px ${
                      index % 4 === 0
                        ? "rgba(13,68,122,0.25)"
                        : index % 4 === 1
                        ? "rgba(93,186,71,0.25)"
                        : index % 4 === 2
                        ? "rgba(25,118,210,0.25)"
                        : "rgba(74,156,56,0.25)"
                    }`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 15px ${
                      index % 4 === 0
                        ? "rgba(13,68,122,0.15)"
                        : index % 4 === 1
                        ? "rgba(93,186,71,0.15)"
                        : index % 4 === 2
                        ? "rgba(25,118,210,0.15)"
                        : "rgba(74,156,56,0.15)"
                    }`;
                  }}
                >
                  {/* Video Thumbnail */}
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      aspectRatio: "16/9",
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                    />

                    {/* Play button overlay */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: `${
                          index % 4 === 0
                            ? "#0d447a"
                            : index % 4 === 1
                            ? "#5dba47"
                            : index % 4 === 2
                            ? "#1976d2"
                            : "#4a9c38"
                        }cc`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8 5v14l11-7z"
                          fill="#fff"
                        />
                      </svg>
                    </div>

                    {/* Brand color accent */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        height: "4px",
                        background:
                          index % 4 === 0
                            ? "linear-gradient(90deg, #0d447a 0%, #1976d2 100%)"
                            : index % 4 === 1
                            ? "linear-gradient(90deg, #5dba47 0%, #6bc755 100%)"
                            : index % 4 === 2
                            ? "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)"
                            : "linear-gradient(90deg, #4a9c38 0%, #66bb6a 100%)",
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div
                    style={{
                      padding: "20px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color:
                          index % 4 === 0
                            ? "#0d447a"
                            : index % 4 === 1
                            ? "#5dba47"
                            : index % 4 === 2
                            ? "#1976d2"
                            : "#4a9c38",
                        marginBottom: "8px",
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: 1,
                      }}
                    >
                      {video.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginBottom: "12px",
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {video.description}
                    </p>

                    {/* Watch now link */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color:
                          index % 4 === 0
                            ? "#0d447a"
                            : index % 4 === 1
                            ? "#5dba47"
                            : index % 4 === 2
                            ? "#1976d2"
                            : "#4a9c38",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        marginTop: "auto",
                      }}
                    >
                      <span>Watch now</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-5">
          <Link
            href="/latest-videos"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "linear-gradient(135deg, #5dba47 0%, #4a9c38 100%)",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "12px",
              padding: "14px 28px",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              border: "none",
              boxShadow: "0 6px 20px rgba(93,186,71,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "linear-gradient(135deg, #4a9c38 0%, #388e3c 100%)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 10px 30px rgba(93,186,71,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "linear-gradient(135deg, #5dba47 0%, #4a9c38 100%)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 6px 20px rgba(93,186,71,0.3)";
            }}
          >
            <span
              className="btn-shine"
              style={{
                position: "absolute",
                top: "0",
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transition: "left 0.5s ease",
                zIndex: 1,
              }}
            />
            <span 
              className="btn-text"
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >
              View All Videos
            </span>
            <span 
              className="btn-arrow"
              style={{
                position: "relative",
                zIndex: 2,
                fontSize: "14px",
                transition: "transform 0.3s ease",
                background: "rgba(255,255,255,0.2)",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              &#8594;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
