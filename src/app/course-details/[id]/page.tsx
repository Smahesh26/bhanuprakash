"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Accordion } from 'react-bootstrap';
import { FaArrowLeft, FaBookOpen, FaFilePdf, FaQuestionCircle, FaLock } from 'react-icons/fa';
import HeaderSeven from "@/layouts/headers/HeaderSeven";
import dynamic from "next/dynamic";

// Dynamically import PDF components with no SSR
const PDFViewer = dynamic(
  () => import("./PDFViewerComponent"),
  {
    ssr: false,
    loading: () => <div>Loading PDF viewer...</div>,
  }
);

interface CourseData {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface Chapter {
  title: string;
  topics: Topic[];
}

interface Topic {
  title: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  title: string;
  videoUrl?: string;
  pdfUrl?: string;
  pdfAccess?: 'VIEW' | 'DOWNLOAD' | 'PAID';
  caseStudyUrl?: string;
  caseAccess?: 'VIEW' | 'DOWNLOAD' | 'PAID';
  mcqs?: MCQ[];
}

interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
}

const CourseDetailsPage = () => {
  const params = useParams();
  const id = params?.id as string;
  
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<{ chapter: number; topic: number; subtopic: number }>({ 
    chapter: 0, 
    topic: 0, 
    subtopic: 0 
  });
  const [tab, setTab] = useState<'pdf' | 'case' | 'mcq'>('pdf');
  const [mcqAnswers, setMcqAnswers] = useState<{ [idx: number]: number | null }>({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/course-details/get-course-details?id=${id}`);
        
        if (res.ok) {
          const data = await res.json();
          setCourseData(data);
        } else {
          console.error("Failed to fetch course data");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const getSelectedSubtopic = (): Subtopic | null => {
    const chapter = courseData?.chapters?.[selected.chapter];
    const topic = chapter?.topics?.[selected.topic];
    return topic?.subtopics?.[selected.subtopic] || null;
  };

  const extractVideoId = (url: string): string | null => {
    try {
      return new URL(url).searchParams.get('v');
    } catch {
      return null;
    }
  };

  const selectedSub = getSelectedSubtopic();
  const videoId = selectedSub?.videoUrl ? extractVideoId(selectedSub.videoUrl) : null;

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(120deg,#5624d0 0%,#f7b32b 100%)', 
        fontFamily: 'Georgia,serif', 
        color: '#fff' 
      }}>
        <div style={{
          width: 100, 
          height: 100, 
          borderRadius: '50%', 
          background: 'rgba(86,36,208,0.18)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: 24, 
          boxShadow: '0 0 32px #5624d088', 
          border: '4px double #5624d0', 
          borderTop: '8px solid #f7b32b', 
          fontSize: 60
        }}>
          <FaBookOpen color="#f7b32b" />
        </div>
        <p style={{ 
          fontWeight: 700, 
          fontSize: 24, 
          letterSpacing: 1, 
          fontFamily: 'Georgia,serif', 
          textShadow: '0 2px 8px #5624d0' 
        }}>
          Loading course details...
        </p>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div style={{ 
        padding: 40, 
        textAlign: 'center', 
        color: '#5624d0', 
        fontSize: 20 
      }}>
        <FaBookOpen size={40} color="#5624d0" style={{ marginBottom: 8 }} />
        <div>Course not available</div>
      </div>
    );
  }

  const renderPdfSection = () => {
    if (!selectedSub?.pdfUrl) {
      return (
        <div style={{ 
          color: '#bbb', 
          fontSize: 18, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 8 
        }}>
          <FaFilePdf size={32} color="#f7b32b" />
          No PDF available
        </div>
      );
    }

    if (selectedSub.pdfAccess === 'PAID') {
      return (
        <div style={{ 
          minHeight: 800, 
          background: 'linear-gradient(135deg,#5624d0 60%,#f7b32b 100%)', 
          borderRadius: 22, 
          padding: 40, 
          textAlign: 'center', 
          fontSize: 22, 
          margin: '40px 0', 
          boxShadow: '0 8px 32px #5624d088', 
          border: '4px double #fff8e1', 
          fontFamily: 'Georgia,serif', 
          letterSpacing: 1, 
          position: 'relative' 
        }}>
          <FaLock size={60} color="#fff8e1" style={{ marginBottom: 8 }} />
          <div style={{ 
            fontWeight: 900, 
            color: '#fff8e1', 
            fontSize: 28 
          }}>
            This PDF is <span style={{ color: '#f7b32b' }}>PAID</span>
          </div>
          <div style={{ 
            fontWeight: 600, 
            fontSize: 18, 
            marginTop: 8 
          }}>
            Please purchase to access.
          </div>
        </div>
      );
    }

    if (selectedSub.pdfAccess === 'VIEW') {
      return (
        <div style={{ 
          background: 'linear-gradient(120deg,#f7b32b 0%,#fff 100%)', 
          borderRadius: 18, 
          boxShadow: '0 8px 32px #5624d088', 
          padding: 32, 
          margin: '32px 0', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          border: '3px double #5624d0', 
          fontFamily: 'Georgia,serif', 
          letterSpacing: 1 
        }}>
          <div style={{ 
            fontWeight: 900, 
            color: '#5624d0', 
            marginBottom: 12, 
            fontSize: 26, 
            letterSpacing: 2, 
            textShadow: '0 2px 8px #fff8e1', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10, 
            fontFamily: 'Georgia,serif' 
          }}>
            <FaFilePdf color="#f7b32b" size={28} /> PDF Viewer
          </div>
          <PDFViewer fileUrl={selectedSub.pdfUrl} />
        </div>
      );
    }

    return (
      <div style={{ 
        background: 'linear-gradient(120deg,#f7b32b 0%,#fff 100%)', 
        borderRadius: 18, 
        boxShadow: '0 8px 32px #5624d088', 
        padding: 40, 
        margin: '40px 0', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        border: '3px double #5624d0', 
        fontFamily: 'Georgia,serif', 
        letterSpacing: 1 
      }}>
        <div style={{ 
          fontWeight: 900, 
          color: '#5624d0', 
          marginBottom: 12, 
          fontSize: 26, 
          letterSpacing: 2, 
          textShadow: '0 2px 8px #fff8e1', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 10, 
          fontFamily: 'Georgia,serif' 
        }}>
          <FaFilePdf color="#f7b32b" size={28} /> Downloadable PDF
        </div>
        <a 
          href={selectedSub.pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn"
          style={{ 
            fontWeight: 900, 
            borderRadius: 18, 
            fontSize: 20, 
            padding: '16px 48px', 
            background: 'linear-gradient(90deg,#5624d0 60%,#f7b32b 100%)', 
            color: '#fff', 
            boxShadow: '0 2px 16px #f7b32b88', 
            border: '4px double #5624d0', 
            marginTop: 12, 
            fontFamily: 'Georgia,serif', 
            letterSpacing: 2, 
            textShadow: '0 2px 8px #5a463288', 
            textTransform: 'uppercase',
            textDecoration: 'none'
          }}
        >
          Download PDF
        </a>
      </div>
    );
  };

  return (
    <>
      <HeaderSeven />
      <div style={{ 
        minHeight: '100vh', 
        background: '#f7f8fa', 
        fontFamily: 'Inter, Arial, sans-serif', 
        color: '#222', 
        paddingBottom: 0 
      }}>
        {/* Top bar */}
        <div style={{ 
          width: '100%', 
          background: '#fff', 
          borderBottom: '1px solid #e6e6e6', 
          padding: '18px 0', 
          boxShadow: '0 2px 8px #0001', 
          position: 'sticky', 
          top: 0, 
          zIndex: 100 
        }}>
          <div style={{ 
            maxWidth: 1400, 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 24, 
            padding: '0 40px' 
          }}>
            <a 
              href="/" 
              style={{ 
                color: '#5624d0', 
                fontWeight: 900, 
                fontSize: 22, 
                letterSpacing: 1, 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8 
              }}
            >
              <FaArrowLeft /> Courses
            </a>
            <span style={{ 
              fontWeight: 700, 
              fontSize: 20, 
              color: '#222', 
              flex: 1 
            }}>
              {courseData.name}
            </span>
          </div>
        </div>

        <div style={{ 
          maxWidth: 1400, 
          margin: '0 auto', 
          display: 'flex', 
          gap: 36, 
          padding: '40px' 
        }}>
          {/* LEFT SIDEBAR */}
          <div style={{ 
            width: 340, 
            minWidth: 220, 
            background: '#fff', 
            borderRadius: 14, 
            boxShadow: '0 2px 16px #0001', 
            padding: 28, 
            height: 'fit-content', 
            border: '1px solid #e6e6e6' 
          }}>
            <div style={{ 
              fontWeight: 900, 
              color: '#5624d0', 
              marginBottom: 18, 
              fontSize: 22, 
              letterSpacing: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10 
            }}>
              <FaBookOpen color="#f7b32b" />
              Course Content
            </div>
            
            <Accordion defaultActiveKey="0" alwaysOpen>
              {courseData.chapters.map((chapter: Chapter, i: number) => (
                <Accordion.Item eventKey={String(i)} key={i}>
                  <Accordion.Header>
                    <span style={{ fontWeight: 700, color: '#222', fontSize: 16 }}>
                      Chapter {i + 1}: {chapter.title}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    {chapter.topics.map((topic: Topic, j: number) => (
                      <div key={j} style={{ marginBottom: 10 }}>
                        <div style={{ 
                          fontWeight: 700, 
                          color: '#5624d0', 
                          marginBottom: 2, 
                          fontSize: 15 
                        }}>
                          Topic {j + 1}: {topic.title}
                        </div>
                        <ul style={{ paddingLeft: 16, marginBottom: 0 }}>
                          {topic.subtopics.map((sub: Subtopic, k: number) => (
                            <li
                              key={k}
                              style={{
                                cursor: 'pointer',
                                fontSize: 15,
                                color: selected.chapter === i && selected.topic === j && selected.subtopic === k ? '#fff' : '#222',
                                fontWeight: selected.chapter === i && selected.topic === j && selected.subtopic === k ? 900 : 500,
                                marginBottom: 2,
                                background: selected.chapter === i && selected.topic === j && selected.subtopic === k ? 'linear-gradient(90deg,#5624d0 60%,#f7b32b 100%)' : undefined,
                                borderRadius: 8,
                                padding: '4px 10px',
                                transition: 'all 0.2s',
                                boxShadow: selected.chapter === i && selected.topic === j && selected.subtopic === k ? '0 2px 8px #f7b32b44' : undefined
                              }}
                              onClick={() => {
                                setSelected({ chapter: i, topic: j, subtopic: k });
                                setMcqAnswers({});
                                setMcqSubmitted(false);
                              }}
                            >
                              Subtopic {k + 1}: {sub.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              background: '#fff', 
              borderRadius: 12, 
              boxShadow: '0 2px 16px #0001', 
              padding: 32, 
              minHeight: 600, 
              border: '1px solid #e6e6e6' 
            }}>
              <div style={{ 
                fontWeight: 900, 
                color: '#222', 
                marginBottom: 18, 
                fontSize: 22, 
                letterSpacing: 1, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10 
              }}>
                {selectedSub?.title || 'Select a subtopic'}
              </div>

              {/* Video Player */}
              <div style={{ 
                aspectRatio: '16/9', 
                borderRadius: 10, 
                marginBottom: 24, 
                background: '#eee', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                boxShadow: '0 2px 8px #0001', 
                overflow: 'hidden', 
                border: '1px solid #e6e6e6' 
              }}>
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Course Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 0, borderRadius: 10 }}
                  />
                ) : (
                  <div style={{ 
                    color: '#bbb', 
                    fontSize: 20, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: 8 
                  }}>
                    <FaBookOpen size={32} color="#f7b32b" />
                    No video available
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div style={{ 
                display: 'flex', 
                borderBottom: '2px solid #e6e6e6', 
                marginBottom: 24, 
                gap: 8 
              }}>
                <div 
                  onClick={() => setTab('pdf')} 
                  style={{
                    padding: '10px 32px',
                    cursor: 'pointer',
                    borderBottom: tab === 'pdf' ? '4px solid #5624d0' : 'none',
                    color: tab === 'pdf' ? '#5624d0' : '#222',
                    fontWeight: tab === 'pdf' ? 900 : 600,
                    fontSize: 18,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: '12px 12px 0 0',
                    background: tab === 'pdf' ? '#f7f8fa' : undefined,
                    boxShadow: tab === 'pdf' ? '0 2px 8px #5624d044' : undefined
                  }}
                >
                  <FaFilePdf /> PDF
                </div>
                <div 
                  onClick={() => setTab('case')} 
                  style={{
                    padding: '10px 32px',
                    cursor: 'pointer',
                    borderBottom: tab === 'case' ? '4px solid #43a047' : 'none',
                    color: tab === 'case' ? '#43a047' : '#222',
                    fontWeight: tab === 'case' ? 900 : 600,
                    fontSize: 18,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: '12px 12px 0 0',
                    background: tab === 'case' ? '#f7f8fa' : undefined,
                    boxShadow: tab === 'case' ? '0 2px 8px #43a04744' : undefined
                  }}
                >
                  <FaBookOpen /> Case Study
                </div>
                <div 
                  onClick={() => setTab('mcq')} 
                  style={{
                    padding: '10px 32px',
                    cursor: 'pointer',
                    borderBottom: tab === 'mcq' ? '4px solid #f7b32b' : 'none',
                    color: tab === 'mcq' ? '#f7b32b' : '#222',
                    fontWeight: tab === 'mcq' ? 900 : 600,
                    fontSize: 18,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderRadius: '12px 12px 0 0',
                    background: tab === 'mcq' ? '#f7f8fa' : undefined,
                    boxShadow: tab === 'mcq' ? '0 2px 8px #f7b32b44' : undefined
                  }}
                >
                  <FaQuestionCircle /> MCQ
                </div>
              </div>

              {/* Tab Content */}
              <div style={{ minHeight: 140 }}>
                {tab === 'pdf' && renderPdfSection()}
                {tab === 'case' && (
                  <div style={{ 
                    color: '#bbb', 
                    fontSize: 18, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: 8 
                  }}>
                    <FaBookOpen size={32} color="#f7b32b" />
                    No Case Study
                  </div>
                )}
                {tab === 'mcq' && (
                  <div style={{ 
                    color: '#bbb', 
                    fontSize: 18, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: 8 
                  }}>
                    <FaQuestionCircle size={32} color="#f7b32b" />
                    No MCQ available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsPage;
