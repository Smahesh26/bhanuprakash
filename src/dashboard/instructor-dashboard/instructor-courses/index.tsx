import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorEnrolledCourseArea from '../instructor-enrolled-courses/InstructorEnrolledCourseArea'

const InstructorCourses = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorEnrolledCourseArea style={true} />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorCourses
