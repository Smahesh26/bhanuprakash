"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import VideoPopup from "@/modals/VideoPopup"
import BtnArrow from "@/svg/BtnArrow"

import choose_img1 from "@/assets/img/others/h7_choose_img01.jpg"
import choose_img2 from "@/assets/img/others/h7_choose_img02.jpg"
import choose_img3 from "@/assets/img/others/h7_choose_img03.jpg"
import choose_img4 from "@/assets/img/others/h7_choose_shape01.svg"
import choose_img5 from "@/assets/img/others/h7_choose_shape02.svg"
import choose_img6 from "@/assets/img/others/h7_choose_shape03.svg"

const Choose = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <section className="choose__area-four tg-motion-effects section-py-140">
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
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video"><i className="fas fa-play"></i></a>
                        </div>
                        <Image src={choose_img4} alt="shape" className="shape shape-one tg-motion-effects4" />
                        <Image src={choose_img5} alt="shape" className="shape shape-two alltuchtopdown" />
                        <Image src={choose_img6} alt="shape" className="shape shape-three tg-motion-effects7" />
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="choose__content-four">
                        <div className="section__title mb-20">
                           <span className="sub-title" style={{color:"#168e6a !important"}}>Who we are</span>
                           <h2 className="title bold">Why Choose us</h2>
                        </div>
                        <p>Welcome to Med School Simplified! Our channel is dedicated to providing top-notch medical education tailored specifically for MBBS students, USMLE aspirants, and those preparing for FMGE and NEET PG exams. We aim to make complex medical concepts easy to grasp through clear and concise videos, detailed lectures, and practical insights. Whether you&apos;re starting your medical journey or gearing up for crucial exams, our content is designed to help you excel. Join us and simplify your path to medical success!</p>
                        <ul className="about__info-list list-wrap">
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">All subjects Video lectures </p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">In-depth Explanation of Concepts</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Lectures notes / MCQs and Cases with Premium features</p>
                           </li>
                        </ul>
                        <Link href="/login" className="btn arrow-btn btn-four">Contact Now<BtnArrow /></Link>
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
      </>
   )
}

export default Choose
