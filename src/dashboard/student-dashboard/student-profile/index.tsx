import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import StudentProfileArea from './StudentProfileArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentProfile = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main className="main-area fix">
            <StudentProfileArea />
         </main>
         <FooterTwo/>
      </>
   )
}

export default StudentProfile
