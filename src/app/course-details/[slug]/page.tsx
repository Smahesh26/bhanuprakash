"use client";
import HeaderSeven from "@/layouts/headers/HeaderSeven";
import FooterTwo from "@/layouts/footers/FooterTwo";
import { useEffect, useState } from "react";

interface CourseDetailsPageProps {
  params: { slug: string };
}
interface MCQ {
  question: string;
  options: string[];
  description?: string;
}
interface Subtopic {
  title: string;
  youtubeUrl?: string;
  pdf?: string;
  caseStudy?: string;
  mcqs?: MCQ[];
}
interface Topic {
  topic: string;
  hasSubtopics?: boolean;
  subtopics?: Subtopic[];
  youtubeUrl?: string;
  pdf?: string;
  caseStudy?: string;
  mcqs?: MCQ[];
}
interface Chapter {
  chapter: string;
  topics: Topic[];
}

export default function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const [curriculum, setCurriculum] = useState<Chapter[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState({ chapter: 0, topic: 0, subtopic: 0 });

  useEffect(() => {
    fetch(`/api/curriculum/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
          setCurriculum(null);
        } else {
          setCurriculum(data.chapters || []);
          setError(null);
        }
      });
  }, [params.slug]);

  if (error) return <div style={{textAlign:'center',marginTop:40,color:'#e74c3c',fontWeight:600}}>No curriculum found.</div>;
  if (!curriculum) return <div style={{textAlign:'center',marginTop:40}}>Loading...</div>;

  const chapters = curriculum;
  const currentChapter = chapters[selected.chapter];
  const currentTopic = currentChapter.topics[selected.topic];
  const currentSubtopic = currentTopic.hasSubtopics && currentTopic.subtopics
    ? currentTopic.subtopics[selected.subtopic]
    : null;
  const content = currentSubtopic || currentTopic;

  // Find upcoming topics/chapters
  const upcoming = [];
  for (let ci = selected.chapter; ci < chapters.length; ci++) {
    const chap = chapters[ci];
    for (let ti = (ci === selected.chapter ? selected.topic + 1 : 0); ti < chap.topics.length; ti++) {
      upcoming.push({ chapter: chap.chapter, topic: chap.topics[ti].topic });
    }
  }

  // Color palette
  const palette = {
    primary: "#4F46E5",
    secondary: "#F59E42",
    bg: "#F8FAFC",
    card: "#fff",
    accent: "#E0E7FF",
    text: "#1E293B"
  };

  return (
    <div style={{ background: palette.bg, minHeight: "100vh" }}>
      <HeaderSeven />
      <div style={{
        display: "flex",
        maxWidth: 1400,
        margin: "0 auto",
        padding: "40px 0 32px 0",
        gap: 32
      }}>
        {/* Left: Chapters Accordion */}
        <aside style={{
          flex: 1,
          minWidth: 260,
          background: palette.card,
          borderRadius: 18,
          boxShadow: "0 4px 24px #4F46E511",
          padding: 28,
          height: "fit-content",
          transition: 'box-shadow 0.3s',
        }}>
          <h3 style={{ color: palette.primary, marginBottom: 18, fontWeight: 700, letterSpacing: 1 }}>Chapters</h3>
          {chapters.map((chap, ci) => (
            <div key={ci} style={{ marginBottom: 14 }}>
              <button
                style={{
                  fontWeight: ci === selected.chapter ? "bold" : "normal",
                  color: palette.text,
                  background: ci === selected.chapter ? palette.accent : "transparent",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 14px",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: 'background 0.2s',
                  boxShadow: ci === selected.chapter ? '0 2px 8px #4F46E522' : 'none'
                }}
                onClick={() => setSelected({ chapter: ci, topic: 0, subtopic: 0 })}
              >
                {chap.chapter}
              </button>
              {ci === selected.chapter && (
                <div style={{ marginLeft: 12, marginTop: 8 }}>
                  {chap.topics.map((topic, ti) => (
                    <div key={ti}>
                      <button
                        style={{
                          fontWeight: ti === selected.topic ? "bold" : "normal",
                          color: palette.text,
                          background: ti === selected.topic ? palette.secondary + "22" : "transparent",
                          border: "none",
                          borderRadius: 8,
                          padding: "7px 12px",
                          width: "100%",
                          textAlign: "left",
                          cursor: "pointer",
                          marginBottom: 2,
                          transition: 'background 0.2s',
                        }}
                        onClick={() => setSelected({ chapter: ci, topic: ti, subtopic: 0 })}
                      >
                        {topic.topic}
                      </button>
                      {ti === selected.topic && topic.hasSubtopics && topic.subtopics && (
                        <div style={{ marginLeft: 12, marginTop: 4 }}>
                          {topic.subtopics.map((sub, si) => (
                            <button
                              key={si}
                              style={{
                                fontWeight: si === selected.subtopic ? "bold" : "normal",
                                color: palette.text,
                                background: si === selected.subtopic ? palette.primary + "22" : "transparent",
                                border: "none",
                                borderRadius: 8,
                                padding: "6px 10px",
                                width: "100%",
                                textAlign: "left",
                                cursor: "pointer",
                                marginBottom: 2,
                                transition: 'background 0.2s',
                              }}
                              onClick={() => setSelected({ chapter: ci, topic: ti, subtopic: si })}
                            >
                              {sub.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Center: Video and Content */}
        <main style={{
          flex: 2.5,
          minWidth: 400,
          background: palette.card,
          borderRadius: 28,
          boxShadow: "0 6px 32px #4F46E522",
          padding: 36,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: 'relative',
        }}>
          {/* Video at the top */}
          <h2 style={{ color: palette.primary, marginBottom: 18, fontWeight: 700 }}>{(content as any).topic || (content as any).title}</h2>
          {content.youtubeUrl && (
            <div style={{
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 6px 32px #4F46E522",
              marginBottom: 28,
              width: "100%",
              maxWidth: 720,
              aspectRatio: '16/9',
              background: palette.accent
            }}>
              <iframe
                width="100%"
                height="400"
                src={content.youtubeUrl.replace("watch?v=", "embed/")}
                title={"title" in content ? content.title : content.topic}
                allowFullScreen
                style={{ border: "none", width: '100%', height: '100%' }}
              />
            </div>
          )}
          {/* Below video: PDF, MCQ, Case Study */}
          <div style={{ width: "100%", maxWidth: 720 }}>
            {content.pdf && (
              <div style={{ marginBottom: 14 }}>
                <a href={content.pdf} target="_blank" rel="noopener noreferrer" style={{ color: palette.primary, fontWeight: 600 }}>
                  📄 View PDF
                </a>
              </div>
            )}
            {content.caseStudy && (
              <div style={{ marginBottom: 14 }}>
                <a href={content.caseStudy} target="_blank" rel="noopener noreferrer" style={{ color: palette.secondary, fontWeight: 600 }}>
                  📝 View Case Study
                </a>
              </div>
            )}
            {content.mcqs && content.mcqs.length > 0 && (
              <div style={{ marginTop: 18 }}>
                <h4 style={{ color: palette.secondary, fontWeight: 700 }}>Quiz</h4>
                {content.mcqs.map((mcq, mi) => (
                  <div key={mi} style={{ marginBottom: 14 }}>
                    <p><b>Q{mi + 1}:</b> {mcq.question}</p>
                    <ul>
                      {mcq.options.map((opt, oi) => (
                        <li key={oi}>{opt}</li>
                      ))}
                    </ul>
                    <small>{mcq.description}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Upcoming at the bottom of video */}
          <div style={{
            marginTop: 36,
            width: "100%",
            maxWidth: 720,
            background: palette.accent,
            borderRadius: 14,
            padding: 18,
            boxShadow: '0 2px 12px #4F46E511'
          }}>
            <h4 style={{ color: palette.primary, fontWeight: 700 }}>Upcoming</h4>
            {upcoming.length === 0 && <div>No more topics</div>}
            {upcoming.slice(0, 5).map((up, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <b>{up.chapter}</b>: {up.topic}
              </div>
            ))}
          </div>
        </main>

        {/* Right: Empty or for extra info */}
        <aside style={{ flex: 0.5 }}></aside>
      </div>
      <FooterTwo />
    </div>
  );
}
