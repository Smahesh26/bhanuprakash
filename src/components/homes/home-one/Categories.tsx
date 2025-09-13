"use client";
import Link from "next/link";
import React from "react";

interface DataType {
  id: number;
  icon: string;
  title: string;
  total: string;
}

const category_data: DataType[] = [
  { id: 1, icon: "🧠", title: "Anatomy", total: "(12)" },
  { id: 2, icon: "🧪", title: "Biochemistry", total: "(10)" },
  { id: 3, icon: "❤️", title: "Physiology", total: "(15)" },
  { id: 4, icon: "🏥", title: "Community Medicine", total: "(8)" },
  { id: 5, icon: "💊", title: "Pharmacology", total: "(11)" },
  { id: 6, icon: "🦠", title: "Pathology", total: "(14)" },
  { id: 7, icon: "🧫", title: "Microbiology", total: "(9)" },
  { id: 8, icon: "⚖️", title: "Forensic Medicine", total: "(6)" },
  { id: 9, icon: "🩺", title: "Clinical Postings", total: "(10)" },
  { id: 10, icon: "💉", title: "OPD", total: "(7)" },
  { id: 11, icon: "👂", title: "ENT", total: "(5)" },
  { id: 12, icon: "👁️", title: "Ophthalmology", total: "(7)" },
  { id: 13, icon: "🧘", title: "Psychiatry", total: "(4)" },
  { id: 14, icon: "🧴", title: "Dermatology", total: "(3)" },
  { id: 15, icon: "👶", title: "Pediatrics", total: "(9)" },
  { id: 16, icon: "💤", title: "Anesthesiology", total: "(5)" },
  { id: 17, icon: "🦴", title: "Orthopaedics", total: "(6)" },
  { id: 18, icon: "🤰", title: "Obstetrics & Gynaecology", total: "(13)" },
];

const Categories = () => {
  return (
    <section className="categories-area section-py-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="section__title text-center mb-40">
              <span className="sub-title">Access a meticulously organized repository of medical sciences, tailored for academic rigor and clinical mastery.</span>
              <h2 className="title">Explore the Knowledge Hub</h2>
              <p className="desc">Pick your favorite specialty and start learning smarter, faster, better.</p>
            </div>
          </div>
        </div>

        <div className="row">
          {category_data.map((item, idx) => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                className="categories__item text-center p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-center align-items-center category-card"
                style={{ animationDelay: `${idx * 70}ms` }}
                role="button"
                aria-label={item.title}
              >
                <Link href="/courses" className="text-decoration-none text-dark w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                  <div
                    className="icon mb-3 d-flex justify-content-center align-items-center"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <span className="name d-block fw-bold mb-1">
                    {item.title}
                  </span>
                  <span className="courses text-muted">
                    {item.total}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        :root {
          --accent: #168e6a;
          --gold: #f9a116;
          --bg: #fbf9f8;
          --text: #0b1220;
        }

        .categories-area {
          background: radial-gradient(1200px 400px at 10% 10%, rgba(22,142,106,0.04), transparent 10%),
                      radial-gradient(800px 300px at 90% 90%, rgba(249,161,22,0.03), transparent 8%),
                      var(--bg);
          padding-top: 72px;
          padding-bottom: 72px;
        }

        .section__title .sub-title {
          display: inline-block;
          color: var(--accent);
          font-weight: 600;
          letter-spacing: 0.2px;
          opacity: 0.95;
        }
        .section__title .title {
          margin-top: 10px;
          font-size: 30px;
          color: var(--text);
          font-weight: 700;
          line-height: 1.15;
        }
        .section__title .desc {
          color: #556272;
          margin-top: 10px;
          max-width: 680px;
          margin-left: auto;
          margin-right: auto;
        }

        .slide-enter {
          opacity: 0;
          transform: translateY(8px) scale(0.995);
        }

        .category-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(250,250,252,0.98));
          border-radius: 14px;
          padding: 20px;
          transition: transform 280ms cubic-bezier(.2,.9,.2,1), box-shadow 280ms ease, border-color 280ms ease;
          border: 1px solid rgba(11,18,32,0.04);
          box-shadow:
            0 6px 18px rgba(11,18,32,0.04),
            0 18px 50px rgba(22,142,106,0.03);
          will-change: transform;
          position: relative;
          overflow: visible;
          animation: floatIn 520ms ease forwards;
          opacity: 0;
        }

        /* staggered appearance */
        .category-card[style] {
          /* inline animationDelay set per card */
          animation-delay: var(--delay, 0ms);
        }

        @keyframes floatIn {
          from { opacity: 0; transform: translateY(12px) scale(.997); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .category-card:hover {
          transform: translateY(-12px) translateZ(0) scale(1.01);
          box-shadow:
            0 22px 60px rgba(11,18,32,0.12),
            0 36px 120px rgba(22,142,106,0.06);
          border-color: rgba(22,142,106,0.14);
        }

        .icon {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(245,245,246,0.6));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: var(--accent);
          transition: transform 360ms cubic-bezier(.2,.9,.2,1), background 360ms ease, box-shadow 360ms ease;
          box-shadow: inset 0 -6px 18px rgba(11,18,32,0.02);
        }

        .category-card:hover .icon {
          transform: translateY(-6px) rotate(-6deg) scale(1.06);
          background: linear-gradient(135deg, var(--accent), #52b98f);
          color: #fff;
          box-shadow: 0 12px 36px rgba(22,142,106,0.18);
        }

        .name {
          font-size: 16px;
          color: var(--text);
          transition: color 220ms ease;
        }

        .courses {
          color: #6b7280;
          font-size: 14px;
        }

        /* subtle royal accent ribbon */
        .category-card::before {
          content: "";
          position: absolute;
          left: 12px;
          top: 12px;
          width: 42px;
          height: 4px;
          background: linear-gradient(90deg, var(--gold), #5624d0);
          border-radius: 4px;
          opacity: 0.07;
          transition: opacity 280ms ease, transform 280ms ease;
        }
        .category-card:hover::before { opacity: 1; transform: translateY(-2px); }

        /* responsive tweaks */
        @media (max-width: 992px) {
          .icon { width: 84px; height: 84px; font-size: 34px; }
        }
        @media (max-width: 576px) {
          .icon { width: 72px; height: 72px; font-size: 28px; }
          .section__title .title { font-size: 22px; }
        }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .category-card, .icon, .section__title .title { transition: none !important; animation: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Categories;
