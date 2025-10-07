"use client";
import { useEffect, useState } from "react";
import HeaderSeven from "@/layouts/headers/HeaderSeven";

interface YoutubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function LatestVideosPage() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);

  useEffect(() => {
    fetch("/api/youtube-videos")
      .then((r) => r.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  return (
    <>
      <HeaderSeven />
      <main>
        <section
          className="courses-area-six py-5 mb-5"
          style={{
            minHeight: "600px",
            width: "100%",
            background: "#fff8ec", // Brand background, no image
          }}
        >
          <div className="container">
            <h1
              className="title bold text-center mb-8"
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "#230908",
                textShadow: "0 2px 12px #f9a11655", // Brand color shadow
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
                  onClick={() => setSelectedVideo(video)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="courses__item-eight tilt-ready"
                    style={{
                      height: "100%",
                      background: "#fff",
                      borderRadius: "18px",
                      boxShadow: "0 4px 24px #f9a11633", // Brand color shadow
                      border: "1.5px solid #f9a11622", // Brand border
                      transition: "transform 0.18s, box-shadow 0.18s, border-color 0.18s",
                      width: "100%",
                      maxWidth: "340px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.03)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px #f9a11655";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#f9a116";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.transform = "";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px #f9a11633";
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#f9a11622";
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
                        <svg viewBox="0 0 24 24" fill="none" width="32" height="32" aria-hidden>
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
                </div>
              ))}
            </div>
            {/* Modal Popup */}
            {selectedVideo && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.6)",
                  zIndex: 9999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="popup-3d-modal animate-fadeIn"
                  style={{
                    position: "relative",
                    background: "#fff",
                    borderRadius: "24px",
                    padding: "2rem",
                    maxWidth: "640px",
                    width: "100%",
                    boxShadow: "0 8px 32px #f9a11633",
                  }}
                >
                  <button
                    className="absolute top-3 right-3"
                    onClick={() => setSelectedVideo(null)}
                    style={{
                      background: "#f9a116",
                      borderRadius: "50%",
                      width: "44px",
                      height: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      fontSize: "2rem",
                      color: "#fff",
                      boxShadow: "0 2px 12px #f9a11622",
                    }}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h2
                    className="text-2xl font-bold mb-4 text-[#230908] text-center"
                    style={{
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      marginBottom: "1.2rem",
                    }}
                  >
                    {selectedVideo.title}
                  </h2>
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                      overflow: "hidden",
                      borderRadius: "24px",
                      background: "#000",
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&controls=1`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "16px",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
