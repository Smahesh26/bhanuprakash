import FooterTwo from '@/layouts/footers/FooterTwo'
import HeaderSeven from '@/layouts/headers/HeaderSeven'
import InstructorQuizArea from './InstructorQuizArea'

const InstructorQuiz = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <InstructorQuizArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorQuiz
