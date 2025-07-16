import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorQuizArea from './InstructorQuizArea'

const InstructorQuiz = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorQuizArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorQuiz
