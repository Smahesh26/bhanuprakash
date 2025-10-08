"use client";

import { useState, useEffect } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar";
import Image from "next/image";
import bg_img from "@/assets/img/bg/dashboard_bg.jpg";

interface MCQ {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}
interface Subtopic {
  title: string;
  youtubeUrl: string;
  pdfAccess: string;
  pdf: File | string | null;
  caseStudyAccess: string;
  caseStudy: File | string | null;
  mcqs: MCQ[];
}

interface Topic {
  topic: string;
  hasSubtopics: boolean;
  youtubeUrl?: string;
  pdfAccess?: string;
  pdf?: File | string | null;
  caseStudyAccess?: string;
  caseStudy?: File | string | null;
  mcqs?: MCQ[];
  subtopics?: Subtopic[];
}

interface Chapter {
  chapter: string;
  topics: Topic[];
}

interface Curriculum {
  id?: string;
  subject: string;
  chapters: Chapter[];
}

const UploadContent = () => {
  const [curriculum, setCurriculum] = useState<Curriculum[]>([
    {
      subject: "",
      chapters: [
        {
          chapter: "",
          topics: [
            {
              topic: "",
              hasSubtopics: false,
              youtubeUrl: "",
              pdfAccess: "VIEW",
              pdf: null,
              caseStudyAccess: "VIEW",
              caseStudy: null,
              mcqs: [],
            },
          ],
        },
      ],
    },
  ]);

  const [allCurriculums, setAllCurriculums] = useState<Curriculum[]>([]);
  const [loadingCurriculums, setLoadingCurriculums] = useState(false);
  const [editCurriculum, setEditCurriculum] = useState<Curriculum | null>(null);

  // Fetch all curriculums
  const fetchCurriculums = async () => {
    setLoadingCurriculums(true);
    const res = await fetch("/api/curriculum");
    const data = await res.json();
    setAllCurriculums(data || []);
    setLoadingCurriculums(false);
  };

  useEffect(() => {
    fetchCurriculums();
  }, []);

  // Helper to upload a file and get its URL
  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url;
  }

  // When building your curriculum object:
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload-file", { method: "POST", body: formData });
    const data = await res.json();
    return data.url; // Cloudinary file URL
  };

  // Submit handler: upload files, build curriculum JSON, send to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCurriculum = JSON.parse(JSON.stringify(curriculum)); // deep copy

    for (const subj of newCurriculum) {
      for (const chapter of subj.chapters) {
        for (const topic of chapter.topics) {
          // Upload PDF/Case Study if they are File objects
          if (topic.pdf instanceof File) {
            topic.pdf = await handleFileUpload(topic.pdf);
          }
          if (topic.caseStudy instanceof File) {
            topic.caseStudy = await handleFileUpload(topic.caseStudy);
          }
          // Force empty objects to null when submit
          if (topic.pdf === null || typeof topic.pdf !== 'string') topic.pdf = null;
          if (topic.caseStudy === null || typeof topic.caseStudy !== 'string') topic.caseStudy = null;

          if (topic.hasSubtopics && topic.subtopics) {
            for (const sub of topic.subtopics) {
              if (sub.pdf instanceof File) {
                sub.pdf = await handleFileUpload(sub.pdf);
              }
              if (sub.caseStudy instanceof File) {
                sub.caseStudy = await handleFileUpload(sub.caseStudy);
              }
              if (sub.pdf === null || typeof sub.pdf !== 'string') sub.pdf = null;
              if (sub.caseStudy === null || typeof sub.caseStudy !== 'string') sub.caseStudy = null;
            }
          }
        }
      }
    }

    // FIX: Send a single object, not an array
    await fetch("/api/curriculum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCurriculum[0]), // single object, not array
    });

    setCurriculum([
      {
        subject: "",
        chapters: [
          {
            chapter: "",
            topics: [
              {
                topic: "",
                hasSubtopics: false,
                youtubeUrl: "",
                pdfAccess: "VIEW",
                pdf: null,
                caseStudyAccess: "VIEW",
                caseStudy: null,
                mcqs: [],
              },
            ],
          },
        ],
      },
    ]);
    fetchCurriculums();
  };

  // File input handlers
  const handleFileChange = (
    file: File | null,
    type: "pdf" | "caseStudy",
    i: number,
    j: number,
    k: number,
    s?: number
  ) => {
    const newData = [...curriculum];
    if (typeof s === "number") {
      newData[i].chapters[j].topics[k].subtopics![s][type] = file;
    } else {
      newData[i].chapters[j].topics[k][type] = file;
    }
    setCurriculum(newData);
  };

  const handleInputChange = (value: string, field: keyof Topic, i: number, j: number, k: number) => {
    const newData = [...curriculum];
    newData[i].chapters[j].topics[k] = {
      ...newData[i].chapters[j].topics[k],
      [field]: value,
    };
    setCurriculum(newData);
  };

  const handleSubtopicToggle = (val: boolean, i: number, j: number, k: number) => {
    const newData = [...curriculum];
    newData[i].chapters[j].topics[k].hasSubtopics = val;
    if (val) {
      newData[i].chapters[j].topics[k].subtopics = [
        {
          title: "",
          youtubeUrl: "",
          pdfAccess: "VIEW",
          pdf: null,
          caseStudyAccess: "VIEW",
          caseStudy: null,
          mcqs: [],
        },
      ];
      delete newData[i].chapters[j].topics[k].youtubeUrl;
      delete newData[i].chapters[j].topics[k].pdf;
      delete newData[i].chapters[j].topics[k].caseStudy;
      delete newData[i].chapters[j].topics[k].mcqs;
    } else {
      newData[i].chapters[j].topics[k].youtubeUrl = "";
      newData[i].chapters[j].topics[k].pdfAccess = "VIEW";
      newData[i].chapters[j].topics[k].pdf = null;
      newData[i].chapters[j].topics[k].caseStudyAccess = "VIEW";
      newData[i].chapters[j].topics[k].caseStudy = null;
      newData[i].chapters[j].topics[k].mcqs = [];
      delete newData[i].chapters[j].topics[k].subtopics;
    }
    setCurriculum(newData);
  };

  const handleTopicChange = (i: number, j: number) => {
    const newData = [...curriculum];
    newData[i].chapters[j].topics.push({
      topic: "",
      hasSubtopics: false,
      youtubeUrl: "",
      pdfAccess: "VIEW",
      pdf: null,
      caseStudyAccess: "VIEW",
      caseStudy: null,
      mcqs: [],
    });
    setCurriculum(newData);
  };

  const renderMCQs = (
    mcqs: MCQ[],
    onChange: (index: number, field: keyof MCQ, value: any) => void,
    onAdd: () => void
  ) => (
    <>
      {mcqs.map((mcq, idx) => (
        <div key={idx} className="border p-2 mb-3 rounded-3 bg-white">
          <Form.Label>Question</Form.Label>
          <Form.Control
            className="mb-2"
            value={mcq.question}
            onChange={(e) => onChange(idx, "question", e.target.value)}
          />
          <div className="row g-2 mb-2">
            {mcq.options.map((opt, oIdx) => (
              <div className="col-6 col-md-3" key={oIdx}>
                <Form.Control
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...mcq.options];
                    newOptions[oIdx] = e.target.value;
                    onChange(idx, "options", newOptions);
                  }}
                  placeholder={`Option ${oIdx + 1}`}
                />
              </div>
            ))}
          </div>
          <div className="d-flex align-items-center mb-1">
            <Form.Label className="me-2 mb-0">Correct Answer (0-3):</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={3}
              style={{ width: 70 }}
              value={mcq.correctAnswerIndex}
              onChange={(e) => onChange(idx, "correctAnswerIndex", parseInt(e.target.value))}
            />
          </div>
        </div>
      ))}
      <div className="mb-3">
        <Button
          size="sm"
          variant="outline-primary"
          className="rounded-3 px-2 py-1"
          style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
          onClick={onAdd}
        >
          ＋ Add MCQ
        </Button>
      </div>
    </>
  );

  function cancelEdit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    setEditCurriculum(null);
  }

  async function handleEditSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    if (!editCurriculum) return;

    // Deep copy for editing
    const updatedCurriculum: Curriculum = {
      id: editCurriculum.id ?? "",
      subject: editCurriculum.subject ?? "",
      chapters: editCurriculum.chapters ? JSON.parse(JSON.stringify(editCurriculum.chapters)) : [],
    };

    // Upload files if any are File objects
    for (const chapter of updatedCurriculum.chapters) {
      for (const topic of chapter.topics) {
        if (topic.pdf instanceof File) {
          topic.pdf = await uploadFile(topic.pdf);
        }
        if (topic.caseStudy instanceof File) {
          topic.caseStudy = await uploadFile(topic.caseStudy);
        }
        if (topic.hasSubtopics && topic.subtopics) {
          for (const sub of topic.subtopics) {
            if (sub.pdf instanceof File) {
              sub.pdf = await uploadFile(sub.pdf);
            }
            if (sub.caseStudy instanceof File) {
              sub.caseStudy = await uploadFile(sub.caseStudy);
            }
          }
        }
      }
    }

    // IMPORTANT: Use /update route for PUT
    await fetch(`/api/curriculum/${editCurriculum.id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCurriculum),
    });

    setEditCurriculum(null);
    fetchCurriculums();
  }

  return (
    <section className="dashboard__area section-pb-120">
      <div className="dashboard__bg">
        <Image src={bg_img} alt="bg" />
      </div>
      <div className="container">
        <div className="dashboard__inner-wrap row">
          <DashboardSidebar />
          <div className="col-lg-9">
            <h4 className="title">Upload Curriculum</h4>
            <Form className="p-4 bg-white shadow-sm border rounded" onSubmit={handleSubmit}>
              {curriculum.map((subj, i) => (
                <div key={i} className="mb-5">
                  <Form.Control
                    className="mb-3"
                    value={subj.subject}
                    onChange={(e) => {
                      const newData = [...curriculum];
                      newData[i].subject = e.target.value;
                      setCurriculum(newData);
                    }}
                    placeholder="Enter Subject"
                  />
                  {subj.chapters.map((chap, j) => (
                    <div key={j} className="border p-3 mb-4 rounded">
                      <Form.Label>Chapter {j + 1}</Form.Label>
                      <Form.Control
                        className="mb-3"
                        value={chap.chapter}
                        onChange={(e) => {
                          const newData = [...curriculum];
                          newData[i].chapters[j].chapter = e.target.value;
                          setCurriculum(newData);
                        }}
                        placeholder="Enter Chapter Title"
                      />
                      {chap.topics.map((topic, k) => (
                        <div key={k} className="bg-light p-3 rounded mb-2">
                          <Form.Control
                            className="mb-2"
                            value={topic.topic}
                            onChange={(e) => {
                              const newData = [...curriculum];
                              newData[i].chapters[j].topics[k].topic = e.target.value;
                              setCurriculum(newData);
                            }}
                            placeholder="Enter Topic"
                          />
                          <Form.Label>Has Subtopics?</Form.Label>
                          <div className="mb-2">
                            <Form.Check
                              inline
                              label="Yes"
                              type="radio"
                              name={`subtopic-${i}-${j}-${k}`}
                              checked={topic.hasSubtopics}
                              onChange={() => {
                                const newData = [...curriculum];
                                newData[i].chapters[j].topics[k].hasSubtopics = true;
                                if (!newData[i].chapters[j].topics[k].subtopics) {
                                  newData[i].chapters[j].topics[k].subtopics = [
                                    {
                                      title: "",
                                      youtubeUrl: "",
                                      pdfAccess: "VIEW",
                                      pdf: null,
                                      caseStudyAccess: "VIEW",
                                      caseStudy: null,
                                      mcqs: [],
                                    },
                                  ];
                                }
                                setCurriculum(newData);
                              }}
                            />
                            <Form.Check
                              inline
                              label="No"
                              type="radio"
                              name={`subtopic-${i}-${j}-${k}`}
                              checked={!topic.hasSubtopics}
                              onChange={() => {
                                const newData = [...curriculum];
                                newData[i].chapters[j].topics[k].hasSubtopics = false;
                                delete newData[i].chapters[j].topics[k].subtopics;
                                setCurriculum(newData);
                              }}
                            />
                          </div>
                          {topic.hasSubtopics ? (
                            <div>
                              {topic.subtopics?.map((sub, s) => (
                                <div key={s} className="card mb-3 border-0 shadow-sm rounded-lg p-3 position-relative" style={{ background: '#f8fafc', borderLeft: '4px solid #0d6efd' }}>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h6 className="mb-0">Subtopic {s + 1}</h6>
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      className="rounded-3 px-2 py-1"
                                      style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                                      onClick={() => {
                                        const newData = [...curriculum];
                                        newData[i].chapters[j].topics[k].subtopics!.splice(s, 1);
                                        setCurriculum(newData);
                                      }}
                                    >
                                      ✕ Remove
                                    </Button>
                                  </div>
                                  <hr className="my-2" />
                                  <Form.Label>Subtopic Title</Form.Label>
                                  <Form.Control
                                    className="mb-2"
                                    value={sub.title}
                                    onChange={(e) => {
                                      const newData = [...curriculum];
                                      newData[i].chapters[j].topics[k].subtopics![s].title = e.target.value;
                                      setCurriculum(newData);
                                    }}
                                    placeholder="Enter Subtopic Title"
                                  />
                                  <Form.Label>YouTube Link</Form.Label>
                                  <Form.Control
                                    className="mb-2"
                                    value={sub.youtubeUrl}
                                    onChange={(e) => {
                                      const newData = [...curriculum];
                                      newData[i].chapters[j].topics[k].subtopics![s].youtubeUrl = e.target.value;
                                      setCurriculum(newData);
                                    }}
                                    placeholder="Enter YouTube Link"
                                  />
                                  <div className="row g-2 align-items-end mb-2">
                                    <div className="col-md-6">
                                      <Form.Label>PDF</Form.Label>
                                      <div className="d-flex align-items-center">
                                        <Form.Select
                                          style={{ maxWidth: 120, marginRight: 8 }}
                                          value={sub.pdfAccess}
                                          onChange={(e) => {
                                            const newData = [...curriculum];
                                            newData[i].chapters[j].topics[k].subtopics![s].pdfAccess = e.target.value;
                                            setCurriculum(newData);
                                          }}
                                        >
                                          <option value="VIEW">VIEW</option>
                                          <option value="DOWNLOAD">DOWNLOAD</option>
                                          <option value="PAID">PAID</option>
                                        </Form.Select>
                                        <Form.Control
                                          type="file"
                                          id={`sub-pdf-${i}-${j}-${k}-${s}`}
                                          style={{ maxWidth: 280 }}
                                          onChange={e => handleFileChange((e.target as HTMLInputElement).files?.[0] || null, "pdf", i, j, k, s)}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <Form.Label>Case Study</Form.Label>
                                      <div className="d-flex align-items-center">
                                        <Form.Select
                                          style={{ maxWidth: 120, marginRight: 8 }}
                                          value={sub.caseStudyAccess}
                                          onChange={(e) => {
                                            const newData = [...curriculum];
                                            newData[i].chapters[j].topics[k].subtopics![s].caseStudyAccess = e.target.value;
                                            setCurriculum(newData);
                                          }}
                                        >
                                          <option value="VIEW">VIEW</option>
                                          <option value="DOWNLOAD">DOWNLOAD</option>
                                          <option value="PAID">PAID</option>
                                        </Form.Select>
                                        <Form.Control
                                          type="file"
                                          id={`sub-case-${i}-${j}-${k}-${s}`}
                                          style={{ maxWidth: 280 }}
                                          onChange={e => handleFileChange((e.target as HTMLInputElement).files?.[0] || null, "caseStudy", i, j, k, s)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <Form.Label>MCQs</Form.Label>
                                  {renderMCQs(
                                    sub.mcqs,
                                    (mcqIdx, field, value) => {
                                      const newData = [...curriculum];
                                      newData[i].chapters[j].topics[k].subtopics![s].mcqs = [
                                        ...newData[i].chapters[j].topics[k].subtopics![s].mcqs,
                                      ];
                                      newData[i].chapters[j].topics[k].subtopics![s].mcqs[mcqIdx] = {
                                        ...newData[i].chapters[j].topics[k].subtopics![s].mcqs[mcqIdx],
                                        [field]: value,
                                      };
                                      setCurriculum(newData);
                                    },
                                    () => {
                                      const newData = [...curriculum];
                                      newData[i].chapters[j].topics[k].subtopics![s].mcqs.push({
                                        question: "",
                                        options: ["", "", "", ""],
                                        correctAnswerIndex: 0,
                                      });
                                      setCurriculum(newData);
                                    }
                                  )}
                                </div>
                              ))}
                              <div className="d-flex justify-content-end">
                                <Button
                                  size="sm"
                                  variant="outline-info"
                                  className="rounded-3 px-2 py-1 mt-2"
                                  style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                                  onClick={() => {
                                    const newData = [...curriculum];
                                    newData[i].chapters[j].topics[k].subtopics!.push({
                                      title: "",
                                      youtubeUrl: "",
                                      pdfAccess: "VIEW",
                                      pdf: null,
                                      caseStudyAccess: "VIEW",
                                      caseStudy: null,
                                      mcqs: [],
                                    });
                                    setCurriculum(newData);
                                  }}
                                >
                                  ＋ Add Subtopic
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Form.Label>YouTube Link</Form.Label>
                              <Form.Control
                                className="mb-2"
                                value={topic.youtubeUrl || ""}
                                onChange={(e) => {
                                  if (!editCurriculum) return;
                                  const newData: Curriculum = {
                                    id: editCurriculum.id ?? "",
                                    subject: editCurriculum.subject ?? "",
                                    chapters: editCurriculum.chapters ? [...editCurriculum.chapters] : [],
                                  };
                                  if (
                                    newData.chapters &&
                                    newData.chapters[j] &&
                                    newData.chapters[j].topics &&
                                    newData.chapters[j].topics[k]
                                  ) {
                                    newData.chapters[j].topics[k].youtubeUrl = e.target.value;
                                    setEditCurriculum(newData);
                                  }
                                }}
                              />
                              <div className="row g-2 align-items-end mb-2">
                                <div className="col-md-6">
                                  <Form.Label>PDF</Form.Label>
                                  {topic.pdf && typeof topic.pdf === "string" && (
                                    <a href={topic.pdf} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>View PDF</a>
                                  )}
                                  <div className="d-flex align-items-center">
                                    <Form.Select
                                      style={{ maxWidth: 120, marginRight: 8 }}
                                      value={topic.pdfAccess || "VIEW"}
                                      onChange={(e) => {
                                        if (!editCurriculum) return;
                                        const newData: Curriculum = {
                                          id: editCurriculum.id ?? "",
                                          subject: editCurriculum.subject ?? "",
                                          chapters: editCurriculum.chapters ? [...editCurriculum.chapters] : [],
                                        };
                                        if (
                                          newData.chapters &&
                                          newData.chapters[j] &&
                                          newData.chapters[j].topics &&
                                          newData.chapters[j].topics[k]
                                        ) {
                                          newData.chapters[j].topics[k].pdfAccess = e.target.value;
                                          setEditCurriculum(newData);
                                        }
                                      }}
                                    >
                                      <option value="VIEW">VIEW</option>
                                      <option value="DOWNLOAD">DOWNLOAD</option>
                                      <option value="PAID">PAID</option>
                                    </Form.Select>
                                    <Form.Control
                                      type="file"
                                      id={`edit-topic-pdf-${j}-${k}`}
                                      style={{ maxWidth: 280 }}
                                      onChange={e => {
                                        const file = (e.target as HTMLInputElement).files?.[0] || null;
                                        if (!editCurriculum) return;
                                        const newData: Curriculum = {
                                          id: editCurriculum.id ?? "",
                                          subject: editCurriculum.subject ?? "",
                                          chapters: editCurriculum.chapters ? [...editCurriculum.chapters] : [],
                                        };
                                        if (
                                          newData.chapters &&
                                          newData.chapters[j] &&
                                          newData.chapters[j].topics &&
                                          newData.chapters[j].topics[k]
                                        ) {
                                          newData.chapters[j].topics[k].pdf = file;
                                          setEditCurriculum(newData);
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <Form.Label>Case Study</Form.Label>
                                  {topic.caseStudy && typeof topic.caseStudy === "string" && (
                                    <a href={topic.caseStudy} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>View Case Study</a>
                                  )}
                                  <div className="d-flex align-items-center">
                                    <Form.Select
                                      style={{ maxWidth: 120, marginRight: 8 }}
                                      value={topic.caseStudyAccess || "VIEW"}
                                      onChange={(e) => {
                                        if (!editCurriculum) return;
                                        const newData: Curriculum = {
                                          id: editCurriculum.id ?? "",
                                          subject: editCurriculum.subject ?? "",
                                          chapters: editCurriculum.chapters ? [...editCurriculum.chapters] : [],
                                        };
                                        if (
                                          newData.chapters &&
                                          newData.chapters[j] &&
                                          newData.chapters[j].topics &&
                                          newData.chapters[j].topics[k]
                                        ) {
                                          newData.chapters[j].topics[k].caseStudyAccess = e.target.value;
                                          setEditCurriculum(newData);
                                        }
                                      }}
                                    >
                                      <option value="VIEW">VIEW</option>
                                      <option value="DOWNLOAD">DOWNLOAD</option>
                                      <option value="PAID">PAID</option>
                                    </Form.Select>
                                    <Form.Control
                                      type="file"
                                      id={`edit-topic-case-${j}-${k}`}
                                      style={{ maxWidth: 280 }}
                                      onChange={e => {
                                        const file = (e.target as HTMLInputElement).files?.[0] || null;
                                        if (!editCurriculum) return;
                                        const newData: Curriculum = {
                                          id: editCurriculum.id ?? "",
                                          subject: editCurriculum.subject ?? "",
                                          chapters: editCurriculum.chapters ? [...editCurriculum.chapters] : [],
                                        };
                                        if (
                                          newData.chapters &&
                                          newData.chapters[j] &&
                                          newData.chapters[j].topics &&
                                          newData.chapters[j].topics[k]
                                        ) {
                                          newData.chapters[j].topics[k].caseStudy = file;
                                          setEditCurriculum(newData);
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <Form.Label>MCQs</Form.Label>
                              {renderMCQs(
                                topic.mcqs || [],
                                (mcqIdx, field, value) => {
                                  if (!editCurriculum) return;
                                  const newData: Curriculum = {
                                    id: editCurriculum.id ?? "",
                                    subject: editCurriculum.subject ?? "",
                                    chapters: editCurriculum.chapters ? [...editCurriculum.chapters] : [],
                                  };
                                  if (
                                    newData.chapters &&
                                    newData.chapters[j] &&
                                    newData.chapters[j].topics &&
                                    newData.chapters[j].topics[k]
                                  ) {
                                    if (!Array.isArray(newData.chapters[j].topics[k].mcqs)) {
                                      newData.chapters[j].topics[k].mcqs = [];
                                    }
                                    newData.chapters[j].topics[k].mcqs![mcqIdx] = {
                                      ...newData.chapters[j].topics[k].mcqs![mcqIdx],
                                      [field]: value,
                                    };
                                    setEditCurriculum(newData);
                                  }
                                },
                                () => {
                                  if (!editCurriculum) return;
                                  const newData: Curriculum = {
                                    id: editCurriculum.id ?? "",
                                    subject: editCurriculum.subject ?? "",
                                    chapters: editCurriculum.chapters ? [...editCurriculum.chapters] : [],
                                  };
                                  if (
                                    newData.chapters &&
                                    newData.chapters[j] &&
                                    newData.chapters[j].topics &&
                                    newData.chapters[j].topics[k]
                                  ) {
                                    if (!Array.isArray(newData.chapters[j].topics[k].mcqs)) {
                                      newData.chapters[j].topics[k].mcqs = [];
                                    }
                                    newData.chapters[j].topics[k].mcqs!.push({
                                      question: "",
                                      options: ["", "", "", ""],
                                      correctAnswerIndex: 0,
                                    });
                                    setEditCurriculum(newData);
                                  }
                                }
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      <Button
                        size="sm"
                        variant="outline-success"
                        className="rounded-3 px-2 py-1 mt-2"
                        style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                        onClick={() => {
                          const newData = [...curriculum];
                          newData[i].chapters[j].topics.push({
                            topic: "",
                            hasSubtopics: false,
                            youtubeUrl: "",
                            pdfAccess: "VIEW",
                            pdf: null,
                            caseStudyAccess: "VIEW",
                            caseStudy: null,
                            mcqs: [],
                          });
                          setCurriculum(newData);
                        }}
                      >
                        ＋ Add Topic
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline-dark"
                    className="rounded-3 px-2 py-1 mt-3"
                    style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                    onClick={() => {
                      const newData = [...curriculum];
                      newData[i].chapters.push({
                        chapter: "",
                        topics: [
                          {
                            topic: "",
                            hasSubtopics: true,
                            subtopics: [
                              {
                                title: "",
                                youtubeUrl: "",
                                pdfAccess: "VIEW",
                                pdf: null,
                                caseStudyAccess: "VIEW",
                                caseStudy: null,
                                mcqs: [],
                              },
                            ],
                          },
                        ],
                      });
                      setCurriculum(newData);
                    }}
                  >
                    ＋ Add Chapter
                  </Button>
                </div>
              ))}
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="rounded-3 px-3 py-1 mt-4"
                style={{ fontSize: '1rem', fontWeight: 500, boxShadow: 'none', letterSpacing: '0.5px' }}
              >
                Submit Curriculum
              </Button>
            </Form>

            <hr className="my-5" />
            <h4 className="title mb-3">All Curriculums</h4>
            {loadingCurriculums ? (
              <div>Loading...</div>
            ) : (
              <div>
                {allCurriculums.length === 0 && (
                  <div className="text-center text-muted mb-4">No curriculums found.</div>
                )}
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Chapters</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCurriculums.map((cur, idx) => {
                      const chapters = Array.isArray(cur.chapters)
                        ? cur.chapters
                        : typeof cur.chapters === "string"
                        ? JSON.parse(cur.chapters)
                        : [];
                      function startEdit(cur: Curriculum): void {
                        setEditCurriculum({
                          id: cur.id ?? "",
                          subject: cur.subject ?? "",
                          chapters: Array.isArray(cur.chapters)
                            ? cur.chapters
                            : typeof cur.chapters === "string"
                            ? JSON.parse(cur.chapters)
                            : [],
                        });
                      }

                      async function handleDelete(id: string): Promise<void> {
                        if (!window.confirm("Are you sure you want to delete this curriculum?")) return;
                        await fetch(`/api/curriculum/${id}`, { method: "DELETE" });
                        fetchCurriculums();
                      }

                      return (
                        <tr key={cur.id || idx}>
                          <td style={{ fontWeight: 600 }}>{cur.subject}</td>
                          <td>
                            <ul style={{ paddingLeft: 18, marginBottom: 0 }}>
                              {chapters.map((chap: Chapter, cidx: number) => (
                                <li key={cidx}>
                                  <strong>Chapter {cidx + 1}:</strong> {chap.chapter}
                                  <ul style={{ paddingLeft: 18 }}>
                                    {chap.topics.map((topic, tidx) => (
                                      <li key={tidx}>
                                        <strong>Topic {tidx + 1}:</strong> {topic.topic}
                                        {topic.hasSubtopics && topic.subtopics && (
                                          <ul style={{ paddingLeft: 18 }}>
                                            {topic.subtopics.map((sub, sidx) => (
                                              <li key={sidx}>
                                                <strong>Subtopic {sidx + 1}:</strong> {sub.title}
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => startEdit(cur)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDelete(cur.id!)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Edit Modal */}
                {editCurriculum && (
                  <div className="modal show d-block" tabIndex={-1} style={{ background: "rgba(0,0,0,0.2)" }}>
                    <div className="modal-dialog modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Edit Curriculum: {editCurriculum.subject}</h5>
                          <button type="button" className="btn-close" onClick={cancelEdit}></button>
                        </div>
                        <div className="modal-body">
                          <Form>
                            <Form.Control
                              name="subject"
                              value={editCurriculum.subject}
                              onChange={(e) => setEditCurriculum({
                                ...editCurriculum,
                                subject: e.target.value ?? "",
                                chapters: editCurriculum.chapters ?? [],
                              })}
                              className="mb-3"
                              placeholder="Edit Subject"
                            />
                            {(editCurriculum.chapters ?? []).map((chap, j) => (
                              <div key={j} className="border p-3 mb-4 rounded">
                                <Form.Label>Chapter {j + 1}</Form.Label>
                                <Form.Control
                                  className="mb-3"
                                  value={chap.chapter}
                                  onChange={(e) => {
                                    const newData: Curriculum = {
                                      ...editCurriculum,
                                      chapters: [...(editCurriculum.chapters ?? [])],
                                    };
                                    newData.chapters[j].chapter = e.target.value;
                                    setEditCurriculum(newData);
                                  }}
                                  placeholder="Edit Chapter Title"
                                />
                                {(chap.topics ?? []).map((topic, k) => (
                                  <div key={k} className="bg-light p-3 rounded mb-2">
                                    <Form.Control
                                      className="mb-2"
                                      value={topic.topic}
                                      onChange={(e) => {
                                        const newData: Curriculum = {
                                          ...editCurriculum,
                                          chapters: [...(editCurriculum.chapters ?? [])],
                                        };
                                        newData.chapters[j].topics[k].topic = e.target.value;
                                        setEditCurriculum(newData);
                                      }}
                                      placeholder="Edit Topic"
                                    />
                                    <Form.Label>Has Subtopics?</Form.Label>
                                    <div className="mb-2">
                                      <Form.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        name={`subtopic-edit-${j}-${k}`}
                                        checked={topic.hasSubtopics}
                                        onChange={() => {
                                          const newData = { ...editCurriculum };
                                          newData.chapters[j].topics[k].hasSubtopics = true;
                                          if (!newData.chapters[j].topics[k].subtopics) {
                                            newData.chapters[j].topics[k].subtopics = [
                                              {
                                                title: "",
                                                youtubeUrl: "",
                                                pdfAccess: "VIEW",
                                                pdf: null,
                                                caseStudyAccess: "VIEW",
                                                caseStudy: null,
                                                mcqs: [],
                                              },
                                            ];
                                          }
                                          setEditCurriculum(newData);
                                        }}
                                      />
                                      <Form.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        name={`subtopic-edit-${j}-${k}`}
                                        checked={!topic.hasSubtopics}
                                        onChange={() => {
                                          if (!editCurriculum) return;
                                          const newData = JSON.parse(JSON.stringify(editCurriculum));
                                          newData.chapters[j].topics[k].hasSubtopics = false;
                                          delete newData.chapters[j].topics[k].subtopics;
                                          setEditCurriculum(newData);
                                        }}
                                      />
                                    </div>
                                    {topic.hasSubtopics ? (
                                      <div>
                                        {topic.subtopics?.map((sub, s) => (
                                          <div key={s} className="card mb-3 border-0 shadow-sm rounded-lg p-3 position-relative">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                              <h6 className="mb-0">Subtopic {s + 1}</h6>
                                              <Button
                                                variant="outline-danger"
                                                size="sm"
                                                className="rounded-3 px-2 py-1"
                                                style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                                                onClick={() => {
                                                  const newData = { ...editCurriculum };
                                                  newData.chapters[j].topics[k].subtopics!.splice(s, 1);
                                                  setEditCurriculum(newData);
                                                }}
                                              >
                                                ✕ Remove
                                              </Button>
                                            </div>
                                            <hr className="my-2" />
                                            <Form.Label>Subtopic Title</Form.Label>
                                            <Form.Control
                                              className="mb-2"
                                              value={sub.title}
                                              onChange={(e) => {
                                                const newData = { ...editCurriculum };
                                                newData.chapters[j].topics[k].subtopics![s].title = e.target.value;
                                                setEditCurriculum(newData);
                                              }}
                                              placeholder="Edit Subtopic Title"
                                            />
                                            <Form.Label>YouTube Link</Form.Label>
                                            <Form.Control
                                              className="mb-2"
                                              value={sub.youtubeUrl}
                                              onChange={(e) => {
                                                const newData = { ...editCurriculum };
                                                newData.chapters[j].topics[k].subtopics![s].youtubeUrl = e.target.value;
                                                setEditCurriculum(newData);
                                              }}
                                              placeholder="Edit YouTube Link"
                                            />
                                            <div className="row g-2 align-items-end mb-2">
                                              <div className="col-md-6">
                                                <Form.Label>PDF</Form.Label>
                                                {sub.pdf && typeof sub.pdf === "string" && (
                                                  <a href={sub.pdf} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>View PDF</a>
                                                )}
                                                <div className="d-flex align-items-center">
                                                  <Form.Select
                                                    style={{ maxWidth: 120, marginRight: 8 }}
                                                    value={sub.pdfAccess}
                                                    onChange={(e) => {
                                                      const newData = { ...editCurriculum };
                                                      newData.chapters[j].topics[k].subtopics![s].pdfAccess = e.target.value;
                                                      setEditCurriculum(newData);
                                                    }}
                                                  >
                                                    <option value="VIEW">VIEW</option>
                                                    <option value="DOWNLOAD">DOWNLOAD</option>
                                                    <option value="PAID">PAID</option>
                                                  </Form.Select>
                                                  <Form.Control
                                                    type="file"
                                                    id={`edit-sub-pdf-${j}-${k}-${s}`}
                                                    style={{ maxWidth: 280 }}
                                                    onChange={e => {
                                                      const file = (e.target as HTMLInputElement).files?.[0] || null;
                                                      const newData = { ...editCurriculum };
                                                      newData.chapters[j].topics[k].subtopics![s].pdf = file;
                                                      setEditCurriculum(newData);
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <Form.Label>Case Study</Form.Label>
                                                {sub.caseStudy && typeof sub.caseStudy === "string" && (
                                                  <a href={sub.caseStudy} target="_blank" rel="noopener noreferrer" style={{ marginRight: 8 }}>View Case Study</a>
                                                )}
                                                <div className="d-flex align-items-center">
                                                  <Form.Select
                                                    style={{ maxWidth: 120, marginRight: 8 }}
                                                    value={sub.caseStudyAccess}
                                                    onChange={(e) => {
                                                      const newData = { ...editCurriculum };
                                                      newData.chapters[j].topics[k].subtopics![s].caseStudyAccess = e.target.value;
                                                      setEditCurriculum(newData);
                                                    }}
                                                  >
                                                    <option value="VIEW">VIEW</option>
                                                    <option value="DOWNLOAD">DOWNLOAD</option>
                                                    <option value="PAID">PAID</option>
                                                  </Form.Select>
                                                  <Form.Control
                                                    type="file"
                                                    id={`edit-sub-case-${j}-${k}-${s}`}
                                                    style={{ maxWidth: 280 }}
                                                    onChange={e => {
                                                      const file = (e.target as HTMLInputElement).files?.[0] || null;
                                                      const newData = { ...editCurriculum };
                                                      newData.chapters[j].topics[k].subtopics![s].caseStudy = file;
                                                      setEditCurriculum(newData);
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <Form.Label>MCQs</Form.Label>
                                            {renderMCQs(
                                              sub.mcqs,
                                              (mcqIdx, field, value) => {
                                                const newData = { ...editCurriculum };
                                                newData.chapters[j].topics[k].subtopics![s].mcqs = [
                                                  ...newData.chapters[j].topics[k].subtopics![s].mcqs,
                                                ];
                                                newData.chapters[j].topics[k].subtopics![s].mcqs[mcqIdx] = {
                                                  ...newData.chapters[j].topics[k].subtopics![s].mcqs[mcqIdx],
                                                  [field]: value,
                                                };
                                                setEditCurriculum(newData);
                                              },
                                              () => {
                                                const newData = { ...editCurriculum };
                                                newData.chapters[j].topics[k].subtopics![s].mcqs.push({
                                                  question: "",
                                                  options: ["", "", "", ""],
                                                  correctAnswerIndex: 0,
                                                });
                                                setEditCurriculum(newData);
                                              }
                                            )}
                                          </div>
                                        ))}
                                        <div className="d-flex justify-content-end">
                                          <Button
                                            size="sm"
                                            variant="outline-info"
                                            className="rounded-3 px-2 py-1 mt-2"
                                            style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                                            onClick={() => {
                                              const newData = { ...editCurriculum };
                                              newData.chapters[j].topics[k].subtopics!.push({
                                                title: "",
                                                youtubeUrl: "",
                                                pdfAccess: "VIEW",
                                                pdf: null,
                                                caseStudyAccess: "VIEW",
                                                caseStudy: null,
                                                mcqs: [],
                                              });
                                              setEditCurriculum(newData);
                                            }}
                                          >
                                            ＋ Add Subtopic
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div>
                                        {/* Topic fields for YouTube, PDF, MCQ, etc. */}
                                      </div>
                                    )}
                                  </div>
                                ))}
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  className="rounded-3 px-2 py-1 mt-2"
                                  style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                                  onClick={() => {
                                    const newData = { ...editCurriculum };
                                    newData.chapters[j].topics.push({
                                      topic: "",
                                      hasSubtopics: false,
                                      youtubeUrl: "",
                                      pdfAccess: "VIEW",
                                      pdf: null,
                                      caseStudyAccess: "VIEW",
                                      caseStudy: null,
                                      mcqs: [],
                                    });
                                    setEditCurriculum(newData);
                                  }}
                                >
                                  ＋ Add Topic
                                </Button>
                              </div>
                            ))}
                            <Button
                              size="sm"
                              variant="outline-dark"
                              className="rounded-3 px-2 py-1 mt-3"
                              style={{ fontSize: '0.92rem', fontWeight: 500, boxShadow: 'none' }}
                              onClick={() => {
                                const newData = { ...editCurriculum };
                                newData.chapters.push({
                                  chapter: "",
                                  topics: [
                                    {
                                      topic: "",
                                      hasSubtopics: false,
                                      youtubeUrl: "",
                                      pdfAccess: "VIEW",
                                      pdf: null,
                                      caseStudyAccess: "VIEW",
                                      caseStudy: null,
                                      mcqs: [],
                                    },
                                  ],
                                });
                                setEditCurriculum(newData);
                              }}
                            >
                              ＋ Add Chapter
                            </Button>
                          </Form>
                        </div>
                        <div className="modal-footer">
                          <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
                          <button className="btn btn-primary" onClick={handleEditSubmit}>Save Changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadContent;