import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faStethoscope, faFileMedical, faUserMd, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const feature_data = [
   {
      id: 1,
      icon: faFileMedical, // FMGE icon
      title: "FMGE",
      tag: "Foreign Medical Graduate Exam.",
   },
   {
      id: 2,
      icon: faUserMd, // NEETPG icon
      title: "NEETPG",
      tag: "National Eligibility Test for Post Graduation.",
   },
   {
      id: 3,
      icon: faHeartPulse, // ECG icon
      title: "ECG",
      tag: "Electrocardiography courses.",
   },
   {
      id: 4,
      icon: faStethoscope, // USMLE icon
      title: "USMLE",
      tag: "United States Medical Licensing Exam.",
   },
   {
      id: 5,
      icon: faGraduationCap, // Nursing icon
      title: "Nursing",
      tag: "Nursing certification and exams.",
   },
   {
      id: 6,
      icon: faStethoscope, // PLAB icon (same as USMLE for medical exam)
      title: "PLAB",
      tag: "Professional and Linguistic Assessments Board.",
   },
];

const Features = () => {
   return (
      <section className="features__area-seven grey-bg-two">
         <div className="container">
            <div className="features__item-wrap-four">
               <div className="row">
                  {feature_data.map((item) => (
                     <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                        <div className="features__item-six">
                           <div className="features__icon-six">
                              {/* Rendering FontAwesome icons from feature data */}
                              <FontAwesomeIcon icon={item.icon} size="3x" />
                           </div>
                           <div className="features__content-six">
                              <h4 className="title">{item.title}</h4>
                              <span>{item.tag}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

export default Features;

