import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import StudentEnrolledCoursesArea from './StudentEnrolledCoursesArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentEnrolledCourses = () => {
   return (
      <>
         {/* <Headerseven /> */}
         <main className="main-area fix">
            <StudentEnrolledCoursesArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentEnrolledCourses
