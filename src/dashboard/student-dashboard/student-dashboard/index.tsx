import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import StudentDashboardArea from './StudentDashboardArea'
import HeaderSeven from '@/layouts/headers/HeaderSeven'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentDashboard = () => {
   return (
      <>
         {/* <HeaderSeven /> */}
         <main className="main-area fix">
            <StudentDashboardArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentDashboard
