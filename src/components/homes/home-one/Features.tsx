import Image from "next/image";
import Link from "next/link";

import category_img1 from "@/assets/img/others/h7_categories_shape01.svg";
import category_img2 from "@/assets/img/others/h7_categories_shape02.svg";
import category_img3 from "@/assets/img/others/h7_categories_shape03.svg";
import category_img4 from "@/assets/img/others/h7_categories_shape04.svg";

interface DataType {
  id: number;
  icon: string;
  title: string;
  tag: string;
}

const categories_data: DataType[] = [
  { id: 1, icon: "fa-solid fa-file-circle-check", title: "FMGE", tag: "Foreign Medical Graduate Exam." },
  { id: 2, icon: "fa-solid fa-user-doctor", title: "NEETPG", tag: "National Eligibility Test for Post Graduation." },
  { id: 3, icon: "fa-solid fa-heartbeat", title: "ECG", tag: "Electrocardiography courses." },
  { id: 4, icon: "fa-solid fa-user-nurse", title: "USMLE", tag: "United States Medical Licensing Exam." },
  { id: 5, icon: "fa-solid fa-hand-holding-heart", title: "NURSING", tag: "Nursing certification and exams." },
  { id: 6, icon: "fa-solid fa-user-injured", title: "PLAB", tag: "Professional & Linguistic Assessments Board." },
];

const Categories = () => {
  return (
    <section
      className="categories-area-three fix section-pt-140 section-pb-140 categories__bg mb-50"
      style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(13,68,122,0.95) 0%, rgba(93,186,71,0.90) 100%), url(/assets/img/bg/categories_bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="section__title text-center mb-50">
              <span className="sub-title" style={{ 
                background: 'rgba(255,255,255,0.15)', 
                color: '#fff', 
                padding: '8px 20px', 
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}>
                Our Top Exam Preparation
              </span>
              <h2 className="title bold" style={{ color: '#fff', marginTop: '20px' }}>
                Explore Our Featured Courses
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '15px', fontSize: '16px' }}>
                Comprehensive exam preparation for medical professionals worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="row g-3">
          {categories_data.map((item) => (
            <div key={item.id} className="col-lg-2 col-md-4 col-sm-6 col-12">
              <Link href="/courses" style={{ textDecoration: "none" }}>
                <div className="category-inner-card">
                  <div className="card-glow"></div>
                  <div className="icon-circle">
                    <i className={item.icon}></i>
                  </div>
                  <h4 className="name">{item.title}</h4>
                  <p className="courses">{item.tag}</p>
                  <div className="card-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Floating shapes */}
      <div className="categories__shape-wrap">
        <Image src={category_img1} alt="shape" className="rotateme" />
        <Image src={category_img2} alt="shape" data-aos="fade-down-left" data-aos-delay="400" />
        <Image src={category_img3} alt="shape" className="alltuchtopdown" />
        <Image src={category_img4} alt="shape" data-aos="fade-up-right" data-aos-delay="400" />
      </div>

      <style>{`
        .category-inner-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          box-shadow: 
            0 8px 25px rgba(0,0,0,0.12),
            0 0 0 1px rgba(255,255,255,0.2);
          padding: 25px 20px 20px;
          border: 2px solid transparent;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: 200px;
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(93,186,71,0.1) 0%, transparent 70%);
          opacity: 0;
          transition: all 0.4s ease;
          pointer-events: none;
        }

        .category-inner-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 15px 40px rgba(0,0,0,0.2),
            0 0 0 2px #5dba47;
          background: rgba(255, 255, 255, 1);
        }

        .category-inner-card:hover .card-glow {
          opacity: 1;
        }

        .icon-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #5dba47 0%, #4a9c38 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          box-shadow:
            0 6px 20px rgba(93,186,71,0.3),
            inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .icon-circle::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          background: linear-gradient(135deg, #5dba47, #0d447a);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .category-inner-card:hover .icon-circle::before {
          opacity: 1;
        }

        .icon-circle i {
          font-size: 1.6rem;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
        }

        .category-inner-card:hover .icon-circle {
          transform: scale(1.1) rotate(5deg);
          box-shadow:
            0 10px 25px rgba(93,186,71,0.4),
            inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .category-inner-card:hover .icon-circle i {
          transform: scale(1.1);
        }

        .name {
          font-family: 'Poppins', Arial, sans-serif;
          font-weight: 700;
          color: #0d447a;
          font-size: 1.45rem;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          text-align: center;
          line-height: 1.2;
        }
        .category-inner-card:hover .name {
          color: #5dba47;
          transform: translateY(-2px);
        }
        .courses {
          color: #374151;
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 10px;
          opacity: 0.95;
          transition: all 0.3s ease;
          font-weight: 500;
          text-align: center;
          display: block;
        }
        .category-inner-card:hover .courses {
          color: #0d447a;
          opacity: 1;
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .col-lg-2 {
            flex: 0 0 33.3333%;
            max-width: 33.3333%;
          }
          .name {
            font-size: 1.25rem;
          }
          .courses {
            font-size: 1rem;
          }
        }
        @media (max-width: 991px) {
          .col-lg-2, .col-md-4 {
            flex: 0 0 50%;
            max-width: 50%;
          }
          .name {
            font-size: 1.15rem;
          }
          .courses {
            font-size: 0.95rem;
          }
        }
        @media (max-width: 767px) {
          .col-lg-2, .col-md-4, .col-sm-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          .category-inner-card {
            padding: 16px 8px 12px;
            min-height: 140px;
          }
          .icon-circle {
            width: 48px;
            height: 48px;
            margin-bottom: 8px;
          }
          .icon-circle i {
            font-size: 1.1rem;
          }
          .name {
            font-size: 1.05rem;
            margin-bottom: 7px;
          }
          .courses {
            font-size: 0.92rem;
          }
          .card-arrow {
            width: 20px;
            height: 20px;
          }
          .card-arrow i {
            font-size: 9px;
          }
        }
        @media (max-width: 500px) {
          .category-inner-card {
            padding: 10px 4px 8px;
            min-height: 100px;
          }
          .icon-circle {
            width: 36px;
            height: 36px;
            margin-bottom: 6px;
          }
          .name {
            font-size: 0.95rem;
          }
          .courses {
            font-size: 0.85rem;
          }
        }

        /* Animation for shapes */
        .rotateme {
          animation: rotate 20s linear infinite;
        }

        .alltuchtopdown {
          animation: bounce 3s ease-in-out infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
};

export default Categories;
