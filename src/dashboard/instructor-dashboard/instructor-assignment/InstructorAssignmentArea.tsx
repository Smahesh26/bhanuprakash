import DashboardBanner from "@/dashboard/dashboard-common/DashboardBanner"
import DashboardSidebar from "@/dashboard/dashboard-common/DashboardSidebar"
import instructor_assignment_data from "@/data/dashboard-data/InstructorAssignmentData"
import Link from "next/link"
import Image from "next/image"
import bg_img from "@/assets/img/bg/dashboard_bg.jpg"

const InstructorAssignmentArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="dashboard__bg"><Image src={bg_img} alt=""/></div>
         <div className="container">
            <DashboardBanner />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebar />
                  <div className="col-lg-9">
                     <div className="dashboard__content-wrap">
                        <div className="dashboard__content-title">
                           <h4 className="title">Quiz Attempts</h4>
                        </div>
                        <div className="row">
                           <div className="col-12">
                              <div className="dashboard__review-table">
                                 <table className="table table-borderless">
                                    <thead>
                                       <tr>
                                          <th>Assignment Name</th>
                                          <th>Total Marks</th>
                                          <th>Total Submit</th>
                                          <th>&nbsp;</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {instructor_assignment_data.map((item) => (
                                          <tr key={item.id}>
                                             <td>
                                                <div className="dashboard__quiz-info">
                                                   <h6 className="title">{item.title}</h6>
                                                   <span>Course: <Link href="#">{item.course}</Link></span>
                                                </div>
                                             </td>
                                             <td>
                                                <p className="color-black">{item.total_mark}</p>
                                             </td>
                                             <td>
                                                <p className="color-black">{item.total_submit}</p>
                                             </td>
                                             <td>
                                                <div className="dashboard__review-action">
                                                   <Link href="#" title="Edit"><i className="skillgro-edit"></i></Link>
                                                   <Link href="#" title="Delete"><i className="skillgro-bin"></i></Link>
                                                </div>
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default InstructorAssignmentArea
