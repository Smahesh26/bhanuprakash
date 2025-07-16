import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorAttemptsArea from './InstructorAttemptsArea'

const InstructorAttempts = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorAttemptsArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorAttempts
