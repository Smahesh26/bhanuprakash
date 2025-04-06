import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import StudentEnrolledCoursesArea from './StudentEnrolledCoursesArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentEnrolledCourses = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main className="main-area fix">
            <StudentEnrolledCoursesArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentEnrolledCourses
