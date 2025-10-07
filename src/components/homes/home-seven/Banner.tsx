"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import HeaderSeven from "@/layouts/headers/HeaderSeven";

interface Banner {
  id: number;
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink?: string | null;
  youtubeUrl: string; // full URL or raw ID
}

/** Robust YouTube ID extractor (watch, youtu.be, embed, shorts, raw ID) */
function getYouTubeId(input?: string | null): string | null {
  if (!input) return null;
  const raw = input.trim();

  // Already an ID?
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  try {
    const url = new URL(raw);
    if (!/(\.|^)youtube\.com$|(\.|^)youtu\.be$/.test(url.hostname)) return null;

    // watch?v=VIDEOID
    const v = url.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;

    // /shorts/VIDEOID, /embed/VIDEOID, /v/VIDEOID, /VIDEOID
    const parts = url.pathname.split("/").filter(Boolean).reverse();
    for (const seg of parts) {
      if (/^[a-zA-Z0-9_-]{11}$/.test(seg)) return seg;
    }
    return null;
  } catch {
    return null;
  }
}

const AUTOPLAY_MS = 7000;

const BannerSlider: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    fetch("/api/banner-videos")
      .then((r) => r.json())
      .then((data) => setBanners(Array.isArray(data) ? data : []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  /** Only keep items with valid video IDs */
  const slides = useMemo(
    () =>
      (banners || [])
        .map((b) => ({ ...b, videoId: getYouTubeId(b.youtubeUrl) }))
        .filter((b) => !!b.videoId),
    [banners]
  );

  const count = slides.length;

  /** autoplay */
  useEffect(() => {
    if (count <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) {
        setIndex((i) => (i + 1) % count);
      }
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count]);

  const goto = (i: number) => {
    if (count === 0) return;
    setIndex((i + count) % count);
  };

  const next = () => goto(index + 1);
  const prev = () => goto(index - 1);

  return (
    <>
      <HeaderSeven />
      <section
        className="hero-section banner-3d"
        style={{
          backgroundImage:
            "linear-gradient(120deg,rgba(80,40,10,0.82),rgba(80,40,10,0.62)), url('/assets/img/banner/main.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          overflow: "hidden",
          position: "relative",
          color: "#fff",
        }}
      >
        <div className="banner-3d-cut" />

        <div
          style={{
            width: "100%",
            maxWidth: 1600,
            margin: "0 auto",
            borderRadius: 32,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(80,40,10,0.18)",
            position: "relative",
            zIndex: 2,
          }}
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          {loading ? (
            <div style={{ padding: 40, textAlign: "center" }}>Loading banners…</div>
          ) : count === 0 ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              No playable YouTube videos. Please check your URLs/IDs.
            </div>
          ) : (
            <div className="simple-slider">
              {/* Slides */}
              <div className="slides-viewport">
                {slides.map((banner, i) => (
                  <article
                    key={banner.id}
                    className={`slide ${i === index ? "is-active" : "is-inactive"}`}
                    aria-hidden={i === index ? "false" : "true"}
                  >
                    <div className="hero-content-row">
                      {/* LEFT: TEXT */}
                      <div className="hero-left">
                        <h1 className="hero-title">{banner.heading}</h1>
                        <p className="hero-sub">{banner.subheading}</p>
                        <Link href={banner.buttonLink || "/register"} className="hero-cta">
                          {banner.buttonText || "Get Started Now →"}
                        </Link>
                      </div>

                      {/* RIGHT: VIDEO */}
                      <div className="hero-right">
                        <div className="youtube-wrapper">
                          <iframe
                            className="yt-iframe"
                            src={`https://www.youtube.com/embed/${banner.videoId}?autoplay=0&controls=1&modestbranding=1&rel=0&iv_load_policy=3`}
                            title={banner.heading || "Banner video"}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Controls */}
              {count > 1 && (
                <>
                  <button className="nav-btn prev" onClick={prev} aria-label="Previous slide">
                    ‹
                  </button>
                  <button className="nav-btn next" onClick={next} aria-label="Next slide">
                    ›
                  </button>

                  <div className="dots">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        className={`dot ${i === index ? "active" : ""}`}
                        onClick={() => goto(i)}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Styles */}
        <style jsx global>{`
          /* Layout skeleton from your original styles */
          .hero-content-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            min-height: 50vh;
          }
          .hero-left {
            flex: 1;
            color: #fff;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
            padding: 24px 20px 24px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .hero-title {
            color: #fff !important;
            font-weight: 800;
            font-size: 32px;
            line-height: 1.1;
            margin: 0 0 12px 0;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          }
          .hero-sub {
            color: #fff !important;
            font-size: 18px;
            margin: 0 0 20px 0;
            opacity: 0.95;
            text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          }
          .hero-cta {
            display: inline-block;
            background: #f9a116;
            color: #fff !important;
            border-radius: 30px;
            padding: 12px 28px;
            font-weight: 700;
            font-size: 18px;
            text-decoration: none;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
            margin-top: 10px;
            width: fit-content;
            max-width: 100%;
            white-space: nowrap;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
          }
          .hero-cta:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(249, 161, 22, 0.35);
          }
          .hero-right {
            flex: 1.2;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 320px;
            padding: 12px 24px 24px 12px;
          }
          .youtube-wrapper {
            position: relative;
            width: 100%;
            max-width: 900px;
            aspect-ratio: 16 / 9;
            background: #000;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 0 32px rgba(168, 107, 46, 0.2);
          }
          .youtube-wrapper .yt-iframe {
            width: 100%;
            height: 100%;
            border: 0;
            border-radius: 24px;
            display: block;
          }

          /* Stack on tablets/phones */
          @media (max-width: 991px) {
            .hero-content-row {
              flex-direction: column;
              text-align: center;
              min-height: 60vh;
            }
            .hero-left {
              padding: 16px;
              align-items: center;
            }
            .hero-title {
              font-size: 22px;
            }
            .hero-sub {
              font-size: 15px;
            }
            .hero-right {
              width: 100%;
              padding: 0 12px 20px;
            }
          }

          /* Simple slider core */
          .simple-slider {
            position: relative;
            width: 100%;
            height: 100%;
            background: transparent;
          }
          .slides-viewport {
            position: relative;
            width: 100%;
            height: 100%;
          }
          .slide {
            position: absolute;
            inset: 0;
            opacity: 0;
            transform: translateX(5%);
            transition: opacity 400ms ease, transform 400ms ease;
            padding: 24px 20px;
          }
          .slide.is-active {
            opacity: 1;
            transform: translateX(0);
            position: relative;
          }

          .nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: none;
            background: rgba(0, 0, 0, 0.35);
            color: #fff;
            font-size: 28px;
            line-height: 1;
            cursor: pointer;
            z-index: 5;
          }
          .nav-btn:hover {
            background: rgba(0, 0, 0, 0.5);
          }
          .nav-btn.prev {
            left: 12px;
          }
          .nav-btn.next {
            right: 12px;
          }

          .dots {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 14px;
            display: flex;
            gap: 8px;
            justify-content: center;
            z-index: 5;
          }
          .dot {
            width: 10px;
            height: 10px;
            border-radius: 999px;
            border: 0;
            background: rgba(255, 255, 255, 0.45);
            cursor: pointer;
          }
          .dot.active {
            background: #f9a116;
          }
        `}</style>

        {/* Decorative diagonal overlay (kept) */}
        <style jsx>{`
          .banner-3d-cut {
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            background: linear-gradient(
              120deg,
              rgba(255, 214, 0, 0.12) 60%,
              rgba(80, 40, 10, 0.18) 100%
            );
            clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
            box-shadow: 0 24px 64px rgba(80, 40, 10, 0.18);
            animation: bannerCutAnim 2.5s cubic-bezier(0.77, 0.2, 0.22, 1) forwards;
            opacity: 0.95;
          }
          @keyframes bannerCutAnim {
            0% {
              clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            }
            100% {
              clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default BannerSlider;
