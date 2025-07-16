import feature_data from "@/data/home-data/FeatureData"
import InjectableSvg from "@/hooks/InjectableSvg"

const Feature = ({ style }: any) => {
   return (
      <section className={`${style ? "features__area-three" : "features__area-two"} section-pt-120 section-pb-90`}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-12 col-lg-8">
                  <div className="section__title text-center mb-40">
                     <span className="sub-title">Our Top Features</span>
                     <h2 className="title">Achieve Your Goal With MedSchool Simplified</h2>
                     <p>At MedSchool Simplified, we pride ourselves on offering a structured, high-quality learning environment designed for aspiring medical professionals. From foundational concepts to specialized training, our platform integrates diverse resources—such as detailed lecture notes, interactive MCQs, and real-world case studies—into a unified system. This holistic approach ensures that every student, whether preparing for board exams or broadening their clinical expertise, finds precisely what they need to excel.</p>
                  <p>We understand the rigorous demands placed on MBBS students and allied health professionals, especially when preparing for critical exams like FMGE, NEET PG, and USMLE. Our resources are meticulously aligned with these examinations to help you master your subjects methodically. Through synchronized course structures and practical study tools, MedSchool Simplified empowers you to track progress, stay motivated, and achieve the milestones that lead you toward your dream medical career.</p>
                  </div>
               </div>
            </div>
            <div className="features__item-wrap">
               <div className="row justify-content-center">
                  {feature_data.filter((items) => items.page === "home_2").map((item) => (
                     <div key={item.id} className="col-lg-4 col-md-6">
                        <div className="features__item-two">
                           <div className="features__content-two">
                              <div className="content-top">
                                 <div className="features__icon-two">
                                    <InjectableSvg src={item.icon_2 ? item.icon_2 : ""} alt="img" className="injectable" />
                                 </div>
                                 <h2 className="title">{item.title}</h2>
                              </div>
                              <p>{item.desc}</p>
                           </div>
                           <div className="features__item-shape">
                              <InjectableSvg src="/assets/img/others/features_item_shape.svg" alt="img" className="injectable" />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Feature
