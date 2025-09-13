"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderSeven from "@/layouts/headers/HeaderSeven";

type Slide = {
  id?: string;
  title: string;
  subtitle?: string;
  video?: string;
  poster?: string;
  videoUrl?: string;
  posterUrl?: string;
};

const Banner = () => {
  const sliderRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  // settings depend on slides length to avoid Slick cloning a single slide
  const settings = {
    dots: false,
    arrows: false,
    infinite: slides.length > 1,
    speed: 420,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: slides.length > 1,
    autoplaySpeed: 7000,
    adaptiveHeight: false,
    pauseOnHover: true,
    lazyLoad: "ondemand" as const,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setActive(newIndex);
    },
    afterChange: (index: number) => {
      setActive(index);
    },
  };

  // find visible video element (handles slick clones) and assign src only to that element
  const updateVisibleVideo = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const vids = Array.from(container.querySelectorAll("video")) as HTMLVideoElement[];
    if (!vids.length) return;

    const containerRect = container.getBoundingClientRect();
    let visibleVideo: HTMLVideoElement | undefined;

    for (const v of vids) {
      const slideEl = v.closest(".slick-slide");
      if (!slideEl) continue;
      const rect = (slideEl as HTMLElement).getBoundingClientRect();
      const intersects = rect.left < containerRect.right && rect.right > containerRect.left;
      if (intersects) {
        visibleVideo = v;
        break;
      }
    }

    // fallback: find a video whose data-index matches active if present
    if (!visibleVideo) {
      visibleVideo = vids.find((v) => {
        const idxAttr = v.getAttribute("data-index");
        return idxAttr !== null && Number(idxAttr) === active;
      });
    }

    // remove src from all non-visible videos
    vids.forEach((v) => {
      if (v !== visibleVideo) {
        try { v.pause(); } catch {}
        if (v.src) {
          v.removeAttribute("src");
          v.load();
        }
        v.muted = true;
        v.controls = false;
        v.tabIndex = -1;
        v.setAttribute("aria-hidden", "true");
      }
    });

    // assign src to visible video only
    if (visibleVideo) {
      const ds = visibleVideo.getAttribute("data-src");
      if (ds && visibleVideo.src !== ds) {
        visibleVideo.src = ds;
        visibleVideo.load();
      }
      visibleVideo.muted = true;
      visibleVideo.controls = true;
      visibleVideo.tabIndex = 0;
      visibleVideo.setAttribute("aria-hidden", "false");
      visibleVideo.play().catch(() => {
        /* autoplay may be blocked; user can press play */
      });
    }
  }, [active]);

  useEffect(() => {
    // update on active change and on window resize/scroll (visible detection)
    updateVisibleVideo();
    const onResize = () => updateVisibleVideo();
    const onScroll = () => updateVisibleVideo();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [active, updateVisibleVideo]);

  // set data-src and data-index for every video element (includes clones) when slides change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!slides.length) {
      // clear any video attributes if no slides
      const vidsClear = Array.from(container.querySelectorAll("video")) as HTMLVideoElement[];
      vidsClear.forEach((v) => {
        v.removeAttribute("data-src");
        v.removeAttribute("data-index");
        try { v.pause(); } catch {}
      });
      return;
    }

    // allow DOM updates from slider to settle, then map each .slick-slide -> its video
    const t = setTimeout(() => {
      const slideEls = Array.from(container.querySelectorAll(".slick-slide")) as HTMLElement[];
      slideEls.forEach((slideEl) => {
        const vid = slideEl.querySelector("video") as HTMLVideoElement | null;
        if (!vid) return;
        // slick uses data-slick-index on each slide (clones use negative or > length values)
        const rawIdx = Number(slideEl.getAttribute("data-slick-index"));
        const idx = Number.isNaN(rawIdx) ? 0 : rawIdx;
        // normalize to [0..slides.length-1]
        const norm = ((idx % slides.length) + slides.length) % slides.length;
        const slide = slides[norm];
        const videoSrc = slide?.video || (slide as any)?.videoUrl || "";
        const poster = slide?.poster || (slide as any)?.posterUrl || "";
        if (videoSrc) vid.setAttribute("data-src", videoSrc);
        else vid.removeAttribute("data-src");
        vid.setAttribute("data-index", String(norm));
        vid.preload = "none";
        vid.playsInline = true;
        vid.muted = true;
        vid.controls = false;
        if (poster) vid.setAttribute("poster", poster);
        else vid.removeAttribute("poster");
      });

      // ensure visible video gets its src after slider initializes/clones
      setTimeout(() => updateVisibleVideo(), 140);
    }, 160);

    return () => {
      clearTimeout(t);
      const vids = Array.from(container.querySelectorAll("video")) as HTMLVideoElement[];
      vids.forEach((v) => { try { v.pause(); } catch {} });
    };
  }, [slides, updateVisibleVideo]);

  // fetch slides from API (no static fallback)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/instructor/banner");
        if (!mounted) return;
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        if (!Array.isArray(data)) {
          setSlides([]);
        } else {
          // normalize keys (support both video/videoUrl and poster/posterUrl)
          const normalized = data.map((d: any) => ({
            id: d.id,
            title: d.title,
            subtitle: d.subtitle,
            video: d.video || d.videoUrl || "",
            poster: d.poster || d.posterUrl || "",
          }));
          setSlides(normalized);
        }
      } catch {
        if (mounted) setSlides([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ensure slider re-inits when slides change (helps Slick handle clones correctly)
  useEffect(() => {
    // small delay for slider to mount before assigning sources
    const t = setTimeout(() => {
      sliderRef.current?.slickGoTo(0);
      updateVisibleVideo();
    }, 220);
    return () => clearTimeout(t);
  }, [slides, updateVisibleVideo]);

  // Parallax pointer handlers
  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x, y });
  }, []);
  const resetPointer = useCallback(() => setPointer({ x: 0, y: 0 }), []);

  // simple loading / empty UI
  if (loading) {
    return (
      <>
        <HeaderSeven />
        <section className="hero-section d-flex align-items-center" style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>Loading banners…</div>
        </section>
      </>
    );
  }

  if (!slides.length) {
    return (
      <>
        <HeaderSeven />
        <section className="hero-section d-flex align-items-center" style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div>No banners configured</div>
        </section>
      </>
    );
  }

  return (
    <>
      <HeaderSeven />
      <section
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={resetPointer}
        className="hero-section d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(35,9,8,0.75), rgba(35,9,8,0.6)), url('/assets/img/banner/main.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "65vh",
          overflow: "hidden",
          paddingTop: 24,
          paddingBottom: 24,
          borderRadius: 14,
          margin: "12px",
          position: "relative",
        }}
      >
        <div className="animated-gradient" aria-hidden="true" />

        <div className="container-fluid h-100 p-0">
          {/* render slider; key forces re-init when slides change */}
          <Slider key={slides.length} ref={(c) => { sliderRef.current = c; }} {...settings}>
            {slides.map((slide, i) => {
              const isActive = active === i;
              const textTransform = `translate(${pointer.x * (isActive ? 12 : 6)}px, ${pointer.y * (isActive ? 10 : 4)}px)`;
              const videoTransform = `scale(${isActive ? 1.02 : 1}) translate(${-pointer.x * (isActive ? 8 : 3)}px, ${-pointer.y * (isActive ? 6 : 2)}px)`;
              const poster = slide.poster || (slide as any).posterUrl || "";
              const videoSrc = slide.video || slide.videoUrl || "";
              const isYoutube = /(?:youtube\.com\/watch\?v=|youtu\.be\/)/i.test(videoSrc);
              const ytMatch = videoSrc.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_\-]{11})/);
              const embedUrl = ytMatch ? `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&playsinline=1` : "";

              return (
                <div key={slide.id ?? i} className={`h-100 slide-item ${isActive ? "active" : ""}`}>
                  <div className="row h-100 m-0 align-items-center">
                    <div className="col-lg-5 d-flex flex-column justify-content-center ps-5">
                      <div className="text-panel p-5" style={{ transform: textTransform }}>
                        <h1 className="fw-bold display-4 text-white" style={{ lineHeight: 1.05 }}>{slide.title}</h1>
                        <p className="lead my-3 text-white" style={{ opacity: 0.95 }}>{slide.subtitle}</p>
                        <Link href="/contact" className="btn arrow-btn fw-bold get-started" style={{ width: "fit-content", backgroundColor: "#f9a116", color: "#fff", borderRadius: "30px", padding: "10px 25px", textDecoration: "none" }}>
                          Get Started &nbsp; →
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-7 p-0 d-flex align-items-end h-100">
                      <div className="video-container w-100 px-4 pb-4">
                        <div className={`plyr-wrapper ${isActive ? "active" : ""}`} style={{ transform: videoTransform }}>
                          <div className="media-frame" data-index={i}>
                            {isYoutube ? (
                              <iframe
                                data-src={embedUrl}
                                src={isActive ? embedUrl : undefined}
                                title={slide.title || `youtube-${i}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="media-element"
                              />
                            ) : (
                              <video
                                data-src={videoSrc}
                                src={isActive ? videoSrc : undefined}
                                poster={poster}
                                playsInline
                                controls={isActive}
                                preload={isActive ? "metadata" : "none"}
                                crossOrigin="anonymous"
                                onError={(e) => { console.error("Video load error for slide", i, videoSrc, e); }}
                                className="media-element"
                                muted
                                aria-hidden={!isActive}
                                onFocus={(e) => { if (!isActive) (e.target as HTMLElement).blur(); }}
                              />
                            )}
                          </div>
                          {!isActive && (
                            <div className="play-overlay" aria-hidden="true"><div className="dot" /></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>

          <div className="custom-dots" aria-hidden="false">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`custom-dot ${active === idx ? "active" : ""}`}
                onClick={() => sliderRef.current?.slickGoTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          /* ensure slick doesn't stack slides vertically */
          .slick-slide { display: block !important; width: 100% !important; }
          .slick-slide > div { height: 100%; }
          .slick-list { overflow: hidden; }

          /* responsive media frame: use 16:9 on larger screens, taller on small screens */
          .media-frame { width: 100%; display: flex; align-items: center; justify-content: center; }
          .media-element { width: 100%; height: 100%; border-radius: 18px; display: block; background: #000; }

          /* container height control: on large screens constrain by aspect ratio and max width */
          .video-container { width: 100%; display: flex; justify-content: center; align-items: center; padding: 0 1rem 1rem 1rem; }
          .plyr-wrapper { width: 100%; max-width: 920px; }

          /* Use aspect-ratio to keep 16:9 frame on desktop/laptop */
          @media (min-width: 992px) {
            .plyr-wrapper { aspect-ratio: 16 / 9; height: auto; }
            .media-frame, .media-element { height: 100%; }
          }

          /* For medium screens use slightly taller portrait-friendly frame if needed */
          @media (min-width: 1200px) {
            .plyr-wrapper { max-width: 1100px; }
          }

          /* On small screens use a fixed height (mobile) */
          @media (max-width: 991px) {
            .plyr-wrapper { aspect-ratio: 3 / 2; height: auto; max-width: 100%; }
            .media-element { object-fit: cover; }
          }

          .animated-gradient { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(120deg, rgba(249,161,22,0.03), rgba(255,255,255,0.01)); mix-blend-mode: overlay; animation: slowShift 12s linear infinite; border-radius: 14px; }
          @keyframes slowShift { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
          .text-panel { background: rgba(255,255,255,0.02); border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.35); max-width: 520px; transform-origin: center; transition: transform 300ms ease, box-shadow 300ms ease, opacity 250ms ease; will-change: transform; padding: 28px; }
          .plyr-wrapper { border-radius: 18px; overflow: hidden; transition: box-shadow 400ms ease, transform 400ms ease; box-shadow: 0 8px 30px rgba(0,0,0,0.35); position: relative; will-change: transform; }
          .plyr-wrapper.active { box-shadow: 0 26px 60px rgba(0,0,0,0.6); }
          .play-overlay { position: absolute; inset: 0; display:flex; align-items:center; justify-content:center; background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.25)); transition:opacity 300ms ease; }
          .play-overlay .dot { width:56px; height:56px; background: rgba(249,161,22,0.95); border-radius:50%; box-shadow:0 8px 20px rgba(249,161,22,0.25); display:flex; align-items:center; justify-content:center; position:relative;}
          .play-overlay .dot::after { content:"▶"; color:#230908; font-weight:700; transform: translateX(2px); font-size:18px; }
          .video-container { width:100%; height: min(75vh,640px); display:flex; justify-content:center; align-items:flex-end; }
          .slide-item { min-height:65vh; display:flex; align-items:center; }
          .custom-dots { position:absolute; left:50%; transform:translateX(-50%); bottom:18px; display:flex; gap:10px; z-index:40; }
          .custom-dot { width:12px; height:12px; border-radius:50%; background:rgba(255,255,255,0.18); border:none; padding:0; cursor:pointer; transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease; box-shadow:0 4px 10px rgba(0,0,0,0.15); }
          .custom-dot.active { background:#f9a116; transform:scale(1.25); box-shadow:0 10px 24px rgba(249,161,22,0.18); }
          .get-started { display:inline-block; transition: transform 180ms ease, box-shadow 180ms ease; box-shadow: 0 8px 20px rgba(249,161,22,0.12); }
          .get-started:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(249,161,22,0.18); }
          @media (max-width: 992px) { .text-panel { margin:20px; max-width:100%; padding:28px; } .video-container { height:50vh; } }
          @media (max-width: 768px) { .hero-section { height:auto; flex-direction:column; padding-top:12px; padding-bottom:12px; } .video-container { height:40vh !important; padding:20px; } .text-panel { margin-top:12px; padding:18px; } .col-lg-5 { order:2; text-align:center; padding-left:24px; padding-right:24px; } .col-lg-7 { order:1; } .title { font-size:28px; } }
        `}</style>
      </section>
    </>
  );
};

export default Banner;
