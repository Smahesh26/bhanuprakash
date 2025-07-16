import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import StudentProfileArea from './StudentProfileArea'

const StudentProfile = () => {
   return (
      <>
         {/* <Headerseven /> */}
         <main className="main-area fix">
            <StudentProfileArea />
         </main>
         <FooterTwo/>
      </>
   )
}

export default StudentProfile
