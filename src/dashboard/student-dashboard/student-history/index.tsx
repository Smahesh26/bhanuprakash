import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import StudentHistoryArea from './StudentHistoryArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentHistory = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main className="main-area fix">
            <StudentHistoryArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentHistory

