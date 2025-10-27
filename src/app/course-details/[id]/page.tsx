"use client";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Defer the heavy header for faster first paint on mobile
const HeaderSeven = dynamic(() => import("@/layouts/headers/HeaderSeven"), {
  ssr: false,
});

const BRAND = {
  main: "#fec107",      // gold
  secondary: "#230908", // rich espresso (brown)
  bg: "#faf7f0",        // warm paper
  card: "#ffffff",
  ink: "#1a1a1a",
  subtle: "#8a7f73",
  line: "#ece6dd",
  glow: "0 10px 30px rgba(254, 193, 7, 0.18)",
  softShadow: "0 10px 24px rgba(0,0,0,0.06)",
};

const BASE_SIDEBAR_WIDTH = 340;

type TabKey = "pdf" | "mcq" | "case";

const CourseDetailsPage = () => {
  const params = useParams();
  const id = params ? (params["id"] as string) : undefined;

  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1440);
  const [curriculum, setCurriculum] = useState<any>(null);
  const [selected, setSelected] = useState({ chapter: 0, topic: 0, subtopic: 0 });
  const [tab, setTab] = useState<TabKey>("pdf");
  const [success, setSuccess] = useState(false);
  const [mcqAnswers, setMcqAnswers] = useState<{ [key: number]: number | null }>({});
  const [mcqFeedback, setMcqFeedback] = useState<{ [key: number]: string }>({});
  const [openChapters, setOpenChapters] = useState<{ [key: number]: boolean }>({});
  const [openTopics, setOpenTopics] = useState<{ [key: string]: boolean }>({});
  const [showNav, setShowNav] = useState(false); // mobile drawer
  const [mountRight, setMountRight] = useState(false); // defer upcoming lessons

  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1100;
  const SIDEBAR_WIDTH = isMobile ? Math.min(vw - 40, 360) : BASE_SIDEBAR_WIDTH;

  // Resize listener (debounced)
  useEffect(() => {
    let t: any;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => setVw(window.innerWidth), 100);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Fetch with abort (faster route transitions + no state set after unmount)
  useEffect(() => {
    if (!id) return;
    const ctrl = new AbortController();
    fetch(`/api/course-details/${id}`, { signal: ctrl.signal })
      .then((res) => res.json())
      .then((data) => {
        // Fix: Parse chapters if they come as JSON string from database
        if (data && typeof data.chapters === 'string') {
          try {
            data.chapters = JSON.parse(data.chapters);
          } catch (parseError) {
            console.error('Failed to parse chapters:', parseError);
            data.chapters = [];
          }
        }
        // Ensure chapters is always an array
        if (data && !Array.isArray(data.chapters)) {
          data.chapters = [];
        }
        setCurriculum(data);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setCurriculum({});
      });
    // mount right column after first paint
    const r = requestAnimationFrame(() => setMountRight(true));
    return () => {
      ctrl.abort();
      cancelAnimationFrame(r);
    };
  }, [id]);

  const toggleChapter = (ci: number) => {
    setOpenChapters((prev) => ({ ...prev, [ci]: !prev[ci] }));
  };
  const toggleTopic = (ci: number, ti: number) => {
    setOpenTopics((prev) => ({ ...prev, [`${ci}-${ti}`]: !prev[`${ci}-${ti}`] }));
  };

  const chapter = useMemo(
    () => curriculum?.chapters?.[selected.chapter] ?? {},
    [curriculum, selected.chapter]
  );
  const topic = useMemo(
    () => chapter?.topics?.[selected.topic] ?? {},
    [chapter, selected.topic]
  );
  const subtopic = useMemo(
    () => topic?.subtopics?.[selected.subtopic] ?? {},
    [topic, selected.subtopic]
  );

  // Lazy thumbnail overlay state (only for skeleton & button)
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // reset player ready when subtopic changes
    setPlayerReady(false);
  }, [subtopic?.youtubeUrl]);

  if (!curriculum) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          fontWeight: 600,
          color: BRAND.secondary,
        }}
      >
        Loading…
      </div>
    );
  }

  // Shared styles tuned for mobile (lighter shadows)
  const cardShadow = isMobile ? "0 6px 14px rgba(0,0,0,0.05)" : BRAND.softShadow;
  const glow = isMobile ? "0 6px 16px rgba(254,193,7,0.14)" : BRAND.glow;

  return (
    <>
      <HeaderSeven />

      {/* Sticky Title Bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background:
            "linear-gradient(180deg, rgba(254,193,7,0.10) 0%, rgba(254,193,7,0.03) 100%)",
          backdropFilter: "blur(6px)",
          boxShadow: glow,
          borderBottom: `1px solid ${BRAND.line}`,
          padding: isMobile ? "14px 16px" : "20px 32px 14px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {isMobile && (
          <button
            onClick={() => setShowNav(true)}
            aria-label="Open course content"
            style={{
              border: `1px solid ${BRAND.line}`,
              background: BRAND.card,
              borderRadius: 10,
              padding: "8px 10px",
              fontWeight: 800,
              boxShadow: cardShadow,
              marginRight: 6,
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: BRAND.main,
            boxShadow: glow,
          }}
        />
        <span
          style={{
            fontWeight: 900,
            color: BRAND.secondary,
            fontSize: isMobile ? 20 : 26,
            letterSpacing: "0.5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={curriculum.subject}
        >
          {curriculum.subject}
        </span>
      </div>

      {/* Layout: stacks on mobile (main -> right), tablet 2-col, desktop 3-col */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? `${SIDEBAR_WIDTH}px 1fr`
            : `${SIDEBAR_WIDTH}px 1fr ${SIDEBAR_WIDTH}px`,
          gap: isMobile ? 16 : 24,
          background: BRAND.bg,
          padding: isMobile ? "16px" : "24px 32px 40px",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        {/* LEFT: Sidebar (desktop/tablet visible) */}
        {!isMobile && (
          <NavSidebar
            SIDEBAR_WIDTH={SIDEBAR_WIDTH}
            curriculum={curriculum}
            selected={selected}
            setSelected={setSelected}
            openChapters={openChapters}
            openTopics={openTopics}
            toggleChapter={toggleChapter}
            toggleTopic={toggleTopic}
            cardShadow={cardShadow}
            glow={glow}
          />
        )}

        {/* CENTER: Main */}
        <main>
          {/* Player card */}
          <div
            style={{
              borderRadius: 16,
              border: `1px solid ${BRAND.line}`,
              background: BRAND.card,
              boxShadow: cardShadow,
              overflow: "hidden",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                aspectRatio: "16/9",
                background:
                  "radial-gradient(1200px 400px at 20% 0%, rgba(254,193,7,0.14), transparent), #111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {subtopic?.youtubeUrl ? (
                <>
                  {!playerReady && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        color: "#d0c7ba",
                        fontSize: 16,
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 999,
                          border: `2px solid ${BRAND.secondary}`,
                          display: "grid",
                          placeItems: "center",
                          boxShadow: cardShadow,
                        }}
                      >
                        ▸
                      </div>
                      <span style={{ marginTop: 10, color: "#d0c7ba" }}>Loading video…</span>
                    </div>
                  )}
                  <iframe
                    ref={playerRef}
                    src={subtopic.youtubeUrl.replace("watch?v=", "embed/")}
                    title="Course Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => setPlayerReady(true)}
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ width: "100%", height: "100%", border: 0 }}
                  />
                </>
              ) : (
                <div
                  style={{
                    color: "#d0c7ba",
                    fontSize: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <button
                    aria-label="No video available"
                    disabled
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 999,
                      border: `2px solid ${BRAND.secondary}`,
                      background: "transparent",
                      color: BRAND.card,
                      opacity: 0.55,
                      cursor: "not-allowed",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                    title="No video available"
                  >
                    ▸
                  </button>
                  No video available
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Resource tabs"
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            {[
              { key: "pdf", label: "PDF" },
              { key: "mcq", label: "MCQ" },
              { key: "case", label: "Case Study" },
            ].map((t) => {
              const active = tab === (t.key as TabKey);
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.key as TabKey)}
                  style={{
                    padding: isMobile ? "8px 14px" : "10px 16px",
                    borderRadius: 999,
                    border: `1px solid ${active ? BRAND.main : BRAND.line}`,
                    background: active ? BRAND.main : BRAND.card,
                    color: BRAND.secondary,
                    fontWeight: 800,
                    letterSpacing: 0.2,
                    cursor: "pointer",
                    boxShadow: active ? glow : "none",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div
            style={{
              background: BRAND.card,
              border: `1px solid ${BRAND.line}`,
              borderRadius: 16,
              padding: isMobile ? 14 : 20,
              boxShadow: cardShadow,
            }}
          >
            {/* PDF */}
            {tab === "pdf" &&
              (subtopic?.pdf ? (
                <div style={{ width: "100%" }}>
                  {/* PDF Viewer - Try multiple approaches */}
                  <div
                    style={{
                      width: "100%",
                      height: isMobile ? "500px" : "700px",
                      borderRadius: 12,
                      overflow: "hidden",
                      border: `1px solid ${BRAND.line}`,
                      boxShadow: cardShadow,
                      background: "#f8f9fa",
                      position: "relative",
                    }}
                  >
                    {/* Try direct iframe first */}
                    <iframe
                      src={subtopic.pdf}
                      title="Course PDF"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: 12,
                      }}
                      loading="lazy"
                      onError={(e) => {
                        console.error("PDF iframe load error:", e);
                        // Hide iframe and show alternative
                        const iframe = e.target as HTMLIFrameElement;
                        iframe.style.display = "none";
                        const fallback = iframe.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    
                    {/* Fallback: Use Google Docs viewer */}
                    <div
                      style={{
                        display: "none",
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                      }}
                    >
                      <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(subtopic.pdf)}&embedded=true`}
                        title="Course PDF (Google Viewer)"
                        style={{
                          width: "100%",
                          height: "100%",
                          border: "none",
                          borderRadius: 12,
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Direct download link */}
                  <div style={{ marginTop: 12, textAlign: "center" }}>
                    <a
                      href={subtopic.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        color: BRAND.secondary,
                        background: BRAND.main,
                        padding: "8px 16px",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontSize: 14,
                        fontWeight: 700,
                        boxShadow: glow,
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      📄 Open PDF in New Tab
                    </a>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: BRAND.subtle,
                    background: "linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)",
                    borderRadius: 12,
                    border: `1px dashed ${BRAND.line}`,
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: 16, opacity: 0.5 }}>📄</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>No PDF available</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>
                    PDF materials will appear here when available
                  </div>
                </div>
              ))}

            {/* MCQ */}
            {tab === "mcq" &&
              (subtopic?.mcqs?.length ? (
                <div style={{ marginTop: 4 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 20,
                      padding: "12px 16px",
                      background: "linear-gradient(135deg, rgba(67,160,71,0.1) 0%, rgba(67,160,71,0.05) 100%)",
                      border: "1px solid rgba(67,160,71,0.2)",
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "rgba(67,160,71,1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: 900,
                        color: "white",
                      }}
                    >
                      ❓
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: BRAND.secondary, fontSize: 16 }}>
                        Practice Questions ({subtopic.mcqs.length})
                      </div>
                      <div style={{ fontSize: 14, color: BRAND.subtle }}>
                        Test your understanding with these questions
                      </div>
                    </div>
                  </div>
                  
                  {subtopic.mcqs.map((mcq: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        padding: isMobile ? "16px 14px" : "20px 18px",
                        marginBottom: 16,
                        borderRadius: 16,
                        border: `1px solid ${BRAND.line}`,
                        background: "linear-gradient(135deg, #fffdfa 0%, #ffffff 100%)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 800,
                          color: BRAND.secondary,
                          marginBottom: 12,
                          lineHeight: 1.4,
                          fontSize: isMobile ? 15 : 16,
                        }}
                      >
                        <span
                          style={{
                            background: BRAND.main,
                            color: BRAND.secondary,
                            padding: "4px 8px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 900,
                            marginRight: 8,
                          }}
                        >
                          Q{idx + 1}
                        </span>
                        {mcq.question}
                      </div>
                      
                      {/* Options */}
                      <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
                        {mcq.options.map((opt: string, oi: number) => {
                          const chosen = mcqAnswers[idx];
                          const isChosen = chosen === oi;
                          const correct = oi === mcq.correctAnswerIndex;
                          const bg =
                            chosen == null
                              ? "#fff"
                              : isChosen
                              ? correct
                                ? "rgba(76,175,80,0.15)"
                                : "rgba(211,47,47,0.15)"
                              : "#fff";
                          const border =
                            chosen == null
                              ? BRAND.line
                              : isChosen
                              ? correct
                                ? "rgba(76,175,80,0.6)"
                                : "rgba(211,47,47,0.6)"
                              : BRAND.line;

                          return (
                            <label
                              key={oi}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                padding: isMobile ? "10px 12px" : "12px 14px",
                                borderRadius: 10,
                                border: `2px solid ${border}`,
                                background: bg,
                                cursor: chosen == null ? "pointer" : "default",
                                userSelect: "none",
                                transition: "all 0.2s ease",
                                fontWeight: isChosen ? 700 : 500,
                              }}
                              onMouseOver={(e) => {
                                if (chosen == null) {
                                  e.currentTarget.style.borderColor = BRAND.main;
                                  e.currentTarget.style.background = "rgba(254,193,7,0.05)";
                                }
                              }}
                              onMouseOut={(e) => {
                                if (chosen == null) {
                                  e.currentTarget.style.borderColor = BRAND.line;
                                  e.currentTarget.style.background = "#fff";
                                }
                              }}
                            >
                              <input
                                type="radio"
                                name={`mcq-${idx}`}
                                value={oi}
                                disabled={chosen != null}
                                checked={isChosen}
                                onChange={() => {
                                  setMcqAnswers({ ...mcqAnswers, [idx]: oi });
                                  setMcqFeedback({
                                    ...mcqFeedback,
                                    [idx]: correct ? "Correct! 🎉" : "Incorrect. Try again!",
                                  });
                                }}
                                style={{ marginRight: 12, transform: "scale(1.2)" }}
                              />
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: BRAND.main,
                                  marginRight: 8,
                                  minWidth: 20,
                                }}
                              >
                                {String.fromCharCode(65 + oi)}.
                              </span>
                              {opt}
                            </label>
                          );
                        })}
                      </div>

                      {/* Feedback */}
                      {mcqAnswers[idx] != null && (
                        <div
                          style={{
                            padding: "12px 16px",
                            borderRadius: 10,
                            background: mcqAnswers[idx] === mcq.correctAnswerIndex
                              ? "rgba(76,175,80,0.1)"
                              : "rgba(211,47,47,0.1)",
                            border: `1px solid ${mcqAnswers[idx] === mcq.correctAnswerIndex
                              ? "rgba(76,175,80,0.3)"
                              : "rgba(211,47,47,0.3)"
                            }`,
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 700,
                              color: mcqAnswers[idx] === mcq.correctAnswerIndex
                                ? "rgba(67,160,71,1)"
                                : "rgba(211,47,47,1)",
                              marginBottom: mcq.explanation ? 8 : 0,
                            }}
                          >
                            {mcqFeedback[idx]}
                          </div>
                          {mcq.explanation && (
                            <div
                              style={{
                                background: "rgba(254,193,7,0.15)",
                                padding: "10px 12px",
                                borderRadius: 8,
                                border: `1px dashed ${BRAND.main}`,
                                color: BRAND.secondary,
                                fontSize: 14,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong>💡 Explanation: </strong>
                              {mcq.explanation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: BRAND.subtle,
                    background: "linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)",
                    borderRadius: 12,
                    border: `1px dashed ${BRAND.line}`,
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: 16, opacity: 0.5 }}>❓</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>No practice questions available</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>
                    MCQs will appear here when available
                  </div>
                </div>
              ))}

            {/* Case Study */}
            {tab === "case" &&
              (subtopic?.caseStudy ? (
                <div style={{ width: "100%" }}>
                  {/* Case Study Viewer - Direct Display */}
                  <div
                    style={{
                      width: "100%",
                      height: isMobile ? "500px" : "700px",
                      borderRadius: 12,
                      overflow: "hidden",
                      border: `1px solid ${BRAND.line}`,
                      boxShadow: cardShadow,
                      background: "#f8f9fa",
                    }}
                  >
                    <iframe
                      src={subtopic.caseStudy}
                      title="Case Study"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: 12,
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: BRAND.subtle,
                    background: "linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)",
                    borderRadius: 12,
                    border: `1px dashed ${BRAND.line}`,
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: 16, opacity: 0.5 }}>📊</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>No case study available</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>
                    Case study materials will appear here when available
                  </div>
                </div>
              ))}
          </div>

          {/* Success toast */}
          {success && (
            <div
              role="status"
              style={{
                marginTop: 16,
                padding: "12px 14px",
                background: "rgba(76,175,80,0.12)",
                color: "rgba(46,125,50,1)",
                borderRadius: 12,
                fontWeight: 700,
                border: "1px solid rgba(76,175,80,0.35)",
                textAlign: "center",
              }}
            >
              Curriculum updated successfully!
            </div>
          )}
        </main>

        {/* RIGHT: Upcoming Lessons (tablet hidden; desktop visible). On mobile it appears below main automatically. */}
        {(mountRight && !isTablet && !isMobile) && (
          <UpcomingLessons
            SIDEBAR_WIDTH={SIDEBAR_WIDTH}
            curriculum={curriculum}
            selected={selected}
            setSelected={setSelected}
            cardShadow={cardShadow}
            glow={glow}
          />
        )}
      </div>

      {/* Mobile slide-in drawer for “Course Content” */}
      {isMobile && (
        <>
          <button
            onClick={() => setShowNav(true)}
            aria-label="Open course content"
            style={{
              position: "fixed",
              right: 16,
              bottom: 16,
              zIndex: 50,
              width: 52,
              height: 52,
              borderRadius: 999,
              border: `1px solid ${BRAND.line}`,
              background: BRAND.main,
              color: BRAND.secondary,
              fontWeight: 900,
              boxShadow: glow,
            }}
            title="Course Content"
          >
            📚
          </button>

          {showNav && (
            <div
              role="dialog"
              aria-modal="true"
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                zIndex: 60,
                display: "flex",
              }}
              onClick={() => setShowNav(false)}
            >
              <div
                style={{
                  width: SIDEBAR_WIDTH,
                  maxWidth: "86%",
                  height: "100%",
                  marginLeft: "auto",
                  background: BRAND.card,
                  borderLeft: `1px solid ${BRAND.line}`,
                  boxShadow: cardShadow,
                  transform: "translateX(0)",
                  animation: "slideIn .18s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <NavSidebar
                  SIDEBAR_WIDTH={SIDEBAR_WIDTH}
                  curriculum={curriculum}
                  selected={selected}
                  setSelected={(val) => {
                    setSelected(val);
                    setShowNav(false);
                  }}
                  openChapters={openChapters}
                  openTopics={openTopics}
                  toggleChapter={toggleChapter}
                  toggleTopic={toggleTopic}
                  cardShadow={cardShadow}
                  glow={glow}
                  compact
                />
              </div>
              <style jsx>{`
                @keyframes slideIn {
                  from {
                    transform: translateX(16px);
                    opacity: 0.6;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
              `}</style>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;

/* ---------------- Subcomponents ---------------- */

function NavSidebar({
  SIDEBAR_WIDTH,
  curriculum,
  selected,
  setSelected,
  openChapters,
  openTopics,
  toggleChapter,
  toggleTopic,
  cardShadow,
  glow,
  compact = false,
}: {
  SIDEBAR_WIDTH: number;
  curriculum: any;
  selected: { chapter: number; topic: number; subtopic: number };
  setSelected: (v: { chapter: number; topic: number; subtopic: number }) => void;
  openChapters: Record<number, boolean>;
  openTopics: Record<string, boolean>;
  toggleChapter: (ci: number) => void;
  toggleTopic: (ci: number, ti: number) => void;
  cardShadow: string;
  glow: string;
  compact?: boolean;
}) {
  // Fix: Safely get chapters array
  const chapters = Array.isArray(curriculum?.chapters) ? curriculum.chapters : [];

  return (
    <aside
      style={{
        width: SIDEBAR_WIDTH,
        background: BRAND.card,
        borderRadius: 18,
        boxShadow: cardShadow,
        padding: compact ? "20px 14px" : "28px 20px",
        border: `1px solid ${BRAND.line}`,
        position: "sticky",
        top: 86,
        height: "calc(100vh - 118px)",
        overflow: "auto",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          color: BRAND.secondary,
          fontSize: 16,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: 999,
            background: BRAND.main,
            boxShadow: glow,
            color: BRAND.secondary,
            fontSize: 14,
            fontWeight: 900,
          }}
        >
          📚
        </span>
        Course Content
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {chapters.map((ch: any, ci: number) => {
          const isChapterOpen = openChapters[ci] ?? false;
          const isActiveChapter = selected.chapter === ci;
          return (
            <li key={ci}>
              <div
                onClick={() => setSelected({ chapter: ci, topic: 0, subtopic: 0 })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 12px",
                  margin: "6px 0",
                  borderRadius: 12,
                  cursor: "pointer",
                  border: `1px solid ${isActiveChapter ? BRAND.main : BRAND.line}`,
                  background: isActiveChapter ? "rgba(254,193,7,0.10)" : BRAND.card,
                  boxShadow: isActiveChapter ? glow : "none",
                  transition: "all .2s ease",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: isActiveChapter ? BRAND.main : BRAND.secondary,
                    outline: `2px solid ${isActiveChapter ? BRAND.secondary : BRAND.main}`,
                  }}
                />
                <div style={{ fontWeight: 700, color: BRAND.secondary, fontSize: 15.5 }}>
                  {ch.chapter || `Chapter ${ci + 1}`}
                </div>
                <button
                  aria-label={isChapterOpen ? "Collapse chapter" : "Expand chapter"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleChapter(ci);
                  }}
                  style={{
                    marginLeft: "auto",
                    border: "none",
                    background: "transparent",
                    color: BRAND.secondary,
                    fontWeight: 700,
                    cursor: "pointer",
                    transform: isChapterOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform .2s ease",
                  }}
                >
                  ▸
                </button>
              </div>

              {/* Topics */}
              {isChapterOpen && (
                <ul style={{ listStyle: "none", paddingLeft: 8, marginTop: 6 }}>
                  {(ch.topics || []).map((tp: any, ti: number) => {
                    const key = `${ci}-${ti}`;
                    const isTopicOpen = openTopics[key] ?? false;
                    const isActiveTopic = isActiveChapter && selected.topic === ti;
                    return (
                      <li key={ti}>
                        <div
                          onClick={() => setSelected({ chapter: ci, topic: ti, subtopic: 0 })}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 10px",
                            margin: "6px 6px",
                            borderRadius: 10,
                            cursor: "pointer",
                            border: `1px dashed ${
                              isActiveTopic ? BRAND.main : "rgba(0,0,0,0.06)"
                            }`,
                            background: isActiveTopic ? "rgba(254,193,7,0.08)" : "#fff",
                            transition: "all .2s ease",
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 999,
                              background: isActiveTopic ? BRAND.secondary : BRAND.main,
                            }}
                          />
                          <div
                            style={{
                              fontWeight: 700,
                              color: isActiveTopic ? BRAND.secondary : BRAND.subtle,
                              fontSize: 14.5,
                            }}
                          >
                            {tp.topic || `Topic ${ti + 1}`}
                          </div>
                          <button
                            aria-label={isTopicOpen ? "Collapse topic" : "Expand topic"}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopic(ci, ti);
                            }}
                            style={{
                              marginLeft: "auto",
                              border: "none",
                              background: "transparent",
                              color: BRAND.secondary,
                              cursor: "pointer",
                              transform: isTopicOpen ? "rotate(90deg)" : "rotate(0deg)",
                              transition: "transform .2s ease",
                            }}
                          >
                            ▸
                          </button>
                        </div>

                        {/* Subtopics */}
                        {isTopicOpen && (
                          <ul style={{ listStyle: "none", paddingLeft: 14, marginTop: 2 }}>
                            {(tp.subtopics || []).map((sub: any, si: number) => {
                              const isActiveSub = isActiveTopic && selected.subtopic === si;
                              return (
                                <li
                                  key={si}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 10,
                                    padding: "8px 10px",
                                    margin: "4px 8px",
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    border: `1px solid ${isActiveSub ? BRAND.main : "transparent"}`,
                                    background: isActiveSub ? "#fff8e1" : "#fafafa",
                                    color: isActiveSub ? BRAND.secondary : BRAND.subtle,
                                    fontWeight: isActiveSub ? 700 : 500,
                                    transition: "all .15s ease",
                                  }}
                                  onClick={() => setSelected({ chapter: ci, topic: ti, subtopic: si })}
                                >
                                  <span>{sub.title || `Subtopic ${si + 1}`}</span>
                                  {sub.youtubeUrl && (
                                    <button
                                      aria-label="Play"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelected({ chapter: ci, topic: ti, subtopic: si });
                                      }}
                                      style={{
                                        marginLeft: "auto",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 26,
                                        height: 26,
                                        borderRadius: 999,
                                        border: `1px solid ${BRAND.secondary}`,
                                        background: BRAND.secondary,
                                        color: BRAND.card,
                                        fontWeight: 900,
                                        boxShadow: cardShadow,
                                        cursor: "pointer",
                                      }}
                                      title="Play"
                                    >
                                      ▸
                                    </button>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function UpcomingLessons({
  SIDEBAR_WIDTH,
  curriculum,
  selected,
  setSelected,
  cardShadow,
  glow,
}: {
  SIDEBAR_WIDTH: number;
  curriculum: any;
  selected: { chapter: number; topic: number; subtopic: number };
  setSelected: (v: { chapter: number; topic: number; subtopic: number }) => void;
  cardShadow: string;
  glow: string;
}) {
  // Fix: Safely get chapters array
  const chapters = Array.isArray(curriculum?.chapters) ? curriculum.chapters : [];

  return (
    <aside
      style={{
        width: SIDEBAR_WIDTH,
        background: BRAND.card,
        borderRadius: 18,
        boxShadow: cardShadow,
        padding: "28px 20px",
        border: `1px solid ${BRAND.line}`,
        position: "sticky",
        top: 86,
        height: "calc(100vh - 118px)",
        overflow: "auto",
      }}
    >
      <div
        style={{
          fontWeight: 800,
          color: BRAND.secondary,
          fontSize: 17,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: BRAND.secondary,
            color: BRAND.card,
            fontWeight: 900,
            boxShadow: cardShadow,
          }}
        >
          ⏭️
        </span>
        Upcoming Lessons
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {chapters.map((ch: any, ci: number) => (
          <li key={ci} style={{ marginBottom: 12 }}>
            <div
              style={{
                fontWeight: 800,
                color: BRAND.secondary,
                fontSize: 15.5,
                marginBottom: 6,
                borderLeft: `4px solid ${BRAND.main}`,
                paddingLeft: 10,
              }}
            >
              Chapter {ci + 1}: {ch.chapter}
            </div>
            <ul style={{ listStyle: "none", paddingLeft: 12 }}>
              {(ch.topics || []).map((tp: any, ti: number) => (
                <li key={ti} style={{ marginBottom: 6 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: BRAND.subtle,
                      fontSize: 14.5,
                      marginBottom: 4,
                    }}
                  >
                    Topic {ti + 1}: {tp.topic}
                  </div>
                  <ul style={{ listStyle: "none", paddingLeft: 10 }}>
                    {(tp.subtopics || []).map((sub: any, si: number) => {
                      const isNext =
                        ci === selected.chapter &&
                        ti === selected.topic &&
                        si === selected.subtopic + 1;

                      return (
                        <li
                          key={si}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "8px 10px",
                            marginBottom: 6,
                            borderRadius: 12,
                            border: `1px solid ${isNext ? BRAND.main : BRAND.line}`,
                            background: isNext ? "rgba(254,193,7,0.10)" : "#fcfbf9",
                            boxShadow: isNext ? glow : "none",
                            fontWeight: isNext ? 800 : 500,
                            color: isNext ? BRAND.secondary : BRAND.subtle,
                          }}
                        >
                          <span>
                            Subtopic {si + 1}: {sub.title}
                          </span>
                          {sub.youtubeUrl && (
                            <button
                              aria-label="Play"
                              onClick={() =>
                                setSelected({ chapter: ci, topic: ti, subtopic: si })
                              }
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 28,
                                height: 28,
                                borderRadius: 999,
                                border: `1px solid ${BRAND.secondary}`,
                                background: BRAND.secondary,
                                color: BRAND.card,
                                fontWeight: 900,
                                cursor: "pointer",
                                boxShadow: isNext ? glow : cardShadow,
                              }}
                              title="Play"
                            >
                              ▸
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
