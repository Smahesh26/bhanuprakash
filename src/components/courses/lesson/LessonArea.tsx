"use client"
import Link from "next/link";
import LessonFaq from "./LessonFaq";
import LessonNavTav from "./LessonNavTav";
import dynamic from "next/dynamic";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const LessonVideo = dynamic(() => import("./LessonVideo"), { ssr: false });

const LessonArea = ({ lectures }: any) => {
   return (
      <section className="lesson__area section-pb-120">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-xl-3 col-lg-4">
                  <div className="lesson__content">
                     <h2 className="title">Course Content</h2>
                     <LessonFaq />
                  </div>
               </div>
               <div className="col-xl-9 col-lg-8">
                  <div className="lesson__video-wrap">
                     <div className="lesson__video-wrap-top">
                        <div className="lesson__video-wrap-top-left">
                           <Link href="#"><i className="flaticon-arrow-right"></i></Link>
                           <span>The Complete Design Course: From Zero to Expert!</span>
                        </div>
                        <div className="lesson__video-wrap-top-right">
                           <Link href="#"><i className="fas fa-times"></i></Link>
                        </div>
                     </div>
                     <LessonVideo />
                     <div className="lesson__next-prev-button">
                        <button className="prev-button" title="Create a Simple React App"><i className="flaticon-arrow-right"></i></button>
                        <button className="next-button" title="React for the Rest of us"><i className="flaticon-arrow-right"></i></button>
                     </div>
                  </div>
                  <LessonNavTav />
                  
                  {/* Lecture PDFs Section */}
                  <div className="lesson__pdf-section">
                     <h3 className="title">Lecture PDFs</h3>
                     {lectures && lectures.length > 0 ? (
                        lectures.map((lecture: any, index: number) => (
                           <div key={index} className="lesson__pdf-item">
                              <p>{lecture.title}</p>
                              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js">
                              <Viewer fileUrl={`/pdf/Anatomy-notes.pdf`} />
                              </Worker>
                           </div>
                        ))
                     ) : (
                        <p>No lecture PDFs available.</p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default LessonArea;