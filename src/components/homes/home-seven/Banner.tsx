"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import YouTube from "react-youtube";
import HeaderSeven from "@/layouts/headers/HeaderSeven";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

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

const BannerSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/banner-videos")
      .then((r) => r.json())
      .then((data) => setBanners(Array.isArray(data) ? data : []))
      .catch(() => setBanners([]))
      .finally(() => setLoading(false));
  }, []);

  // Only keep items with valid video IDs
  const slides = useMemo(
    () =>
      (banners || [])
        .map((b) => ({ ...b, videoId: getYouTubeId(b.youtubeUrl) }))
        .filter((b) => !!b.videoId),
    [banners]
  );

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    adaptiveHeight: false,
  } as const;

  const ytOpts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
    },
  } as const;

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
          color: "#fff", // force white text
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
        >
          {loading ? (
            <div style={{ padding: 40, textAlign: "center" }}>Loading banners…</div>
          ) : slides.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              No playable YouTube videos. Please check your URLs/IDs.
            </div>
          ) : (
            <Slider key={`slider-${slides.length}`} {...settings}>
              {slides.map((banner) => (
                <div key={banner.id} className="hero-slide">
                  <div className="hero-content-row">
                    {/* LEFT: TEXT */}
                    <div className="hero-left">
                      <h1 className="hero-title">{banner.heading}</h1>
                      <p className="hero-sub">{banner.subheading}</p>
                      <Link
                        href={banner.buttonLink || "/register"}
                        className="hero-cta"
                      >
                        {banner.buttonText || "Get Started Now →"}
                      </Link>
                    </div>

                    {/* RIGHT: VIDEO */}
                    <div className="hero-right">
                      <div className="youtube-wrapper">
                        <YouTube
                          videoId={banner.videoId as string}
                          opts={ytOpts}
                          className="yt-iframe"
                          iframeClassName="yt-iframe"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* Layout + slick stability + always-white text */}
        <style jsx global>{`
          /* Keep slick stable with flex content */
          .slick-track {
            display: flex !important;
            align-items: stretch;
          }
          .slick-slide {
            height: auto !important;
          }
          .slick-slide > div {
            height: 100%;
          }

          /* Inner wrapper is the actual row */
          .hero-content-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            min-height: 50vh;
          }

          /* Two-column hero slide container */
          .hero-slide {
            display: block; /* wrapper handles flex */
            padding: 24px 20px;
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
            max-width: 900px; /* roomy on desktop */
            aspect-ratio: 16 / 9;
            background: #000;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 0 32px rgba(168, 107, 46, 0.2);
          }
          .youtube-wrapper iframe.yt-iframe {
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
        `}</style>

        {/* Decorative diagonal overlay */}
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
            animation: bannerCutAnim 2.5s cubic-bezier(0.77, 0.2, 0.22, 1)
              forwards;
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
