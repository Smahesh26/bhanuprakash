"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum";
import Reviews from "./Reviews";
import Instructors from "./Instructors";

const tab_title: string[] = ["Overview", "Curriculum", "Instructors", "Reviews", "PDF Notes", "Get Started"];

const CourseDetailsArea = ({ single_course, user }: any) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (index === 5) {
      window.location.href = "/lesson";
    }
  };

  // Determine if the course is paid or free
  const isPaidCourse = single_course?.isPaid || single_course?.price_type === "Paid";
  const pdfUrl = `/pdf/${single_course?.slug}-notes.pdf`;

  return (
    <section className="courses__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="courses__details-thumb">
              <Image src={single_course?.thumb || "/default-course-image.jpg"} alt="Course Thumbnail" width={800} height={450} />
            </div>
            <div className="courses__details-content">
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link href={`/course/${single_course?.slug || "default-course"}`}>
                    {single_course?.category || "Development"}
                  </Link>
                </li>
                <li className="avg-rating">
                  <i className="fas fa-star"></i>{single_course?.rating || "(4.5 Reviews)"}
                </li>
                <li>
                  <span className={`badge ${isPaidCourse ? "badge-paid" : "badge-free"}`}>
                    {isPaidCourse ? "Paid" : "Free"}
                  </span>
                </li>
              </ul>
              <h2 className="title">{single_course?.title || "Course Title Here"}</h2>
              <div className="courses__details-meta">
                <ul className="list-wrap">
                  <li className="author-two">
                    <Image src={single_course?.instructorImage || "/default-author.jpg"} alt="Author" width={50} height={50} />
                    By <Link href="#">{single_course?.instructors || "Unknown Instructor"}</Link>
                  </li>
                  <li className="date"><i className="flaticon-calendar"></i>24/07/2024</li>
                  <li><i className="flaticon-mortarboard"></i>2,250 Students</li>
                </ul>
              </div>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {tab_title.map((tab, index) => (
                  <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                    <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`} role="tabpanel">
                  <Overview />
                </div>
                <div className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`} role="tabpanel">
                  <Curriculum />
                </div>
                <div className={`tab-pane fade ${activeTab === 2 ? "show active" : ""}`} role="tabpanel">
                  <Instructors />
                </div>
                <div className={`tab-pane fade ${activeTab === 3 ? "show active" : ""}`} role="tabpanel">
                  <Reviews />
                </div>
                <div className={`tab-pane fade ${activeTab === 4 ? "show active" : ""}`} role="tabpanel">
                  <div style={{ height: "500px", border: "1px solid #ddd", padding: "10px" }}>
                    {isPaidCourse ? (
                      user ? (
                        <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js`}>
                          <Viewer fileUrl={pdfUrl} />
                        </Worker>
                      ) : (
                        <p>Please <Link href="/login">log in</Link> to access this PDF.</p>
                      )
                    ) : (
                      <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfUrl} />
                      </Worker>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea;