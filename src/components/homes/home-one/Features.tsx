import Image from "next/image";
import Link from "next/link";

import category_img1 from "@/assets/img/others/h7_categories_shape01.svg";
import category_img2 from "@/assets/img/others/h7_categories_shape02.svg";
import category_img3 from "@/assets/img/others/h7_categories_shape03.svg";
import category_img4 from "@/assets/img/others/h7_categories_shape04.svg";

// Data Structure for Medical Categories
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
   { id: 5, icon: "fa-solid fa-hand-holding-heart", title: "NURSING", tag: "Nursing certification and exams." }, // Fixed icon
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
              <div className="categories__item-three text-center">
                <Link href="/courses" className="block p-4 border rounded-lg hover:shadow-lg transition">
                  <div className="icon text-4xl mb-3 text-blue-600">
                    <i className={item.icon}></i>
                  </div>
                  <span className="name block font-semibold mb-1">{item.title}</span>
                  <span className="courses text-gray-500" style={{fontSize:"10px !important"}}>{item.tag}</span>
                </Link>
              </div>
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
    </section>
  );
};

export default Categories;
