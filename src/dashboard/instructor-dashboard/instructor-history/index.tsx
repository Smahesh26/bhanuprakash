import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorHistoryArea from './InstructorHistoryArea'

const InstructorHistory = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorHistoryArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorHistory
