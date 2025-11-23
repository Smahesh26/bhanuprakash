import React from 'react';

export default function Preloader() {
  return (
    <div className="preloader-root">
      <div className="preloader-content">
        <div className="preloader-spinner" />
        <h1 className="preloader-title">
          MedSchool <span className="preloader-accent">Simplified</span>
        </h1>
      </div>
      <style jsx>{`
        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, #0d447a 0%, #5dba47 100%);
          transition: background 0.4s;
        }
        .preloader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.8s cubic-bezier(.4,2,.3,1) both;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95) translateY(20px);}
          100% { opacity: 1; transform: scale(1) translateY(0);}
        }
        .preloader-spinner {
          width: 70px;
          height: 70px;
          border: 7px solid #fff;
          border-top: 7px solid #5dba47;
          border-right: 7px solid #0d447a;
          border-bottom: 7px solid #5dba47;
          border-radius: 50%;
          animation: spin 1.1s linear infinite, float 2.2s ease-in-out infinite alternate;
          margin-bottom: 36px;
          box-shadow: 0 4px 24px rgba(13,68,122,0.18);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0);}
          100% { transform: translateY(-16px);}
        }
        .preloader-title {
          font-size: 2.4rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 1px;
          text-align: center;
          text-shadow: 0 2px 18px #0d447a, 0 0px 2px #5dba47;
          animation: glowText 2.2s ease-in-out infinite alternate;
        }
        @keyframes glowText {
          0% { text-shadow: 0 2px 18px #0d447a, 0 0px 2px #5dba47; }
          100% { text-shadow: 0 4px 32px #5dba47, 0 0px 8px #0d447a; }
        }
        .preloader-accent {
          color: #5dba47;
          background: rgba(93,186,71,0.18);
          border-radius: 12px;
          padding: 0 10px;
          margin-left: 4px;
          box-shadow: 0 0 12px #5dba47;
          font-weight: 700;
          animation: accentPulse 1.8s infinite alternate;
        }
        @keyframes accentPulse {
          0% { background: rgba(93,186,71,0.18);}
          100% { background: rgba(93,186,71,0.32);}
        }
        @media (max-width: 600px) {
          .preloader-title { font-size: 1.3rem; }
          .preloader-spinner { width: 38px; height: 38px; }
        }
      `}</style>
    </div>
  );
}
