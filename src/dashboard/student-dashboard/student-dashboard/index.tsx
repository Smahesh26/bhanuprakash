import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
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
