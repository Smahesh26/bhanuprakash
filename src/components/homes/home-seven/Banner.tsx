'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import SvgAnimation from '@/hooks/SvgAnimation';
import BtnArrow from '@/svg/BtnArrow';

import banner_shape_3 from '@/assets/img/banner/banner_shape01.svg';
import banner_icon_1 from '@/assets/img/banner/bg_dots.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner: React.FC = () => {
   const svgIconRef = SvgAnimation('/assets/img/objects/title_shape.svg');

   const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      appendDots: (dots: any) => (
         <div className="custom-dots-container">
            <ul style={{ margin: 0, padding: 0, textAlign: 'center' }}>{dots}</ul>
         </div>
      ),
      responsive: [
         {
            breakpoint: 992,
            settings: {
               dots: true
            }
         }
      ]
   };

   const slides = [
      {
         title: "Master Digital Marketing",
         subtitle: "Boost Your Career",
         text: "Learn from industry experts and master the art of digital marketing in our comprehensive course.",
         videoId: "liqtwZhHW38"
      },
      {
         title: "Web Development Basics",
         subtitle: "Start Coding Today",
         text: "Begin your journey into web development with hands-on projects and expert guidance.",
         videoId: "KkWEuvJGY7o"
      },
      {
         title: "Graphic Design Fundamentals",
         subtitle: "Unleash Creativity",
         text: "Discover the principles of design and create stunning visual content from scratch.",
         videoId: "3dpcowOuKEk"
      }
   ];

   return (
      <section className="banner-area banner-bg tg-motion-effects min-vh-50 d-flex" 
               style={{ 
                  backgroundImage: `url(/assets/img/banner/banner_bg.png)`,
                  paddingTop: '0'
               }}>
         <div className="container h-100">
            <Slider {...sliderSettings} className="h-100">
               {slides.map((slide, index) => (
                  <div key={index} className="h-100">
                     <div className="row h-100">
                        {/* Text Content */}
                        <div className="col-lg-6 order-lg-1 order-2">
                           <div className="banner__content text-dark" 
                                style={{ 
                                   transform: 'translateY(-30px)',
                                   paddingTop: '0'
                                }}>
                              <h3 className="title tg-svg text-dark" ref={svgIconRef}>
                                 {slide.title}
                                 <span className="position-relative" style={{ marginLeft: "10px" }}>
                                    <svg x="0px" y="0px" viewBox="0 0 209 59" fill="none">
                                       <path d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565" fill="currentColor" />
                                    </svg>
                                    {slide.subtitle}
                                 </span>
                              </h3>
                              <p className="my-4 text-dark">{slide.text}</p>
                              <div className="banner__btn-wrap">
                                 <Link href="/contact" className="btn arrow-btn">
                                    Start Free Trial <BtnArrow />
                                 </Link>
                              </div>
                           </div>
                        </div>

                        {/* Video Embed */}
                        <div className="col-lg-6 order-lg-2 order-1 h-100">
                           <div className="video-container h-100 position-relative" 
                                style={{ 
                                   paddingTop: '0',
                                   marginTop: '0'
                                }}>
                              <iframe
                                src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=1&loop=1&playlist=${slide.videoId}&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3`}
                                className="w-100 h-100"
                                style={{ 
                                   minHeight: '500px',
                                   pointerEvents: 'none'
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Video player"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </Slider>
         </div>

         {/* Global Styles */}
         <style jsx global>{`
            .banner-area {
               padding-top: 0 !important;
            }
            .slick-list, .slick-track, .slick-slide > div {
               height: 100%;
            }
            .slick-dots {
               bottom: 40px !important;
            }
            .slick-dots li button:before {
               font-size: 14px !important;
               color: #4299e1 !important;
               opacity: 0.8 !important;
            }
            .slick-dots li.slick-active button:before {
               color: #1a365d !important;
               opacity: 1 !important;
            }
            .video-container {
               border-radius: 20px;
               overflow: hidden;
               box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            }
            .video-container iframe {
               pointer-events: none;
            }
            @media (max-width: 992px) {
               .slick-dots {
                  bottom: 20px !important;
               }
               .video-container {
                  height: 400px !important;
                  margin-top: 0 !important;
               }
               .banner__content {
                  padding-bottom: 40px;
               }
            }
         `}</style>

         {/* Decorative Elements */}
         <Image src={banner_shape_3} alt="shape" className="line-shape" />
         <Image src={banner_icon_1} alt="shape" className="shape bg-dots rotateme" />
      </section>
   );
};

export default Banner;