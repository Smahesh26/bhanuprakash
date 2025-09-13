"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import VideoPopup from "@/modals/VideoPopup"
import BtnArrow from "@/svg/BtnArrow"

import choose_img1 from "@/assets/img/others/h7_choose_img01.jpg"
import choose_img2 from "@/assets/img/others/h7_choose_img02.jpg"
import choose_img3 from "@/assets/img/others/h7_choose_img03.jpg"
import choose_img4 from "@/assets/img/others/h7_choose_shape01.svg"
import choose_img5 from "@/assets/img/others/h7_choose_shape02.svg"
import choose_img6 from "@/assets/img/others/h7_choose_shape03.svg"

import AOS from "aos"
import "aos/dist/aos.css"

const Choose = () => {
   const [isVideoOpen, setIsVideoOpen] = useState(false);

   useEffect(() => {
     AOS.init({
       duration: 700,
       once: true,
       easing: "ease-in-out",
     });
   }, []);

   return (
      <>
         <section className="choose__area-four tg-motion-effects section-py-140" data-aos="fade-up">
            <div className="container">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-6 col-md-10">
                     <div className="choose__img-four">
                        <div className="left__side">
                           <Image src={choose_img1} alt="img" data-aos="fade-down" data-aos-delay="200" />
                           <Image src={choose_img2} alt="img" data-aos="fade-up" data-aos-delay="200" />
                        </div>
                        <div className="right__side" data-aos="fade-left" data-aos-delay="400">
                           <Image src={choose_img3} alt="img" />
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video" aria-label="Open video"><i className="fas fa-play"></i></a>
                        </div>
                        <Image src={choose_img4} alt="shape" className="shape shape-one tg-motion-effects4" />
                        <Image src={choose_img5} alt="shape" className="shape shape-two alltuchtopdown" />
                        <Image src={choose_img6} alt="shape" className="shape shape-three tg-motion-effects7" />
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="choose__content-four">
                        <div className="section__title mb-20">
                           <span className="sub-title" style={{color:"#168e6a"}} data-aos="fade-in" data-aos-delay="120">Who we are</span>
                           <h2 className="title bold" data-aos="fade-up" data-aos-delay="180">Why Choose us</h2>
                        </div>
                        <p data-aos="fade-up" data-aos-delay="260">
                          Welcome to Med School Simplified! Our channel is dedicated to providing top-notch medical education tailored specifically for MBBS students, USMLE aspirants, and those preparing for FMGE and NEET PG exams. We aim to make complex medical concepts easy to grasp through clear and concise videos, detailed lectures, and practical insights. Whether you&apos;re starting your medical journey or gearing up for crucial exams, our content is designed to help you excel. Join us and simplify your path to medical success!
                        </p>
                        <ul className="about__info-list list-wrap">
                           <li className="about__info-list-item" data-aos="fade-right" data-aos-delay="320">
                              <i className="flaticon-angle-right" />
                              <p className="content">All subjects Video lectures</p>
                           </li>
                           <li className="about__info-list-item" data-aos="fade-right" data-aos-delay="380">
                              <i className="flaticon-angle-right" />
                              <p className="content">In-depth Explanation of Concepts</p>
                           </li>
                           <li className="about__info-list-item" data-aos="fade-right" data-aos-delay="440">
                              <i className="flaticon-angle-right" />
                              <p className="content">Lectures notes / MCQs and Cases with Premium features</p>
                           </li>
                        </ul>
                        <div data-aos="zoom-in" data-aos-delay="520">
                          <Link href="/login" className="btn arrow-btn btn-four" aria-label="Contact Now">Contact Now<BtnArrow /></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />

         <style jsx>{`
           /* small polish for text entrance and staggered emphasis */
           .section__title .sub-title { display:inline-block; transform-origin:left center; }
           .about__info-list .about__info-list-item { display:flex; gap:12px; align-items:flex-start; margin-bottom:12px; }
           .about__info-list .content { margin:0; color: #334155; }
           .choose__content-four p { color: #475569; line-height:1.6; margin-bottom:18px; }
           .btn-four { transition: transform 180ms ease, box-shadow 180ms ease; }
           .btn-four:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(16,24,40,0.08); }
         `}</style>
      </>
   )
}

export default Choose
