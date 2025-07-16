'use client';
import { Accordion, Card } from 'react-bootstrap';
import { FaFilePdf, FaQuestionCircle, FaBookOpen, FaArrowLeft, FaLock, FaRegSmileBeam } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HeaderSeven from '@/layouts/headers/Headerseven';

const getYoutubeVideoId = (url: string) => {
  try {
    return new URL(url).searchParams.get('v');
  } catch {
    return null;
  }
};

const CourseDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const [courseData, setCourseData] = useState<any>(null);
  const [selected, setSelected] = useState<{ chapter: number; topic: number; subtopic: number }>({ chapter: 0, topic: 0, subtopic: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/course-details/get-course-details?id=${id}`);
        const data = await res.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getSelectedSubtopic = () => {
    const ch = courseData?.chapters?.[selected.chapter];
    const tp = ch?.topics?.[selected.topic];
    return tp?.subtopics?.[selected.subtopic] || null;
  };



  const [tab, setTab] = useState<'pdf' | 'case' | 'mcq'>('pdf');
  const [mcqAnswers, setMcqAnswers] = useState<{ [idx: number]: number | null }>({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(120deg,#5624d0 0%,#f7b32b 100%)', fontFamily: 'Georgia,serif', color: '#fff' }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%', background: 'rgba(86,36,208,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: '0 0 32px #5624d088', border: '4px double #5624d0', borderTop: '8px solid #f7b32b', fontSize: 60
        }}>
          <FaBookOpen size={60} color="#f7b32b" />
        </div>
        <div className="spinner-border mb-3" role="status" style={{ width: 48, height: 48, color: '#f7b32b' }} />
        <p style={{ fontWeight: 700, fontSize: 24, letterSpacing: 1, fontFamily: 'Georgia,serif', textShadow: '0 2px 8px #5624d0' }}>Loading course details...</p>
      </div>
    );
  }

  const selectedSub = getSelectedSubtopic();
  const videoId = selectedSub ? getYoutubeVideoId(selectedSub.youtubeUrl) : null;

  // PDF access logic
  const renderPdfSection = () => {
    if (!selectedSub?.pdfUrl) return (
      <div style={{ color: '#5624d0', fontSize: 20, padding: 40, background: 'linear-gradient(120deg,#f7b32b 0%,#fff 100%)', borderRadius: 18, textAlign: 'center', margin: '40px 0', boxShadow: '0 4px 24px #5624d088', border: '3px double #5624d0', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
        <FaFilePdf size={40} color="#5624d0" style={{ marginBottom: 8 }} />
        <div>No PDF available</div>
      </div>
    );
    if (selectedSub.pdfAccess === 'PAID') {
      return (
        <div style={{ color: '#fff', fontWeight: 800, background: 'linear-gradient(135deg,#5624d0 60%,#f7b32b 100%)', borderRadius: 22, padding: 40, textAlign: 'center', fontSize: 22, margin: '40px 0', boxShadow: '0 8px 32px #5624d088', border: '4px double #fff8e1', fontFamily: 'Georgia,serif', letterSpacing: 1, position: 'relative' }}>
          <FaLock size={40} color="#fff8e1" style={{ marginBottom: 8 }} />
          <div style={{ fontWeight: 900, color: '#fff8e1', fontSize: 28 }}>This PDF is <span style={{ color: '#f7b32b' }}>PAID</span></div>
          <div style={{ color: '#fff8e1', fontWeight: 600, fontSize: 18, marginTop: 8 }}>Please purchase to access.</div>
        </div>
      );
    }
    if (selectedSub.pdfAccess === 'VIEW') {
      return (
        <div style={{ background: 'linear-gradient(120deg,#f7b32b 0%,#fff 100%)', borderRadius: 18, boxShadow: '0 8px 32px #5624d088', padding: 32, margin: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px double #5624d0', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
          <div style={{ fontWeight: 900, color: '#5624d0', marginBottom: 12, fontSize: 26, letterSpacing: 2, textShadow: '0 2px 8px #fff8e1', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Georgia,serif' }}><FaFilePdf color="#f7b32b" size={28} /> PDF Viewer</div>
          <iframe
            src={selectedSub.pdfUrl}
            title="PDF Viewer"
            style={{ width: '100%', minHeight: 800, maxHeight: '80vh', border: '3px double #f7b32b', borderRadius: 12, background: '#fff', boxShadow: '0 4px 24px #f7b32b44', marginBottom: 12 }}
            allowFullScreen
          />
          <div style={{ color: '#5624d0', fontSize: 16, marginTop: 6, fontWeight: 600, background: '#fff8e1', borderRadius: 8, padding: 8, border: '1.5px solid #f7b32b', fontFamily: 'Georgia,serif' }}>Scroll to view all pages. <span style={{ color: '#f7b32b', fontWeight: 700 }}>Download not allowed</span>.</div>
        </div>
      );
    }
    if (selectedSub.pdfAccess === 'DOWNLOAD') {
      return (
        <div style={{ background: 'linear-gradient(120deg,#f7b32b 0%,#fff 100%)', borderRadius: 18, boxShadow: '0 8px 32px #5624d088', padding: 40, margin: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px double #5624d0', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
          <div style={{ fontWeight: 900, color: '#5624d0', marginBottom: 12, fontSize: 26, letterSpacing: 2, textShadow: '0 2px 8px #fff8e1', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Georgia,serif' }}><FaFilePdf color="#f7b32b" size={28} /> Downloadable PDF</div>
          <a href={selectedSub.pdfUrl} download className="btn" style={{ fontWeight: 900, borderRadius: 18, fontSize: 20, padding: '16px 48px', background: 'linear-gradient(90deg,#5624d0 60%,#f7b32b 100%)', color: '#fff', boxShadow: '0 2px 16px #f7b32b88', border: '4px double #5624d0', marginTop: 12, fontFamily: 'Georgia,serif', letterSpacing: 2, textShadow: '0 2px 8px #5a463288', textTransform: 'uppercase' }}>Download PDF</a>
        </div>
      );
    }
    return null;
  };

  // MCQ quiz UI
  const renderMcqQuiz = () => {
    if (!selectedSub?.mcqs || selectedSub.mcqs.length === 0) return (
      <div style={{ color: '#a67c52', fontSize: 20, padding: 40, background: 'url(https://www.transparenttextures.com/patterns/old-mathematics.png), #f5ecd7', borderRadius: 18, textAlign: 'center', margin: '40px 0', boxShadow: '0 4px 24px #bfae8e88', border: '3px double #a67c52', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
        <FaQuestionCircle size={40} color="#a67c52" style={{ marginBottom: 8 }} />
        <div>No MCQs</div>
      </div>
    );
    if (mcqSubmitted) {
      const correctCount = selectedSub.mcqs.filter((mcq: any, idx: number) => mcqAnswers[idx] === mcq.correctIndex).length;
      return (
        <div style={{ background: 'url(https://www.transparenttextures.com/patterns/old-mathematics.png), #f5ecd7', borderRadius: 18, boxShadow: '0 4px 24px #bfae8e88', padding: 32, border: '3px double #a67c52', fontFamily: 'Georgia,serif', letterSpacing: 1, margin: '32px 0' }}>
          <div style={{ fontWeight: 900, color: '#5a4632', fontSize: 22, marginBottom: 12, fontFamily: 'Georgia,serif', letterSpacing: 2 }}>Quiz Results</div>
          <div style={{ width: '100%', background: '#fff8e1', borderRadius: 8, height: 18, marginBottom: 18, boxShadow: '0 2px 8px #bfae8e44', overflow: 'hidden', position: 'relative', border: '1.5px solid #a67c52' }}>
            <div style={{ width: `${(correctCount / selectedSub.mcqs.length) * 100}%`, background: 'linear-gradient(90deg,#a67c52 60%,#fff8e1 100%)', height: '100%', borderRadius: 8, transition: 'width 0.6s cubic-bezier(.4,2,.6,1)', boxShadow: '0 2px 8px #bfae8e44' }} />
            <span style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', color: '#5a4632', fontWeight: 700, fontSize: 14 }}>{correctCount} / {selectedSub.mcqs.length} correct</span>
          </div>
          <ul style={{ paddingLeft: 16 }}>
            {selectedSub.mcqs.map((mcq: any, idx: number) => (
              <li key={idx} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: '#5a4632', marginBottom: 2, fontFamily: 'Georgia,serif' }}>Q{idx + 1}: {mcq.question}</div>
                <ul style={{ paddingLeft: 16 }}>
                  {mcq.options.map((opt: string, oIdx: number) => {
                    const isCorrect = mcq.correctIndex === oIdx;
                    const userSelected = mcqAnswers[idx] === oIdx;
                    return (
                      <li key={oIdx} style={{
                        color: isCorrect ? '#388e3c' : userSelected ? '#b71c1c' : '#5a4632',
                        fontWeight: isCorrect ? 700 : userSelected ? 600 : 400,
                        textDecoration: userSelected && !isCorrect ? 'line-through' : undefined,
                        background: userSelected ? (isCorrect ? '#e6e2d3' : '#f5c6c6') : undefined,
                        borderRadius: 6,
                        padding: '4px 12px',
                        display: 'inline-block',
                        marginBottom: 2,
                        boxShadow: userSelected ? '0 2px 8px #bfae8e44' : undefined,
                        fontSize: 16,
                        fontFamily: 'Georgia,serif'
                      }}>
                        {opt} {isCorrect ? '✔️' : userSelected ? '❌' : ''}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <form onSubmit={e => { e.preventDefault(); setMcqSubmitted(true); }} style={{ background: 'url(https://www.transparenttextures.com/patterns/old-mathematics.png), #f5ecd7', borderRadius: 18, boxShadow: '0 4px 24px #bfae8e88', padding: 32, border: '3px double #a67c52', fontFamily: 'Georgia,serif', letterSpacing: 1, margin: '32px 0' }}>
        <div style={{ fontWeight: 900, color: '#5a4632', fontSize: 22, marginBottom: 12, fontFamily: 'Georgia,serif', letterSpacing: 2 }}>Quiz</div>
        <ul style={{ paddingLeft: 16 }}>
          {selectedSub.mcqs.map((mcq: any, idx: number) => (
            <li key={idx} style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: '#5a4632', marginBottom: 2, fontFamily: 'Georgia,serif' }}>Q{idx + 1}: {mcq.question}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
                {mcq.options.map((opt: string, oIdx: number) => (
                  <label key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', borderRadius: 6, padding: '4px 12px', background: mcqAnswers[idx] === oIdx ? '#e6e2d3' : undefined, boxShadow: mcqAnswers[idx] === oIdx ? '0 2px 8px #bfae8e44' : undefined, fontWeight: mcqAnswers[idx] === oIdx ? 700 : 400, fontSize: 16, fontFamily: 'Georgia,serif', transition: 'all 0.2s' }}>
                    <input
                      type="radio"
                      name={`mcq-${idx}`}
                      value={oIdx}
                      checked={mcqAnswers[idx] === oIdx}
                      onChange={() => setMcqAnswers(a => ({ ...a, [idx]: oIdx }))}
                      disabled={mcqSubmitted}
                      style={{ accentColor: '#a67c52' }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <button type="submit" className="btn" style={{ fontWeight: 900, borderRadius: 18, marginTop: 12, fontSize: 18, background: 'linear-gradient(90deg,#a67c52 60%,#fff8e1 100%)', color: '#fff', boxShadow: '0 2px 8px #bfae8e44', border: '4px double #a67c52', fontFamily: 'Georgia,serif', letterSpacing: 2, textShadow: '0 2px 8px #5a463288', textTransform: 'uppercase', transition: 'transform 0.2s', transform: 'scale(1)' }} onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.07)')} onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}>Submit Quiz</button>
      </form>
    );
  };

  return (
    <>
      <HeaderSeven />
      <div style={{ minHeight: '100vh', background: '#f7f8fa', fontFamily: 'Inter, Arial, sans-serif', color: '#222', paddingBottom: 0 }}>
        {/* Udemy-style top bar */}
        <div style={{ width: '100%', background: '#fff', borderBottom: '1px solid #e6e6e6', padding: '18px 0 18px 0', boxShadow: '0 2px 8px #0001', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 24, padding: '0 40px' }}>
            <a href="/" style={{ color: '#5624d0', fontWeight: 900, fontSize: 22, letterSpacing: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}><FaArrowLeft /> Courses</a>
            {/* <span style={{ fontWeight: 700, fontSize: 20, color: '#222', flex: 1 }}>{courseData.name}</span> */}
          </div>
        </div>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 36, padding: '40px 0 40px 0' }}>
          {/* LEFT SIDEBAR: Hierarchy */}
          <div style={{ width: 340, minWidth: 220, background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px #0001', padding: 28, height: 'fit-content', border: '1px solid #e6e6e6' }}>
            <div style={{ fontWeight: 900, color: '#5624d0', marginBottom: 18, fontSize: 22, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <img
                  src="/assets/courseimages/anatomy.png"
                  alt="Anatomy"
                  style={{ width: 28, height: 28, objectFit: 'contain', filter: 'drop-shadow(0 2px 4px #5624d044)' }}
                  onError={e => {
                    const t = e.target as HTMLImageElement;
                    if (!t.src.endsWith('/assets/img/others/error_img.svg')) {
                      t.onerror = null;
                      t.src = '/assets/img/others/error_img.svg';
                    }
                  }}
                />
                Anatomy
              </span>
            </div>
            <Accordion defaultActiveKey="0" alwaysOpen>
              {courseData.chapters.map((chapter: any, i: number) => (
                <Accordion.Item eventKey={String(i)} key={i}>
                  <Accordion.Header>
                    <span style={{ fontWeight: 700, color: '#222', fontSize: 16 }}>Chapter {i + 1}: {chapter.title}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    {chapter.topics.map((topic: any, j: number) => (
                      <div key={j} style={{ marginBottom: 10 }}>
                        <div style={{ fontWeight: 700, color: '#5624d0', marginBottom: 2, fontSize: 15 }}>Topic {j + 1}: {topic.title}</div>
                        <ul style={{ paddingLeft: 16, marginBottom: 0 }}>
                          {topic.subtopics.map((sub: any, k: number) => (
                            <li
                              key={k}
                              style={{ cursor: 'pointer', fontSize: 15, color: selected.chapter === i && selected.topic === j && selected.subtopic === k ? '#fff' : '#222', fontWeight: selected.chapter === i && selected.topic === j && selected.subtopic === k ? 900 : 500, marginBottom: 2, background: selected.chapter === i && selected.topic === j && selected.subtopic === k ? 'linear-gradient(90deg,#5624d0 60%,#f7b32b 100%)' : undefined, borderRadius: 8, padding: '4px 10px', transition: 'all 0.2s', boxShadow: selected.chapter === i && selected.topic === j && selected.subtopic === k ? '0 2px 8px #f7b32b44' : undefined }}
                              onClick={() => { setSelected({ chapter: i, topic: j, subtopic: k }); setMcqAnswers({}); setMcqSubmitted(false); }}
                              onMouseOver={e => { if (!(selected.chapter === i && selected.topic === j && selected.subtopic === k)) e.currentTarget.style.background = '#f3f3f3'; }}
                              onMouseOut={e => { if (!(selected.chapter === i && selected.topic === j && selected.subtopic === k)) e.currentTarget.style.background = 'none'; }}
                            >
                              <span style={{ display: 'inline-block' }}>Subtopic {k + 1}: {sub.title}</span>
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

          {/* CENTER: Video + Tabs */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 32, minHeight: 600, border: '1px solid #e6e6e6' }}>
              <div style={{ fontWeight: 900, color: '#222', marginBottom: 18, fontSize: 22, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>{selectedSub?.title || 'Select a subtopic'}</div>
              <div style={{ aspectRatio: '16/9', borderRadius: 10, marginBottom: 24, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001', overflow: 'hidden', border: '1px solid #e6e6e6' }}>
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Course Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 0, borderRadius: 10 }}
                  />
                ) : (
                  <div style={{ color: '#bbb', fontSize: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><FaBookOpen size={32} color="#f7b32b" />No video available</div>
                )}
              </div>
              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '2px solid #e6e6e6', marginBottom: 24, gap: 8 }}>
                <div onClick={() => setTab('pdf')} style={{ padding: '10px 32px', cursor: 'pointer', borderBottom: tab === 'pdf' ? '4px solid #5624d0' : 'none', color: tab === 'pdf' ? '#5624d0' : '#222', fontWeight: tab === 'pdf' ? 900 : 600, fontSize: 18, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, borderRadius: '12px 12px 0 0', background: tab === 'pdf' ? '#f7f8fa' : undefined, boxShadow: tab === 'pdf' ? '0 2px 8px #5624d044' : undefined }}><FaFilePdf /> PDF</div>
                <div onClick={() => setTab('case')} style={{ padding: '10px 32px', cursor: 'pointer', borderBottom: tab === 'case' ? '4px solid #43a047' : 'none', color: tab === 'case' ? '#43a047' : '#222', fontWeight: tab === 'case' ? 900 : 600, fontSize: 18, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, borderRadius: '12px 12px 0 0', background: tab === 'case' ? '#f7f8fa' : undefined, boxShadow: tab === 'case' ? '0 2px 8px #43a04744' : undefined }}><FaBookOpen /> Case Study</div>
                <div onClick={() => setTab('mcq')} style={{ padding: '10px 32px', cursor: 'pointer', borderBottom: tab === 'mcq' ? '4px solid #f7b32b' : 'none', color: tab === 'mcq' ? '#f7b32b' : '#222', fontWeight: tab === 'mcq' ? 900 : 600, fontSize: 18, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, borderRadius: '12px 12px 0 0', background: tab === 'mcq' ? '#f7f8fa' : undefined, boxShadow: tab === 'mcq' ? '0 2px 8px #f7b32b44' : undefined }}><FaQuestionCircle /> MCQ</div>
              </div>
              <div style={{ minHeight: 140 }}>
                {tab === 'pdf' && renderPdfSection()}
                {tab === 'case' && (
                  selectedSub?.caseStudyUrl ? (
                    selectedSub.caseAccess === 'VIEW' ? (
                      <div style={{ background: 'linear-gradient(120deg,#f7b32b 0%,#fff 100%)', borderRadius: 18, boxShadow: '0 8px 32px #5624d088', padding: 32, margin: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '3px double #5624d0', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>
                        <div style={{ fontWeight: 900, color: '#5624d0', marginBottom: 12, fontSize: 26, letterSpacing: 2, textShadow: '0 2px 8px #fff8e1', display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Georgia,serif' }}><FaBookOpen color="#f7b32b" size={28} /> Case Study Viewer</div>
                        <iframe
                          src={selectedSub.caseStudyUrl}
                          title="Case Study Viewer"
                          style={{ width: '100%', minHeight: 800, maxHeight: '80vh', border: '3px double #f7b32b', borderRadius: 12, background: '#fff', boxShadow: '0 4px 24px #f7b32b44', marginBottom: 12 }}
                          allowFullScreen
                        />
                        <div style={{ color: '#5624d0', fontSize: 16, marginTop: 6, fontWeight: 600, background: '#fff8e1', borderRadius: 8, padding: 8, border: '1.5px solid #f7b32b', fontFamily: 'Georgia,serif' }}>Scroll to view all pages. <span style={{ color: '#f7b32b', fontWeight: 700 }}>Download not allowed</span>.</div>
                      </div>
                    ) : (
                      <a href={selectedSub.caseStudyUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#43a047', textDecoration: 'underline', fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}><FaBookOpen /> View Case Study</a>
                    )
                  ) : (
                    <div style={{ color: '#bbb', fontSize: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><FaBookOpen size={32} color="#f7b32b" />No Case Study</div>
                  )
                )}
                {tab === 'mcq' && renderMcqQuiz()}
              </div>
            </div>
          </div>

          {/* RIGHT: Upcoming Chapters as Timeline */}
          <div style={{ width: 320, minWidth: 220, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: 24, height: 'fit-content', border: '1px solid #e6e6e6' }}>
            <div style={{ fontWeight: 900, color: '#5624d0', marginBottom: 18, fontSize: 20, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}><FaBookOpen color="#f7b32b" size={20} /> Upcoming</div>
            <div style={{ position: 'relative', marginLeft: 8, marginTop: 8 }}>
              {courseData.chapters.map((chapter: any, i: number) => (
                <div key={i} style={{ marginBottom: 18, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#f7b32b', border: '2px solid #5624d0', boxShadow: '0 2px 8px #f7b32b44', zIndex: 2 }} />
                    <div style={{ fontWeight: 700, color: '#222', fontSize: 15 }}>Chapter {i + 1}: {chapter.title}</div>
                  </div>
                  <div style={{ borderLeft: '2px solid #f7b32b', marginLeft: 8, paddingLeft: 18, marginTop: 2 }}>
                    {chapter.topics.map((topic: any, j: number) => (
                      <div key={j} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#5624d0', border: '2px solid #f7b32b', boxShadow: '0 2px 8px #5624d044', zIndex: 2 }} />
                          <span style={{ color: '#f7b32b', fontWeight: 700, fontSize: 13 }}>Topic {j + 1}: {topic.title}</span>
                        </div>
                        <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
                          {topic.subtopics.map((sub: any, k: number) => (
                            <li key={k} style={{ fontSize: 12, color: '#222', fontWeight: 600, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#f7b32b', marginRight: 4 }} />
                              Subtopic {k + 1}: {sub.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsPage;
