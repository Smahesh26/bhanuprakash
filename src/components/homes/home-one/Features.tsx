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
  { id: 6, icon: "fa-solid fa-user-injured", title: "PLAB", tag: "Professional and Linguistic Assessments Board." },
];

const Categories = () => {
  return (
    <section
      className="categories-area-three fix section-pt-140 section-pb-110 categories__bg"
      style={{ backgroundImage: `url(/assets/img/bg/categories_bg.jpg)` }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="section__title text-center mb-50">
              <span className="sub-title">Our Top Exam Preparation</span>
              <h2 className="title bold">Explore Medical Courses & Subjects</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {categories_data.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Link href="/courses" style={{ textDecoration: "none" }}>
                <div className="category-inner-card text-center">
                  {/* White round icon holder */}
                  <div className="icon-circle">
                    <i className={item.icon}></i>
                  </div>

                  <span className="name">{item.title}</span>
                  <span className="courses">{item.tag}</span>
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
        :root {
          --primary: #fec107;
          --brown: #8D5524;
        }

        .category-inner-card {
          background: var(--primary);
          border-radius: 22px;
          box-shadow: 0 8px 24px rgba(0,0,0,.2);
          padding: 32px 18px 24px;
          border: 2px solid var(--primary);
          transition: all .3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }
        .category-inner-card:hover {
          transform: translateY(-8px) scale(1.04);
          box-shadow: 0 16px 36px rgba(0,0,0,.3);
        }

        /* White circular icon with 3D shadow */
        .icon-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          box-shadow:
            0 6px 14px rgba(0,0,0,.15),
            inset 0 3px 6px rgba(255,255,255,.6),
            inset 0 -3px 6px rgba(0,0,0,.05);
          transition: transform .3s, box-shadow .3s;
        }
        .icon-circle i {
          font-size: 2rem;
          color: var(--brown);
        }
        .category-inner-card:hover .icon-circle {
          transform: scale(1.08);
          box-shadow:
            0 12px 20px rgba(0,0,0,.25),
            inset 0 4px 8px rgba(255,255,255,.7),
            inset 0 -4px 8px rgba(0,0,0,.08);
        }

        .name {
          font-weight: 700;
          color: #fff;
          font-size: 1.1rem;
          margin-bottom: 4px;
        }
        .courses {
          color: #fff;
          font-size: 12px;
          opacity: 0.9;
        }
        .category-inner-card:hover .name,
        .category-inner-card:hover .courses {
          color: var(--brown);
        }
      `}</style>
    </section>
  );
};

export default Categories;
