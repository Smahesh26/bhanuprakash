"use client";
import { useEffect, useState } from "react";
import HeaderSeven from "@/layouts/headers/HeaderSeven";

interface LatestVideo {
  id: string;
  title: string;
  tag: string;
  review: string;
  price: number;
  lesson: string;
  student: number;
  thumb: string;
  youtubeUrl?: string;
}

export default function LatestVideosPage() {
  const [videos, setVideos] = useState<LatestVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<LatestVideo | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/latest-videos");
        const data = await res.json();
        if (Array.isArray(data)) setVideos(data);
        else if (Array.isArray(data.data)) setVideos(data.data);
        else setVideos([]);
      } catch (err) {
        setVideos([]);
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
      <HeaderSeven />
    <section
      className="courses-area-six py-5 mb-5"
      style={{
        background:
          "radial-gradient(1200px 600px at 10% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%), linear-gradient(120deg,#fec107 0%, #f5b200 55%, #230908 120%)",
        minHeight: "600px",
        width: "100%",
        boxShadow: "0 8px 32px #23090822",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .courses-area-six { position: relative; z-index: 2; }
        .courses-area-six::before{
          content:"";
          position:absolute; inset:-20%;
          background:
            radial-gradient(900px 300px at 80% 10%, rgba(35,9,8,.15), transparent 60%),
            radial-gradient(700px 280px at 20% 100%, rgba(35,9,8,.12), transparent 60%);
          pointer-events:none;
          filter: blur(10px);
        }
        .courses__item-eight {
          background: #fffef5;
          border-radius: 22px;
          border: 2.5px solid #fec107;
          box-shadow:
            0 16px 40px rgba(35,9,8,0.20),
            0 2px 10px rgba(254,193,7,0.35),
            inset 0 1px 0 rgba(255,255,255,0.8);
          transition: transform .35s cubic-bezier(.21,.6,.36,1), box-shadow .35s, filter .35s;
          overflow: hidden;
          position: relative;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform-style: preserve-3d;
          perspective: 1000px;
          will-change: transform, box-shadow;
        }
        .courses__item-eight:hover {
          box-shadow:
            0 36px 80px rgba(35,9,8,0.35),
            0 8px 28px rgba(254,193,7,0.45);
          filter: drop-shadow(0 0 18px rgba(254,193,7,.45)) brightness(1.05);
        }
        .courses__item-eight::before {
          content:"";
          position:absolute; inset:0;
          background: linear-gradient(120deg, rgba(254,193,7,.08) 0%, rgba(35,9,8,.08) 100%);
          opacity: 0; transition: opacity .35s;
          <div className="text-center mt-4">
            <a className="btn btn-primary" style={{background:'#fec107',color:'#230908',fontWeight:700,padding:'12px 32px',borderRadius:'14px',fontSize:'18px',boxShadow:'0 2px 8px #23090822',marginTop:'16px',display:'inline-block'}} href="/latest-videos">
              Explore All Latest Videos
            </a>
          </div>
        }
        .courses__item-eight:hover::before { opacity: 1; }
      </>
        .courses__item-thumb-seven {
          position: relative;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
          background: #fec107;
          box-shadow: inset 0 -1px 0 rgba(35,9,8,.15);
        }
        .courses__item-tag-three {
          position: absolute;
          top: 14px;
          left: 14px;
          background: linear-gradient(90deg,#230908,#fec107);
          color: #fff;
          padding: 6px 16px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .6px;
          border: 2px solid rgba(35,9,8,.25);
          box-shadow: 0 4px 10px rgba(35,9,8,.22);
          transform: translateZ(30px);
        }
        .play-overlay {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%) translateZ(30px);
          background: linear-gradient(120deg,#fec107 60%,#230908 100%);
          border-radius: 50%;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 18px rgba(35,9,8,.35);
          border: 2px solid rgba(35,9,8,.25);
          animation: pulse 1.2s infinite;
          z-index: 2;
        }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(254,193,7,.35); }
          70%  { box-shadow: 0 0 0 14px rgba(254,193,7,.10); }
          100% { box-shadow: 0 0 0 0 rgba(254,193,7,.35); }
        }
        .courses__item-content-seven {
          padding: 22px 20px 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(180deg, #fffefb 0%, #fff6d9 100%);
          border-radius: 0 0 22px 22px;
          box-shadow: inset 0 1px 0 rgba(254,193,7,.25);
        }
        .title.bold {
          font-weight: 900;
          font-size: 2.1rem;
          margin-top: 10px;
          color: #230908;
          letter-spacing: .5px;
          text-shadow: 0 2px 8px rgba(35,9,8,.12);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .courses__item-content-seven .title {
          font-weight: 800;
          font-size: 1.08rem;
          margin-bottom: 6px;
          color: #230908;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .courses__review { margin: 10px 0; display: flex; align-items: center; gap: 8px; }
        .courses__review .rating i { color: #fec107; margin-right: 2px; text-shadow: 0 1px 2px rgba(35,9,8,.15); }
        .courses__item-bottom-three {
          margin-top: 14px;
          background: linear-gradient(90deg,rgba(254,193,7,.16),rgba(35,9,8,.08) 80%);
          border-radius: 0 0 16px 16px;
          padding: 10px 0 0 0;
          display: flex; justify-content: space-between; gap: 8px;
        }
        .courses__item-bottom-three span {
          background: #fff;
          padding: 6px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          color: #230908;
          display: flex; align-items: center; gap: 6px;
          font-weight: 700;
          border: 1.5px solid rgba(254,193,7,.45);
          box-shadow: 0 1px 6px rgba(35,9,8,.08);
        }
        .courses__item-eight::after {
          content:"";
          position:absolute; left:0; bottom:0;
          width:100%; height: 38px;
          background: linear-gradient(90deg,#fec107 0%,#230908 100%);
          opacity: .18; pointer-events:none;
        }
        .courses__item-eight:hover::after { opacity: .28; }
      `}</style>
      <div className="container">
        <h1 className="title bold text-center mb-8">All Latest Videos</h1>
        <div className="row">
          {videos.map((video, index) => (
            <div key={video.id} className="col-lg-3 col-md-4 mb-5 d-flex" onClick={() => setSelectedVideo(video)} style={{cursor:'pointer'}}>
              <div
                className="courses__item-eight tilt-ready"
                style={{ height: "100%" }}
                data-aos="zoom-in"
                data-aos-delay={`${index * 80}`}
              >
                <span className="card-glow" aria-hidden />
                <div className="courses__item-thumb-seven">
                  <img
                    src={video.thumb}
                    alt={video.title}
                    style={{width:'100%',height:'180px',objectFit:'cover',borderRadius:'16px',boxShadow:'0 2px 12px rgba(254,193,7,.22)',transform:'translateZ(20px)'}}
                  />
                  <span className="courses__item-tag-three">{video.tag}</span>
                  {video.youtubeUrl && (
                    <span className="play-overlay">
                      <svg viewBox="0 0 24 24" fill="none" width="28" height="28" aria-hidden>
                        <circle cx="12" cy="12" r="12" fill="none" />
                        <polygon points="10,8 16,12 10,16" fill="#fff" />
                      </svg>
                    </span>
                  )}
                </div>
                <div className="courses__item-content-seven">
                  <h5 className="title">{video.title}</h5>
                  <div className="courses__review">
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star" />
                      ))}
                    </div>
                    <span style={{ fontWeight: 600, color: "#230908", fontSize: "13px" }}>
                      ({video.review}) Reviews
                    </span>
                  </div>
                  <div className="courses__item-bottom-three courses__item-bottom-five">
                    <span>
                      <i className="flaticon-book" /> Lessons {video.lesson}
                    </span>
                    <span>
                      <i className="skillgro-group" /> Students {video.student}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal Popup */}
        {selectedVideo && (
          <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.6)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(10px)'}}>
            <div className="popup-3d-modal animate-fadeIn" style={{position:'relative'}}>
              <button
                className="absolute top-3 right-3 text-3xl text-[#230908] hover:text-[#fec107] transition-colors duration-200"
                onClick={() => setSelectedVideo(null)}
                style={{background:'rgba(255,255,255,0.85)',borderRadius:'50%',width:'44px',height:'44px',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 12px #23090833',border:'none',cursor:'pointer',backdropFilter:'blur(2px)'}}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-[#230908] text-center" style={{textShadow:'0 2px 12px #fec10722'}}> {selectedVideo.title} </h2>
              {selectedVideo.youtubeUrl ? (
                <div style={{position:'relative',paddingBottom:'56.25%',height:0,overflow:'hidden',borderRadius:'24px',boxShadow:'0 8px 32px #23090855, 0 2px 12px #fec10744',background:'rgba(255,255,255,0.12)',backdropFilter:'blur(2px)'}}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeUrl.split('v=')[1]}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{width:'100%',height:'180px',borderRadius:'16px',boxShadow:'0 2px 12px rgba(254,193,7,.22)',background:'#000'}}
                  />
                </div>
              ) : (
                <img
                  src={selectedVideo.thumb}
                  alt={selectedVideo.title}
                  style={{width:'100%',height:'180px',objectFit:'cover',borderRadius:'16px',boxShadow:'0 2px 12px rgba(254,193,7,.22)',transform:'translateZ(20px)'}}
                />
              )}
              <style>{`
                @keyframes fadeIn {
                  0% { opacity: 0; transform: scale(0.95) rotateY(-8deg); }
                  100% { opacity: 1; transform: scale(1) rotateY(0deg); }
                }
                .animate-fadeIn { animation: fadeIn 0.35s cubic-bezier(.21,.6,.36,1); }
                .popup-3d-modal {
                  background: rgba(255,255,255,0.85);
                  border-radius: 32px;
                  box-shadow: 0 16px 48px #23090855, 0 2px 12px #fec10744, 0 1px 0 #fff;
                  padding: 2.5rem;
                  max-width: 640px;
                  width: 100%;
                  position: relative;
                  backdrop-filter: blur(8px);
                  border: 2.5px solid #fec107;
                  transform-style: preserve-3d;
                  perspective: 1200px;
                }
              `}</style>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  );
}
