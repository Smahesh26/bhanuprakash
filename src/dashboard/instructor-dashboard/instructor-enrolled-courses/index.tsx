import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorEnrolledCourseArea from './InstructorEnrolledCourseArea'

const InstructorEnrolledCourse = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorEnrolledCourseArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorEnrolledCourse
