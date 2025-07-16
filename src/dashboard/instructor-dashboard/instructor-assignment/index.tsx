import FooterTwo from '@/layouts/footers/FooterTwo'
import Headerseven from '@/layouts/headers/Headerseven'
import InstructorAssignmentArea from './InstructorAssignmentArea'

const InstructorAssignment = () => {
   return (
      <>
         <Headerseven />
         <main className="main-area fix">
            <InstructorAssignmentArea />
         </main>
         <FooterTwo />
      </>
   )
}

export default InstructorAssignment
