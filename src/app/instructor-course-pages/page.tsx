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
  const [showPdfIdx, setShowPdfIdx] = useState<number | null>(null);
  const [showCaseIdx, setShowCaseIdx] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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

  // Upload file and get URL from Cloudinary
  async function handleFileUpload(file: File) {
    try {
      console.log("🔥 Starting file upload:", { name: file.name, size: file.size, type: file.type });
      
      const formData = new FormData();
      formData.append("file", file);
      
      console.log("📤 Sending request to /api/upload-file");
      const res = await fetch("/api/upload-file", { method: "POST", body: formData });
      
      console.log("📥 Upload response status:", res.status);
      
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("❌ Upload failed with status:", res.status, text);
        throw new Error(`Upload failed (${res.status}) ${text}`);
      }
      
      const data = await res.json();
      console.log("📋 Upload response data:", data);
      
      if (!data || typeof data.url !== "string") {
        console.error("❌ Invalid upload response:", data);
        throw new Error("Upload response missing 'url'");
      }
      
      console.log("✅ File uploaded successfully:", data.url);
      return data.url;
    } catch (err) {
      console.error("💥 handleFileUpload error:", err);
      setErrorMessage(`Failed to upload file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      throw err;
    }
  }

  // Helper to convert File/string/null to URL or null
  const toUrl = async (v: File | string | null | undefined) => {
    console.log("🔄 toUrl called with:", v ? `${v.constructor.name} - ${v instanceof File ? v.name : v}` : 'null/undefined');
    
    if (v instanceof File) {
      try {
        console.log("📤 Converting file to URL:", v.name);
        const url = await handleFileUpload(v);
        console.log("✅ File converted to URL:", url);
        return url;
      } catch (error) {
        console.error("❌ Error uploading file:", error);
        // Return null instead of throwing to prevent submission failure
        return null;
      }
    }
    
    const result = typeof v === "string" && v.trim() ? v : null;
    console.log("📝 String/null result:", result);
    return result;
  };

  // Submit handler with enhanced logging
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setSaving(true);

    try {
      console.log("🚀 Starting curriculum submission");
      const src = curriculum[0];
      
      console.log("📊 Source curriculum:", JSON.stringify(src, null, 2));

      const chapters = await Promise.all(
        (src.chapters || []).map(async (chapter, chapterIndex) => {
          console.log(`📚 Processing chapter ${chapterIndex + 1}:`, chapter.chapter);
          
          return {
            chapter: chapter.chapter || "",
            topics: await Promise.all(
              (chapter.topics || []).map(async (t, topicIndex) => {
                console.log(`📖 Processing topic ${topicIndex + 1}:`, t.topic);
                
                if (t.hasSubtopics) {
                  return {
                    topic: t.topic || "",
                    hasSubtopics: true,
                    subtopics: await Promise.all(
                      (t.subtopics || []).map(async (s, subtopicIndex) => {
                        console.log(`📄 Processing subtopic ${subtopicIndex + 1}:`, s.title);
                        console.log(`🔗 PDF file:`, s.pdf);
                        console.log(`📋 Case study file:`, s.caseStudy);
                        
                        const pdfUrl = await toUrl(s.pdf);
                        const caseStudyUrl = await toUrl(s.caseStudy);
                        
                        console.log(`✅ PDF URL result:`, pdfUrl);
                        console.log(`✅ Case study URL result:`, caseStudyUrl);
                        
                        return {
                          title: s.title || "",
                          youtubeUrl: s.youtubeUrl || "",
                          pdfAccess: s.pdfAccess || "VIEW",
                          pdf: pdfUrl,
                          caseStudyAccess: s.caseStudyAccess || "VIEW",
                          caseStudy: caseStudyUrl,
                          mcqs: (s.mcqs || []).map(m => ({
                            question: m.question || "",
                            options: Array.isArray(m.options) ? m.options : ["", "", "", ""],
                            correctAnswerIndex: Number.isInteger(m.correctAnswerIndex) ? m.correctAnswerIndex : 0,
                            explanation: "",
                          })),
                        };
                      })
                    ),
                  };
                }
                
                console.log(`📝 Topic PDF file:`, t.pdf);
                console.log(`📋 Topic case study file:`, t.caseStudy);
                
                const topicPdfUrl = await toUrl(t.pdf);
                const topicCaseStudyUrl = await toUrl(t.caseStudy);
                
                console.log(`✅ Topic PDF URL result:`, topicPdfUrl);
                console.log(`✅ Topic case study URL result:`, topicCaseStudyUrl);
                
                return {
                  topic: t.topic || "",
                  hasSubtopics: false,
                  youtubeUrl: t.youtubeUrl || "",
                  pdfAccess: t.pdfAccess || "VIEW",
                  pdf: topicPdfUrl,
                  caseStudyAccess: t.caseStudyAccess || "VIEW",
                  caseStudy: topicCaseStudyUrl,
                  mcqs: (t.mcqs || []).map(m => ({
                    question: m.question || "",
                    options: Array.isArray(m.options) ? m.options : ["", "", "", ""],
                    correctAnswerIndex: Number.isInteger(m.correctAnswerIndex) ? m.correctAnswerIndex : 0,
                    explanation: "",
                  })),
                };
              })
            ),
          };
        })
      );

      const payload = { subject: src.subject || "", chapters };
      
      console.log("📤 Final payload being sent:", JSON.stringify(payload, null, 2));

      const res = await fetch("/api/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Failed to save curriculum (${res.status}) ${txt}`);
      }

      setSuccessMessage("Curriculum submitted successfully");
      
      // reset + refresh
      setCurriculum([{
        subject: "",
        chapters: [{
          chapter: "",
          topics: [{
            topic: "",
            hasSubtopics: false,
            youtubeUrl: "",
            pdfAccess: "VIEW",
            pdf: null,
            caseStudyAccess: "VIEW",
            caseStudy: null,
            mcqs: [],
          }],
        }],
      }]);
      fetchCurriculums();
    } catch (err: any) {
      console.error("💥 handleSubmit error:", err);
      setErrorMessage(err?.message ?? "Error submitting curriculum");
    } finally {
      setSaving(false);
    }
  };

  // Edit handler: upload files, build curriculum JSON, send to backend
  async function handleEditSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    if (!editCurriculum) return;
    setErrorMessage(null);
    setSaving(true);
    
    try {
      console.log("🚀 Starting EDIT curriculum submission");
      console.log("📊 Edit curriculum data:", JSON.stringify(editCurriculum, (key, value) => {
        if (value instanceof File) {
          return `[File: ${value.name}]`;
        }
        return value;
      }, 2));

      // FIX: Don't deep clone with JSON.parse/stringify as it loses File objects
      // Instead, work directly with the editCurriculum object
      const updatedCurriculum: Curriculum = {
        id: editCurriculum.id ?? "",
        subject: editCurriculum.subject ?? "",
        chapters: editCurriculum.chapters || [],
      };

      console.log("🔄 Processing edit chapters for file uploads...");

      for (const chapter of updatedCurriculum.chapters) {
        for (const topic of chapter.topics) {
          console.log("📖 Processing topic:", topic.topic);
          
          if (topic.pdf instanceof File) {
            console.log("📄 Uploading topic PDF:", topic.pdf.name);
            topic.pdf = await handleFileUpload(topic.pdf);
            console.log("✅ Topic PDF uploaded:", topic.pdf);
          }
          
          if (topic.caseStudy instanceof File) {
            console.log("📋 Uploading topic case study:", topic.caseStudy.name);
            topic.caseStudy = await handleFileUpload(topic.caseStudy);
            console.log("✅ Topic case study uploaded:", topic.caseStudy);
          }
          
          if (topic.hasSubtopics && topic.subtopics) {
            for (const sub of topic.subtopics) {
              console.log("📄 Processing subtopic:", sub.title);
              
              if (sub.pdf instanceof File) {
                console.log("📄 Uploading subtopic PDF:", sub.pdf.name);
                sub.pdf = await handleFileUpload(sub.pdf);
                console.log("✅ Subtopic PDF uploaded:", sub.pdf);
              }
              
              if (sub.caseStudy instanceof File) {
                console.log("📋 Uploading subtopic case study:", sub.caseStudy.name);
                sub.caseStudy = await handleFileUpload(sub.caseStudy);
                console.log("✅ Subtopic case study uploaded:", sub.caseStudy);
              }
            }
          }
        }
      }

      console.log("📤 Final edit payload:", JSON.stringify(updatedCurriculum, null, 2));

      const res = await fetch(`/api/curriculum/${editCurriculum.id}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCurriculum),
      });
      
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Failed to update (${res.status}) ${txt}`);
      }

      setEditCurriculum(null);
      await fetchCurriculums();
      setSuccessMessage("Curriculum updated");
    } catch (err: any) {
      console.error("💥 handleEditSubmit error:", err);
      setErrorMessage(err?.message ?? "Error updating curriculum");
    } finally {
      setSaving(false);
    }
  }

  // File input handlers
  const handleFileChange = (
    file: File | null,
    type: "pdf" | "caseStudy",
    i: number,
    j: number,
    k: number,
    s?: number
  ) => {
    console.log(`📁 File selected:`, { 
      file: file ? { 
        name: file.name, 
        size: file.size, 
        type: file.type,
        lastModified: file.lastModified 
      } : null, 
      type, 
      location: { i, j, k, s },
      isSubtopic: typeof s === "number"
    });
    
    const newData = [...curriculum];
    if (typeof s === "number") {
      // Subtopic file
      console.log(`📂 Setting subtopic file: chapters[${i}].topics[${k}].subtopics[${s}].${type}`);
      newData[i].chapters[j].topics[k].subtopics![s][type] = file;
      console.log(`✅ Subtopic file set:`, newData[i].chapters[j].topics[k].subtopics![s][type]);
    } else {
      // Topic file
      console.log(`📂 Setting topic file: chapters[${i}].topics[${k}].${type}`);
      newData[i].chapters[j].topics[k][type] = file;
      console.log(`✅ Topic file set:`, newData[i].chapters[j].topics[k][type]);
    }
    setCurriculum(newData);
    
    // Log the entire curriculum state after update
    console.log(`📊 Updated curriculum state:`, JSON.stringify(newData, (key, value) => {
      if (value instanceof File) {
        return `[File: ${value.name}]`;
      }
      return value;
    }, 2));
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
                                  {topic.pdf && typeof topic.pdf === "string" ? (
                                    <>
                                      <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => setShowPdfIdx(showPdfIdx === k ? null : k)}
                                      >
                                        {showPdfIdx === k ? "Hide PDF" : "View PDF"}
                                      </Button>
                                      {showPdfIdx === k && (
                                        <div style={{ marginTop: 10 }}>
                                          <iframe
                                            src={topic.pdf}
                                            width="100%"
                                            height="400px"
                                            style={{ border: "1px solid #ccc" }}
                                          />
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <span className="text-muted">No PDF available</span>
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