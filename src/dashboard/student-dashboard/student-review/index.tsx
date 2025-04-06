import FooterOne from '@/layouts/footers/FooterOne'
import HeaderOne from '@/layouts/headers/HeaderOne'
import StudentReviewArea from './StudentReviewArea'
import FooterTwo from '@/layouts/footers/FooterTwo'

const StudentReview = () => {
   return (
      <>
         {/* <HeaderOne /> */}
         <main className="main-area fix">
            <StudentReviewArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default StudentReview
