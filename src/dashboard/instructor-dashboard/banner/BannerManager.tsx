"use client";

import React, { useEffect, useState } from "react";
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar";
import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner";
import bg_img from "@/assets/img/bg/dashboard_bg.jpg"
import Image from "next/image"

type Banner = { id?: string; title: string; subtitle?: string; video?: string; poster?: string; videoUrl?: string; posterUrl?: string };

export default function BannerManager() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [form, setForm] = useState<Banner>({ title: "", subtitle: "", video: "", poster: "" });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/instructor/banner");
      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch {
      setBanners([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        // Update existing
        await fetch(`/api/instructor/banner?id=${encodeURIComponent(editId)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            subtitle: form.subtitle,
            videoUrl: form.video,
            posterUrl: form.poster,
          }),
        });
      } else {
        // Create new
        await fetch("/api/instructor/banner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            subtitle: form.subtitle,
            videoUrl: form.video,
            posterUrl: form.poster,
          }),
        });
      }
      setForm({ title: "", subtitle: "", video: "", poster: "" });
      setEditId(null);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id?: string) => {
    if (!id) return;
    setLoading(true);
    try {
      await fetch(`/api/instructor/banner?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dashboard__area section-pb-120">
         <div className="dashboard__bg"><Image src={bg_img} alt=""/></div>
         <div className="container">
            <DashboardBanner />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebar />

            <div className="col-lg-6" style={{ padding: 12 }}>
              <h3>Banner Videos</h3>

              <form onSubmit={createOrUpdate} style={{ display: "grid", gap: 8, maxWidth: 720 }}>
                <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
                <input placeholder="Video URL" value={form.video} onChange={(e) => setForm({ ...form, video: e.target.value })} required />
                <input placeholder="Poster URL (optional)" value={form.poster} onChange={(e) => setForm({ ...form, poster: e.target.value })} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editId ? "Update" : "Create / Add"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ title: "", subtitle: "", video: "", poster: "" });
                      setEditId(null);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>

              <hr />

              <h4>Existing Banners</h4>
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {banners.map((b) => {
                  const videoSrc = b.video || b.videoUrl || "";
                  const posterSrc = b.poster || b.posterUrl || "";
                  return (
                    <li key={b.id} style={{ marginBottom: 12, border: "1px solid #eee", padding: 10, borderRadius: 8 }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ width: 160, height: 90, background: "#000", flex: "0 0 160px", borderRadius: 6, overflow: "hidden" }}>
                          {videoSrc ? (
                            <video src={videoSrc} poster={posterSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted preload="metadata" />
                          ) : (
                            <div style={{ width: "100%", height: "100%", background: "#111" }} />
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700 }}>{b.title}</div>
                          <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{b.subtitle}</div>
                          <div style={{ marginTop: 8 }}>
                            <button onClick={() => remove(b.id)} disabled={loading} style={{ marginRight: 8 }}>Delete</button>
                            <button
                              onClick={() => {
                                setForm({
                                  title: b.title,
                                  subtitle: b.subtitle || "",
                                  video: b.video || b.videoUrl || "",
                                  poster: b.poster || b.posterUrl || "",
                                });
                                setEditId(b.id || null);
                              }}
                              style={{ marginRight: 8 }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}