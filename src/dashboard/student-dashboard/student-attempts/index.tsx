import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import StudentAttemptsArea from './StudentAttemptsArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentAttempts = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main className="main-area fix">
            <StudentAttemptsArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentAttempts

