import FooterTwo from '@/layouts/footers/FooterTwo'
import HeaderSeven from '@/layouts/headers/HeaderSeven'
import InstructorAttemptsArea from './InstructorAttemptsArea'

const InstructorAttempts = () => {
   return (
      <>
         <HeaderSeven />
         <main className="main-area fix">
            <InstructorAttemptsArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorAttempts
