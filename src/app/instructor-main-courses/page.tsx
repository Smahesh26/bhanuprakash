"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar";
import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner";
import bg_img from "@/assets/img/bg/dashboard_bg.jpg";
import Link from "next/link";

type MainCourse = {
  id: string;
  title: string;
  subtitle?: string;
  thumb?: string | null;
  isFeatured?: boolean;
  isFree?: boolean;
  price?: number;
  courseIds: string[];
  createdAt?: string;
  description?: string;
  rating?: number;
  uploadedBy?: string;
  slug?: string;
};

export default function InstructorMainCoursesPage() {
  const [mainCourses, setMainCourses] = useState<MainCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState<number | "">("");
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch main courses on mount
  useEffect(() => {
    fetchMainCourses();
  }, []);

  const fetchMainCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/main-courses");
      const data = await res.json();
      setMainCourses(Array.isArray(data) ? data : []);
    } catch {
      setMainCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (thumbUrl) {
      setPreviewSrc(thumbUrl);
      return;
    }
    let objUrl: string | undefined;
    if (thumbFile) {
      objUrl = URL.createObjectURL(thumbFile);
      setPreviewSrc(objUrl);
    } else {
      setPreviewSrc(null);
    }
    return () => {
      if (objUrl) URL.revokeObjectURL(objUrl);
    };
  }, [thumbUrl, thumbFile]);

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const reset = () => {
    setTitle("");
    setSubtitle("");
    setThumbUrl("");
    setThumbFile(null);
    setIsFeatured(false);
    setIsFree(true);
    setPrice("");
    setCourseIds([]);
    setDescription("");
    setRating("");
    setUploadedBy("");
    setMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      let thumbBase64: string | undefined = undefined;
      if (thumbFile) {
        thumbBase64 = await fileToBase64(thumbFile);
      }

      const payload = {
        title,
        subtitle,
        thumb: thumbUrl || thumbBase64 || null,
        isFeatured,
        isFree,
        price: isFree ? 0 : Number(price) || 0,
        courseIds,
        description,
        rating: rating === "" ? null : Number(rating),
        uploadedBy,
      };

      let res;
      if (editId) {
        // Update existing main course
        res = await fetch(`/api/main-courses/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create new main course
        res = await fetch("/api/main-courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Failed to save");
      setMsg(editId ? "Main course updated!" : "Main course created!");
      reset();
      fetchMainCourses();
      setEditId(null);
    } catch (err: any) {
      setMsg("Error saving main course");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: MainCourse) => {
    setEditId(course.id);
    setTitle(course.title);
    setSubtitle(course.subtitle || "");
    setThumbUrl(course.thumb || "");
    setIsFeatured(!!course.isFeatured);
    setIsFree(!!course.isFree);
    setPrice(course.isFree ? "" : course.price ?? "");
    setCourseIds(course.courseIds);
    setDescription(course.description || "");
    setRating(course.rating ?? "");
    setUploadedBy(course.uploadedBy || "");
    setMsg(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this main course?")) return;
    try {
      const res = await fetch(`/api/main-courses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setMainCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <section className="dashboard__area section-pb-120">
      <div className="dashboard__bg">
        <Image src={bg_img} alt="bg" />
      </div>
      <div className="container">
        <DashboardBanner />
        <div className="dashboard__inner-wrap">
          <div className="row">
            <DashboardSidebar />
            <div className="col-lg-9">
              <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 8, marginBottom: 18 }}>
                <h4 style={{ marginTop: 0 }}>Add Main Course</h4>
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 920 }}>
                  <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <input placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                  <input placeholder="Short Description" value={description} onChange={e => setDescription(e.target.value)} />
                  <input
                    placeholder="Rating"
                    type="number"
                    min={0}
                    max={5}
                    value={rating as any}
                    onChange={e => setRating(e.target.value === "" ? "" : Number(e.target.value))}
                  />
                  <input placeholder="Uploaded By" value={uploadedBy} onChange={e => setUploadedBy(e.target.value)} />
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                      type="text"
                      placeholder="Thumbnail URL (preferred)"
                      value={thumbUrl}
                      onChange={(e) => {
                        setThumbUrl(e.target.value);
                        if (e.target.value) setThumbFile(null);
                      }}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        setThumbFile(f);
                        if (f) setThumbUrl("");
                      }}
                    />
                  </div>
                  {previewSrc && (
                    <div style={{ width: 140, height: 84, background: "#f3f3f3", borderRadius: 8, overflow: "hidden" }}>
                      <img src={previewSrc || ""} alt="thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <label>
                      <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                      Featured
                    </label>
                    <label>
                      <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} />
                      Free
                    </label>
                    {!isFree && (
                      <input
                        type="number"
                        placeholder="Price"
                        min={0}
                        value={price as any}
                        onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        style={{ width: 120 }}
                      />
                    )}
                  </div>
                  {/* Add courseIds selection UI as needed */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={loading}>
                      {loading ? "Saving..." : editId ? "Update Main Course" : "Create Main Course"}
                    </button>
                    <button type="button" onClick={reset}>Reset</button>
                  </div>
                  {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
                </form>
              </div>
              <div>
                <h5>Main Courses List</h5>
                {loading ? (
                  <div>Loading…</div>
                ) : (
                  <ul>
                    {mainCourses.map((mc) => (
                      <li key={mc.id} style={{ marginBottom: 16, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          {mc.thumb && <img src={mc.thumb} alt="" style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 6 }} />}
                          <div>
                            <div>
                              <b>{mc.title}</b> {mc.subtitle && <>- {mc.subtitle}</>}
                            </div>
                            <div style={{ fontSize: 13, color: "#666" }}>{mc.description}</div>
                            <div style={{ fontSize: 13, color: "#666" }}>
                              Uploaded by: {mc.uploadedBy || "N/A"} | Rating: {mc.rating !== undefined ? mc.rating : "N/A"}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                          <button
                            className="btn"
                            style={{ background: "#fff", color: "#fec107", border: "1px solid #fec107", padding: "5px 14px" }}
                            onClick={() => handleEdit(mc)}
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="btn"
                            style={{ background: "#fff", color: "#e74c3c", border: "1px solid #e74c3c", padding: "5px 14px" }}
                            onClick={() => handleDelete(mc.id)}
                            type="button"
                          >
                            Delete
                          </button>
                          <Link href={`/course-details/${mc.slug}`}>View</Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}